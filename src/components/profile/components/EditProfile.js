import { AuthContext } from "../../../AuthContext"
import { useContext, useState } from "react"

export default function EditProfile({ setIsEditProfile }) {
    const { user, setUser, token } = useContext(AuthContext)
    const [newSkill, setNewSkill] = useState("")
    const [editProfileData, setEditProfileData] = useState({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber || "Add Phone Number",
        bio: user.bio || "Add Bio",
        skills: user.skills || null
    })

    const handleSubmitEditData = async () => {
        const res = await fetch(`https://freelance-website-server.onrender.com/api/freelancers/${user._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(editProfileData)
        });
        const updatedUser = await res.json();
        setUser(updatedUser);
        setIsEditProfile(false);
    }

    return (
        <div >
            <div className="absolute z-[10] fixed inset-0 bg-gray-500 opacity-50"></div>
            <div className="absolute fixed inset-0 z-[20] flex w-full">
                <div className="flex flex-col w-[30%] bg-white shadow-lg rounded-lg mx-auto my-auto p-4 lato gap-3">
                    <input className="text-[25px] p-1 bg-gray-100 focus:border-none focus:outline-none rounded" value={editProfileData.username} onChange={e => setEditProfileData({ ...editProfileData, username: e.target.value })}></input>
                    <input className="text-[15px] p-1 bg-gray-100 focus:border-none focus:outline-none rounded" value={editProfileData.email} onChange={e => setEditProfileData({ ...editProfileData, email: e.target.value })}></input>
                    <input className="text-[15px] p-1 bg-gray-100 focus:border-none focus:outline-none rounded" value={editProfileData.phoneNumber} onChange={e => setEditProfileData({ ...editProfileData, phoneNumber: e.target.value })}></input>
                    <textarea rows="8" className="resize-none p-1 bg-gray-100 rounded" value={editProfileData.bio} onChange={e => setEditProfileData({ ...editProfileData, bio: e.target.value })}></textarea>
                    <div className="flex flex-wrap overflow-auto gap-3 ">
                        {editProfileData.skills?.length > 0 ? editProfileData.skills.map((skill, index) => (
                            <div key={index} className="bg-white shadow-md rounded-md py-1 px-2">{skill}</div>
                        )) : null}

                        <input
                            className="p-1 bg-[#b5cb0c] rounded-lg w-[110px] text-white placeholder-white text-center focus:placeholder-transparent focus:outline-none focus:border-none"
                            placeholder="add a skill"
                            value={newSkill}
                            onChange={e => setNewSkill(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter" && newSkill.trim() !== "") {
                                    setEditProfileData(prev => ({
                                        ...prev,
                                        skills: [...prev.skills, newSkill.trim()]
                                    }));
                                    setNewSkill(""); // clear input
                                    e.preventDefault(); // prevent form submission if inside a form
                                }
                            }}
                        />
                    </div>
                    <div className="flex gap-5 ml-auto">
                        <button className="bg-gray-400 px-3 py-2 rounded-lg" onClick={() => setIsEditProfile(prev => !prev)}>close</button>
                        <button className="bg-[#b5cb0c] px-3 py-2 rounded-lg text-white" onClick={handleSubmitEditData}>save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}