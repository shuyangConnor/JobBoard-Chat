import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { getAccessToken } from '../auth'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient as createWsClient } from 'graphql-ws'
import { Kind, OperationTypeNode } from 'graphql'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken()
  if (accessToken) {
    operation.setContext({
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  }
  return forward(operation)
})

const httpLink = concat(
  authLink,
  createHttpLink({ uri: 'http://localhost:9000/graphql' })
)

const wsLink = new GraphQLWsLink(
  createWsClient({
    url: 'ws://localhost:9000/graphql',
    connectionParams: () => ({ accessToken: getAccessToken() }),
  })
)

export const apolloClient = new ApolloClient({
  link: split(isSubscription, wsLink, httpLink),
  cache: new InMemoryCache(),
})

function isSubscription(operation) {
  const definition = getMainDefinition(operation.query)
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  )
}
