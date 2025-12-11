import { useState, useEffect } from "react";
import { JobCard } from './JobCard'

export const JobPostings = () => {

    // useEffect(() => {
    //     async function loadJobs () {
    //         try {
    //             const res = await fetch("http://127.0.0.1:5000/jobs");
    //             const data = await res.json();
    //             setJobs(data);
    //             setTitle(data.map(job => job.title));
    //         }
    //         catch (error) {
    //             res.status(500).json("no jobs")
    //         }

    //     }
    //     loadJobs();
    // }, []);

    return (
        <div className=' w-full flex bg-[#f2f3cc] h-auto shadow-inner'>
            <h1 className=" absolute left-5 text-[20px] lato">
                Job Postings</h1>

            <JobCard />
        </div>
    )
}