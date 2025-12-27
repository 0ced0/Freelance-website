import { useEffect, useState } from "react"
import useJobs from "../../hooks/jobs_hooks"
import { useUsers } from "../../hooks/userHooks"

export const ViewJobPost = ({ menu_handlers, viewTarget }) => {
    const [target, setTarget] = useState("")
    const [targetAuthor, setTargetAuthor] = useState("")

    const menu = menu_handlers()
    const jobs = useJobs()
    const users = useUsers()
    // console.log("this what we are testing", target._id, "and this is the target", users)
    console.log("this the author", targetAuthor)



    useEffect(() => {
        function handlePostTarget() {
            for (const job of jobs) {
                if (job._id === viewTarget) {
                    setTarget(job)
                    break;
                }
            }
        }
        function handlePostAuthor() {
            for (const freeLancer of users) {
                console.log(freeLancer._id, "and", target.author)
                if (freeLancer._id === target.author) {
                    setTargetAuthor(freeLancer)
                }
            }
        }
        handlePostTarget();
        handlePostAuthor()
    })

    console.log(targetAuthor)

    return (
        <div className="fixed flex inset-0 lato">
            <div className="fixed absolute z-[10] inset-0 bg-black opacity-30"></div>
            <div className="fixed inset-0 flex absolute z-[20]">
                <div className="flex m-auto">
                    <div className="flex flex-col bg-white border shadow-lg rounded-l-xl justify-between p-4 w-[300px] h-[350px]">
                        <div className="">
                            <h1 className="mb-6 text-[25px] font-bold">{target.title}</h1>
                            <h1 className="">{target.description}</h1>
                        </div>
                        <h1 className="mb-6">{target.location}</h1>
                    </div>
                    <div className="bg-[#f2f3cc] rounded-r-xl p-3 w-[250px] h-[350px]">
                        <div className="mb-3 flex justify-between">
                            <h1>Author Information</h1>
                            <button onClick={menu.handleViewPost}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:text-red-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col bg-white p-2 rounded-lg h-[200px] text-center gap-4 lato">
                            <h1 className="text-[20px] font-bold">{targetAuthor.username}</h1>
                            <p className="text-[15px]">{targetAuthor.bio}</p>
                        </div>
                        <div className="mt-4 p-1 rounded-lg text-center bg-[#b5cb0c] text-white font-medium">{targetAuthor.email}</div>
                        <div className="mt-4 p-1 rounded-lg text-center bg-[#b5cb0c] text-white font-medium">{targetAuthor.phoneNumber}</div>
                    </div>


                </div>
            </div>
        </div>
    )
}