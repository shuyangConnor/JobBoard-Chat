import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  concat,
  gql,
} from '@apollo/client'
import { getAccessToken } from '../auth'

const httpLink = createHttpLink({
  uri: 'http://localhost:9000/graphql',
})

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken()
  if (accessToken) {
    operation.setContext({
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  }
  return forward(operation)
})

export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
})

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    date
    title
    company {
      id
      name
    }
    description
  }
`

export const createJobMutation = gql`
  mutation createJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`

export const companyByIdQuery = gql`
  query CompanyById($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        date
        title
        description
      }
    }
  }
`

export const jobByIdQuery = gql`
  query JobById($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`

export async function createJob({ title, description }) {
  const mutation = gql`
    mutation createJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        ...JobDetail
      }
    }
    ${jobDetailFragment}
  `

  const { data } = await apolloClient.mutate({
    mutation,
    variables: {
      input: { title, description },
    },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: jobByIdQuery,
        variables: { id: data.job.id },
        data,
      })
    },
  })

  return data.job
}

export const jobsQuery = gql`
  query Jobs($limit: Int, $offset: Int) {
    jobs(limit: $limit, offset: $offset) {
      items {
        id
        date
        title
        company {
          id
          name
        }
      }
      totalCount
    }
  }
`
