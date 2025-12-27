import { useState, useContext } from "react";
import { JobCard } from './JobCard'
import LatestJobs from './LatestJobs'
import { AuthContext } from "../../AuthContext";

export const JobPostings = ({ query, isViewing, menu_handlers, setIsViewing }) => {
    const { user } = useContext(AuthContext)

    return (
        <div>
            <div className="flex w-[95%] mx-auto bg-gray-200 rounded-2xl shadow-lg p-4">
                <div className=' w-full rounded-l-lg'>
                    <h1 className="left-5 text-[20px] lato">
                        Jobs for you</h1>
                    <JobCard user={user} query={query} isViewing={isViewing} menu_handlers={menu_handlers} />

                </div>
            </div>
            <div className="w-[95%] mx-auto bg-gray-200 rounded-2xl shadow-lg p-4 mt-8">
                <h1 className="left-5 text-[20px] lato">Latest Jobs</h1>
                <LatestJobs user={user} menu_handlers={menu_handlers} query={query} setIsViewing={setIsViewing} />
            </div>
        </div>
    )
}