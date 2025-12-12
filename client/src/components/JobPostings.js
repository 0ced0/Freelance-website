import { useState, useEffect } from "react";
import { JobCard } from './JobCard'
import { Navbar } from "./Navbar";
import useJobs from "../hooks/jobs_hooks";

export const JobPostings = () => {
    const job = useJobs()
    const [focus, setFocus] = useState("")
    const [searchQuery, setSearchQuery] = useState("");

    const filteredJobs = job.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="flex w-[70%] mx-auto bg-white shadow-lg px-4 pt-8">
            <div className=' w-[45%] h-auto rounded-l-lg pt-2'>
                <h1 className="left-5 text-[20px] lato mt-2">
                    Jobs for you</h1>

                <JobCard focus={focus} setFocus={setFocus} />
            </div>
            <div className="h-[300px] w-[55%]">
                <div className="mt-14 bg-white w-full border shadow-lg rounded-lg">
                    {job.map((i) => {
                        if (focus === "") {
                            setFocus(i)
                            return null
                        }
                        return null
                    })}

                    {/* focus card */}
                    <div className="py-3 px-5 sticky top-30">
                        <h1 className="text-[30px] font-medium mb-8">{focus.title}</h1>
                        <p className="mb-5">{focus.description}</p>
                        <p className="mb-3">{focus.location}</p>
                        <p>Contact me at: {focus.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}