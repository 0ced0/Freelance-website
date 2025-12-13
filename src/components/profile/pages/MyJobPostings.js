import { useState, useContext } from "react"
import { AuthContext } from "../../../AuthContext"
import { useNavigate } from "react-router-dom"
import NewJobForm from "../components/NewJobForm"
import useJobs from "../../../hooks/jobs_hooks"

export default function MyJobPostings() {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const { user, token } = useContext(AuthContext)
    const navigate = useNavigate()
    const jobs = useJobs()

    const handleOpenJobForm = () => {
        setIsFormOpen(prev => !prev)
    }

    return (
        <div className="w-[65%] mt-6 mx-auto bg-white shadow-[0px_4px_35px_3px_rgba(0,0,0,0.2)] rounded-[15px] h-full">
            <div className="flex justify-between pt-2 mx-4">
                <h1 className="text-[30px]">My Job Posts</h1>
                <button onClick={() => navigate("/")} className="bg-white shadow-lg border rounded hover:bg-gray-400 p-2 mr-8">Home</button>
            </div>
            <div className="flex p-4 gap-4 h-full flex-wrap">

                {jobs.map((job) => {
                    console.log(job.author)
                    console.log("this is the suser", user)
                    if (job.author === user.username) {
                        return (
                            <div className="flex p-3 bg-white shadow-xl rounded-lg w-[30%] border h-[40%]">
                                <div className="relative">
                                    <h1 className="text-[30px] font-medium line-clamp-1 mb-6">{job.title}</h1>
                                    <p className="line-clamp-3 mb-5">{job.description}</p>
                                    <p className="absolute bottom-0">{job.location}</p>
                                </div>
                            </div>
                        )
                    } else { return null }
                })}
                <button onClick={handleOpenJobForm} className={`group transition-all duration-100 ${!isFormOpen ? "hover:scale-105" : ""} h-[40%] w-[27%] p-5 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.1)] rounded-[15px]`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="transition-all duration-300 group-hover:text-[#57ba4c] group-hover:border-[#57ba4c] border border-dashed border-2 p-3 mx-auto mb-5 w-[90%] h-24 rounded-[15px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <p className="">Create new post</p>

                </button>
            </div>
            <div className="h-full">
                <div className="p-5 mx-auto h-full">

                </div>
            </div>
            <NewJobForm isFormOpen={isFormOpen} toggleForm={handleOpenJobForm} />
        </div>
    )
}