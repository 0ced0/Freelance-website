import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();

            if (!res.ok) {
                alert(data.msg || "Login failed");
                return;
            }

            // SUCCESS → Save token
            localStorage.setItem("authToken", data.token);
            login(data.token, data.user);


            // OPTIONAL: redirect to home
            window.location.href = "/";
        } catch (err) {
            console.error(err);
            setError(true)
        }
    };

    return (
        <div className="fixed inset-0 bg-[#f2f3cc]">
            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-[30%] items-center p-4 mt-32 gap-2">
                <h1 className="text-[20px] mb-6">Login</h1>

                <h1>Enter Username</h1>
                <input
                    className="border shadow rounded w-[70%] px-2 py-1"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {error && (<p className="text-[10px] text-red-400 font-medium mb-4">*Could not login please check username or password</p>)}

                <h1>Enter Password</h1>
                <input
                    type="password"
                    className="border shadow rounded w-[70%] px-2 py-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && (<p className="text-[10px] text-red-400 font-medium">*Could not login please check username or password</p>)}

                <button
                    onClick={handleLogin}
                    className="bg-[#b5cb00] p-2 text-white font-bold rounded-lg mt-4"
                >
                    LOGIN
                </button>
            </div>
        </div>
    );
}
