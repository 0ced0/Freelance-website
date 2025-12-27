import { useLatestJobs } from "../../hooks/jobs_hooks"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

import {
    PaintBrushIcon,
    AcademicCapIcon,
    GlobeAltIcon,
    DevicePhoneMobileIcon,
    CameraIcon,
} from "@heroicons/react/24/solid"

const job_category = {
    "creative": PaintBrushIcon,
    "educational": AcademicCapIcon,
    "web developer": GlobeAltIcon,
    "mobile developer": DevicePhoneMobileIcon,
    "photographer": CameraIcon,
}


export default function LatestJobs({ query, setFocus, menu_handlers, user }) {
    const jobs = useLatestJobs()
    const menu = menu_handlers ? menu_handlers() : null
    const navigate = useNavigate()

    if (query === "") {
        return (
            <div className="flex flex-nowrap w-full text-[#413D49] gap-4 overflow-x-auto mt-2 pb-3 scrollbar scrollbar-thumb-blue-100 scrollbar-thumb-rounded-lg hover:scrollbar-thumb-[#b5cb0c]">
                {jobs.length !== 0 ? jobs
                    .map((job) => {
                        const Icon = job_category[job.category.toLowerCase()]
                        return (
                            <button onClick={() => { user ? menu.handleViewPost(job._id) : navigate("/profile") }} key={job._id} className="flex shrink-0 bg-white border shadow py-4 px-4 rounded-[20px] min-w-[50px] max-w-[250px] hover:shadow-2xl transition-all duration-300">
                                <div className="w-full flex flex-col justify-between">
                                    <h1 className="text-[20px] font-bold text-left">{job.title}</h1>
                                    <p className="pt-4 text-[15px] text-left line-clamp-3">
                                        {job.description}
                                    </p>
                                    <p className="pt-10 text-left">
                                        {job.location}
                                    </p>
                                </div>

                                {/* side buttons */}
                                <div className="flex flex-col justify-between items-center">
                                    {Icon && <Icon className="w-7 h-7" />}

                                </div>
                            </button>
                        )
                    }) : "No Jobs Available"}

            </div>
        )
    } else {
        return (
            <div className="flex flex-nowrap w-[full] text-[#413D49] gap-4 overflow-x-auto mt-2 pb-3 scrollbar scrollbar-thumb-blue-100 scrollbar-thumb-rounded-lg hover:scrollbar-thumb-[#b5cb0c]">
                {Array.isArray(jobs) ? jobs
                    .filter((jobItem) =>
                        jobItem.title.toLowerCase().includes(query.toLowerCase())
                    )
                    .map((job) => {
                        const Icon = job_category[job.category.toLowerCase()]
                        return (
                            <button onClick={() => { user ? menu.handleViewPost(job._id) : navigate("/profile") }} key={job._id} className="flex shrink-0 bg-white border shadow py-4 px-4 rounded-[20px] min-w-[50px] max-w-[250px] hover:shadow-2xl transition-all duration-300">
                                <div className="w-full flex flex-col justify-between">
                                    <h1 className="text-[20px] font-bold text-left">{job.title}</h1>
                                    <p className="pt-4 text-[15px] text-left line-clamp-3">
                                        {job.description}
                                    </p>
                                    <p className="pt-10 text-left">
                                        {job.location}
                                    </p>
                                </div>

                                {/* side buttons */}
                                <div className="flex flex-col justify-between items-center">
                                    {Icon && <Icon className="w-7 h-7" />}

                                </div>
                            </button>
                        )
                    }) : "No Jobs Available"}

            </div>
        )
    }
} 