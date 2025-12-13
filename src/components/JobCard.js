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
    "traditional art": PaintBrushIcon,
    "education": AcademicCapIcon,
    "web developer": GlobeAltIcon,
    "mobile developer": DevicePhoneMobileIcon,
    "photographer": CameraIcon,
}



export const JobCard = ({ focus, setFocus }) => {
    const job = useJobs()

    return (
        <div className="flex flex-col w-full text-[#413D49]">
            {job.map((job) => {
                const Icon = job_category[job.category.toLowerCase()]
                return (
                    <button onClick={() => setFocus(job)} key={job.id} className="flex mt-2 ml-4 bg-white border shadow py-4 px-4 rounded-[20px] w-[80%] hover:shadow-2xl transition-all duration-300">
                        <div className="w-[80%]">
                            <h1 className="text-[20px] font-bold text-left">{job.title}</h1>
                            <p className="pt-4 text-[15px] text-left line-clamp-3">
                                {job.description}
                            </p>
                            <p className="pt-10 text-left">
                                {job.location}
                            </p>
                        </div>

                        {/* side buttons */}
                        <div className="flex justify-center items-center relative">
                            {Icon && <Icon className="w-7 h-7 top-1 left-2 absolute" />}

                        </div>
                    </button>
                )
            })}

        </div>
    )
};

