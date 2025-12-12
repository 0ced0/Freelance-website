import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Login from "../../../pages/Login";

export default function CreateAccount() {
    const [statusMessage, setStatusMessage] = useState(null);
    const [statusType, setStatusType] = useState(null);
    const navigate = useNavigate()

    const handleSubmitAccount = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newUserData = Object.fromEntries(formData.entries())
        const res = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUserData)
        });
        console.log(newUserData);
        const data = await res.json();

        if (res.ok) {
            setStatusType("success");
            setStatusMessage("registered successfully!");

        } else {
            if (data.type === "DUPLICATE_EMAIL") {
                setStatusType("error");
                setStatusMessage("This email is already registered!");
            } else if (data.type === "DUPLICATE_KEY") {
                setStatusType("error");
                setStatusMessage(`Duplicate field: ${data.msg}`);
            } else {
                setStatusType("error");
                setStatusMessage(data.msg || "Something went wrong");
            }
            return;
        }
    }

    if (!statusType && statusType !== "success") {
        return (
            <form onSubmit={handleSubmitAccount} className="w-[40%] bg-white shadow-lg rounded-lg mx-auto flex flex-col mt-16 p-4">
                <h1 className="mx-auto text-[20px]">Create Account</h1>
                <div className="mx-auto mt-12 w-[80%]">
                    <h1>Username</h1>
                    <input name="username" className="shadow border rounded-lg w-full p-2" />
                </div>

                <div className="mx-auto mt-4 w-[80%]">
                    <h1>e-mail</h1>
                    <input name="email" className="shadow border rounded-lg w-full p-2" />
                </div>
                <div className="mx-auto mt-4 w-[80%]">
                    <h1>Password</h1>
                    <input name="password" className="shadow border rounded-lg w-full p-2" />
                </div>

                <button type="submit" className="mt-6 p-2 bg-[#b5cb00] mx-auto w-[30%] rounded-lg text-white font-bold">Submit</button>

                <h1 className="text-[13px] mx-auto my-2">Already have an account?</h1>

                <button type="button" onClick={() => navigate("/login")} className="p-2 bg-[#b5cb00] mx-auto w-[30%] rounded-lg text-white font-bold">Login</button>

                {statusMessage && (
                    <div className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg 
            ${statusType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}
        `}>
                        {statusMessage}
                    </div>
                )}
            </form>
        )
    } else if (statusType === "success") {
        return (
            <div className="w-[40%] bg-white shadow-lg rounded-lg mx-auto flex flex-col mt-16 p-4 text-center gap-5 mt-24">
                <h1>You have been succesfully registered, Welcome!</h1>
                <button onClick={() => navigate("/")} className="bg-[#b5cb00] rounded p-2 w-[40%] mx-auto text-white font-bold">GO TO HOME</button>

            </div>
        )
    }

    //     return (
    //         <div>
    //             {content}



    //         </div>
    //     )
}