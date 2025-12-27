import { useState, useContext } from "react"
import { AuthContext } from "../../../AuthContext"
import { useNavigate } from "react-router-dom"
import NewJobForm from "../components/NewJobForm"
import useJobs from "../../../hooks/jobs_hooks"
import EditProfile from "../components/EditProfile"

export default function MyJobPostings() {
    const [isEditProfile, setIsEditProfile] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const { user, token } = useContext(AuthContext)
    const navigate = useNavigate()
    const jobs = useJobs()

    const handleOpenJobForm = () => {
        setIsFormOpen(prev => !prev)
    }

    return (
        <div className="w-[65%] mx-auto bg-white shadow-[0px_4px_35px_3px_rgba(0,0,0,0.2)] min-h-[100vh]">
            <div className="justify-between pt-2 mx-4">
                <div className="flex justify-between">
                    <h1 className="text-[30px]">My Profile</h1>
                    <div>
                        <button onClick={() => setIsEditProfile(prev => !prev)} className="bg-white shadow-lg border rounded hover:bg-gray-400 p-2 mr-8">Edit Profile</button>
                        <button onClick={() => navigate("/")} className="bg-white shadow-lg border rounded hover:bg-gray-400 p-2 mr-8">Home</button>
                    </div>
                </div>
                <div className="px-[150px]">
                    <div className="flex gap-3 mt-4 items-end justify-between">
                        <h1 className="text-[25px]">{user.username}</h1>
                        <h1 className="mb-1 text-[15px]">{user.phoneNumber}</h1>
                    </div>
                    <h1 className="mb-1">{user.email}</h1>
                    <h1 className="mt-12">{user.bio}</h1>
                    <div className="flex mt-10 items-center gap-5">
                        <h1>My skills:</h1>

                        <div className="flex gap-3">
                            {user.skills !== 0 ? user.skills.map((skill) => {
                                if (skill) {
                                    return (
                                        <div className="bg-white shadow-md rounded-md border py-1 px-2 whitespace-nowrap">
                                            {skill}
                                        </div>
                                    )
                                }
                            }) : null}</div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between pt-2 mx-4 mt-8">
                <h1 className="text-[30px]">My Job Posts</h1>
            </div>
            <div className="flex p-4 gap-4 flex-wrap">
                {Array.isArray(jobs) ? jobs.map((job) => {
                    if (job.author === user._id) {
                        return (
                            <div className="flex p-3 bg-white shadow-xl rounded-lg w-[30%] border h-[210px]">
                                <div className="relative">
                                    <h1 className="text-[30px] font-medium line-clamp-1 mb-6">{job.title}</h1>
                                    <p className="line-clamp-3 mb-5">{job.description}</p>
                                    <p className="absolute bottom-0">{job.location}</p>
                                </div>
                            </div>
                        )
                    } else { return null }
                }) : null}
                <button onClick={handleOpenJobForm} className={`group transition-all duration-100 ${!isFormOpen ? "hover:scale-105" : ""}    w-[27%] h-[210px] p-5 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.1)] rounded-[15px]`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="transition-all duration-300 group-hover:text-[#57ba4c] group-hover:border-[#57ba4c] border border-dashed border-2 p-3 mx-auto mb-5 w-[90%] h-24 rounded-[15px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <p className="">Create new post</p>

                </button>
            </div>
            <NewJobForm isFormOpen={isFormOpen} toggleForm={handleOpenJobForm} />
            {isEditProfile && (<EditProfile setIsEditProfile={setIsEditProfile} />)}
        </div>
    )
}