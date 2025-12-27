import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const categories = [
    "Creative",
    "Educational",
    "Web developer",
    "Mobile developer",
    "Photographer"
]

export default function NewJobForm({ isFormOpen, toggleForm }) {
    const [isCategoryOpen, setIsCategryOpen] = useState(false);
    const [category, setCategory] = useState("");
    const { user } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newJobData = Object.fromEntries(formData.entries())
        newJobData.author = user._id
        newJobData.email = user.email
        const res = await fetch("http://localhost:8000/api/jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newJobData)
        });

        setCategory("")
        e.target.reset()
        toggleForm()
    }

    function toggleCategory() {
        setIsCategryOpen(prev => !prev)
    }

    return (
        isFormOpen && (
            <div className="fixed inset-0">
                <div className="fixed z-[5] inset-0 bg-black opacity-30"></div>

                {/* this is the form */}
                <form onSubmit={handleSubmit} className="fixed flex flex-col space-y-5 z-[10] w-[40%] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[15px] shadow-2xl p-4">
                    <h1 className="mb-4 mx-auto text-[20px] font-medium">Create Job Post</h1>
                    <div className="text-left flex">
                        <div className="w-[60%] mr-5 relative">
                            <p>Enter Title</p>
                            <input name="title" required className="border border-black rounded w-full px-2" />
                        </div>
                        <input type="hidden" name="category" value={category} className="absolute opacity-0" />
                        <div className="w-[35%] relative">
                            <button type="button" onClick={toggleCategory} className="border shadow pr-5 pl-2 pt-1 flex rounded mt-5 h-8 w-full">
                                {category ? category : "Choose Category"}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`absolute size-5 right-1 transition-all duration-300 ${isCategoryOpen ? "rotate-180" : "rotate-0"}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                            {
                                isCategoryOpen && (
                                    < div className="absolute top-14 right-0 border py-2 flex flex-col bg-white shadow-[0px_2px_25px_1px_rgba(0,0,0,0.2)] rounded">
                                        {categories.map((category) => {
                                            return (
                                                <button type="button" onClick={() => { setCategory(category); toggleCategory() }} className="hover:bg-gray-100 px-3 py-1">{category}</button>
                                            )
                                        })}
                                    </div>
                                )
                            }
                        </div>

                    </div>
                    <div className="text-left w-[60%]">
                        <h1>Enter Location</h1>
                        <input name="location" required className="border border-black rounded w-full px-2" />
                    </div>
                    <div className="flex flex-col text-left">
                        <label htmlfor="description" className="">Enter Job Description</label>
                        <textarea name="description" className="border border-black rounded resize-none px-2" rows="5" cols="26"></textarea>
                    </div>
                    <div className="flex justify-end gap-5 px-3">
                        <button onClick={toggleForm} className="bg-gray-400 py-2 px-6 rounded font-medium">
                            Exit
                        </button>
                        <button type="submit" className="bg-[#b5cb00] px-6 py-2 rounded font-medium text-white">
                            Post
                        </button>
                    </div>
                </form>
            </div >
        )
    )
}