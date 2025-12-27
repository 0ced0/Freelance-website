import { usePopularFreeLancers, useUsers } from "../../hooks/userHooks";
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../AuthContext";

export default function ProfileCard({ setIsViewingProfile, setViewProfileTarget, query }) {
    const users = usePopularFreeLancers()
    const searchUser = useUsers()
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    if (query === "") {
        console.log("we are doing this")
        return (
            <div className="w-[95%] mx-auto rounded-xl mt-8 p-4 bg-white lato text-[#413D49] border shadow-[0px_10px_10px_1px_rgba(0,0,0,0.4)]">
                <h1 className="left-5 text-[20px]">Popular Freelancers</h1>

                <div className="flex">
                    {users?.map((freeLancer) => {
                        return (
                            <button onClick={user ? () => {
                                setIsViewingProfile(prev => !prev);
                                setViewProfileTarget(freeLancer)
                            } : () => navigate("/profile")}
                                className="flex flex-col bg-white shadow-lg rounded-[15px] border m-2 border p-4 w-[220px] h-[245px] text-start justify-between">
                                <div>
                                    <p className="text-[20px] font-bold">{freeLancer.username}</p>
                                    <p className="text-[10px]">{freeLancer.email}</p>
                                    <p className="w-full mt-4 line-clamp-2">{freeLancer.bio}</p>
                                </div>
                                <p className="flex gap-2 flex flex-wrap overflow-hidden h-[55px]">Skills: {freeLancer.skills?.length >= 1 ? (freeLancer.skills.map((skill, index) => {
                                    if (skill === "") { return (null) } return (<span key={index} className="bg-[#b5cb0c] p-1 rounded-lg text-white text-[10px]">{skill}</span>)
                                })) : null}</p>
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div className="w-[95%] mx-auto rounded-xl mt-8 p-4 bg-white lato text-[#413D49] border shadow-[0px_10px_10px_1px_rgba(0,0,0,0.4)]">
                <h1 className="left-5 text-[20px]">Popular Freelancers</h1>

                <div className="flex">
                    {Array.isArray(searchUser) ?
                        searchUser
                            .filter((freeLancer) =>
                                freeLancer.username?.toLowerCase().includes(query?.toLowerCase())
                            )
                            .map((freeLancer) => {
                                console.log(freeLancer.username)
                                return (
                                    <button onClick={() => {
                                        setIsViewingProfile(prev => !prev);
                                        setViewProfileTarget(freeLancer)
                                    }}
                                        className="flex flex-col bg-white shadow-lg rounded-[15px] border m-2 border p-4 w-[220px] h-[245px] text-start justify-between">
                                        <div>
                                            <p className="text-[20px] font-bold">{freeLancer.username}</p>
                                            <p className="text-[10px]">{freeLancer.email}</p>
                                            <p className="w-full mt-4 line-clamp-2">{freeLancer.bio}</p>
                                        </div>
                                        <p className="flex gap-2 flex flex-wrap overflow-hidden line-clamp-2">Skills: {freeLancer.skills?.length >= 1 ? (freeLancer.skills.map((skill, index) => {
                                            if (skill === "") { return (null) } return (<span key={index} className="bg-[#b5cb0c] p-1 rounded-lg text-white text-[10px]">{skill}</span>)
                                        })) : null}</p>
                                    </button>
                                )
                            }) : null}
                </div>
            </div>
        )
    }
}

export const CheckUser = ({ setIsViewingProfile, viewProfileTarget, user }) => {
    const navigate = useNavigate()
    const freeLancer = viewProfileTarget

    useEffect(() => {
        const handleVisit = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8000/api/${freeLancer._id}/visit`,
                    {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json",
                        },
                    }
                )
            } catch (error) {
                console.log(error)
            }
        }
        handleVisit()
    }, [viewProfileTarget, freeLancer._id])

    return (
        <div className="fixed inset-0">
            <div className="absolute z-[10] fixed inset-0 bg-black opacity-40"></div>
            <div className="absolute z-[20] fixed inset-0 flex">
                <div className="my-auto flex h-[300px] w-full justify-center">
                    <div className="flex flex-col bg-white shadow-lg rounded-l-lg p-4 h-full w-[35%] justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-[30px] font-medium">{freeLancer.username}</h1>
                            <h1>{freeLancer.email}</h1>
                        </div>
                        <div className="mb-16 text-[15px]">
                            <h1 className="font-medium">about me</h1>
                            <h1 className="">{freeLancer.bio}</h1>
                        </div>
                        <div className="text-[15px] flex gap-2">
                            <h1 className="font-medium whitespace-nowrap">my skills: </h1>
                            <h1 className="flex flex-wrap max-h-[35px] overflow-hidden gap-2 line-clamp-1">{freeLancer.skills?.length > 0 ?
                                freeLancer.skills.map((skill) => {
                                    if (skill !== "") {
                                        return (
                                            <div className="flex items-center bg-[#b5cb0c] p-1 text-white  rounded-lg px-1 text-[10px]">{skill}</div>
                                        )
                                    }
                                }) : null
                            }</h1>
                        </div>
                    </div>
                    <div className="bg-gray-400 h-full p-4 rounded-r-lg w-[25%] flex flex-col justify-center relative">
                        <button onClick={() => { user ? setIsViewingProfile(prev => !prev) : navigate("/profile") }} className="ml-auto absolute top-3 right-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:stroke-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>

                        <div className="bg-white shadow-[0px_5px_25px_2px_rgba(0,0,0,0.3)] p-4 rounded-xl gap-2 flex flex-col">
                            <h1 className="mb-4 font-medium">Contact me at: </h1>
                            <h1>{freeLancer.email}</h1>
                            <h1>{freeLancer.phoneNumber}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}