import { useState, useEffect } from "react";
import useJobs from "../hooks/jobs_hooks";
import {
    PaintBrushIcon,
    AcademicCapIcon,
    GlobeAltIcon,
    DevicePhoneMobileIcon,
    CameraIcon,
} from "@heroicons/react/24/solid"

const job_category = {
    "creative": PaintBrushIcon,
    "education": AcademicCapIcon,
    "web developer": GlobeAltIcon,
    "mobile developer": DevicePhoneMobileIcon,
    "photographer": CameraIcon,
}



export const JobCard = () => {
    const job = useJobs()

    return (
        <div className="border w-[20%] text-[#413D49]">
            {job.map((job) => {
                const Icon = job_category[job.category]
                return (
                    <div key={job.id} className="mt-12 ml-10 bg-white border shadow p-4 rounded-[20px] flex mb-5 w-full">
                        <div className="mr-8 w-[60%]">
                            <h1 className="text-[20px] font-bold">{job.title}</h1>
                            <p className="pt-4 text-[15px]">
                                {job.description}
                            </p>
                            <p className="pt-10">
                                {job.location}
                            </p>
                            <p>
                                {job.date_posted}
                            </p>
                        </div>

                        {/* side buttons */}
                        <div className="flex justify-center items-center flex-col relative">
                            {/* <Creative className="w-14 h-14 border absolute top-0 left-0 rounded p-1 bg-[#f2fedc]" /> */}
                            {Icon && <Icon className="w-7 h-7 absolute top-1 left-3" />}
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 p-1 mb-2 absolute bottom-12 left-0 rounded-[15px] hover:bg-gray-100">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                            </button>
                            <button >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 absolute p-1 bottom-0 rounded-[15px] hover:bg-gray-100">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                            </button>


                        </div>
                    </div>
                )
            })}

        </div>
    )
};

