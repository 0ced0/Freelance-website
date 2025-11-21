import { JobCard } from './JobCard'

export const JobPostings = () => {
    return (
        <div className=' w-full flex bg-yellow-50 h-auto'>
            <h1 className=" absolute left-5 text-[20px]">
                Job Postings</h1>

            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
        </div>
    )
}