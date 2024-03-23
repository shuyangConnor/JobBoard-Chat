import { useState } from 'react'
import JobList from '../components/JobList'
import { useJobs } from '../lib/graphql/hooks'
import PaginationBar from '../components/PaginationBar'

const JOB_PER_PAGE = 5

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)

  const { jobs, loading, error } = useJobs(
    JOB_PER_PAGE,
    (currentPage - 1) * JOB_PER_PAGE
  )

  if (loading) return <p>Loading...</p>

  if (error) return <p>Some error occured.</p>

  const totalPages = Math.ceil(jobs.totalCount / JOB_PER_PAGE)

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <div></div>
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}></PaginationBar>
      <JobList jobs={jobs.items} />
    </div>
  )
}

export default HomePage
