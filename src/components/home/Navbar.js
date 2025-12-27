import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from '../../AuthContext';
import { UserCircleIcon } from '@heroicons/react/20/solid';


export const Navbar = ({ isProfileOpen, toggleMenu, searchQuery, handleSearchQuery, setIsProfileOpen }) => {
    const menuFunctions = toggleMenu()
    const navigate = useNavigate()
    const { user, loading, setUser } = useContext(AuthContext)

    let profileDropdown = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (isProfileOpen && !profileDropdown.current.contains(e.target)) {
                setIsProfileOpen(false)
            }
        };

        document.addEventListener("mousedown", handler)

        return (() => {
            document.removeEventListener("mousedown", handler)
        }
        )
    })

    // Redirect Handlers
    const page = () => {
        function goToProfile() {
            navigate("/profile")
        }
        return {
            goToProfile
        }
    }
    const menuPages = page()


    function logout() {
        setUser(false)
    }
    return (
        <div className="w-full py-3 mb-16 flex justify-between bg-white shadow-lg">

            {/* Supposed Logo */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" w-10 h-10 text-[#b5cb00] ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
            </svg>


            {/* Search Bar */}
            <div className=" w-[40%] mr-auto ml-6">
                <div className="relative w-full">
                    <input onChange={handleSearchQuery}
                        type="text"
                        value={searchQuery}
                        placeholder="Search for services or creators"
                        className="w-full pl-8 rounded-xl border border-gray-300 bg-white py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <div className="absolute inset-y-0 pl-2 flex items-center pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-500 "
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m0 0A7 7 0 104.65 4.65a7 7 0 0012 12z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {!user ? <button onClick={() => { navigate("/login") }} className="bg-[#b5cb0c] px-3 rounded-[15px] text-white font-medium ml-auto">
                Login
            </button> : null}

            {!user ? <button onClick={() => { navigate("/profile") }} className="bg-[#b5cb0c] px-3 rounded-[15px] text-white font-medium ml-8">
                Create Account
            </button> : null}


            {/* Menu Field */}
            <div ref={profileDropdown} className="flex justify-end mr-5 ml-5">
                {/* Profile */}
                <button onClick={menuFunctions.handleOpenProfile}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>

                {/* Menu Option */}
                {
                    isProfileOpen && (
                        <div className="flex flex-col space-y-4 bg-white rounded-lg shadow-[0px_5px_35px_0px_rgba(0,0,0,0.2)] p-3 absolute right-10 top-16">
                            <button onClick={menuPages.goToProfile} className="hover:text-[#57ba4c] text-left">My Profile</button>
                            <button onClick={() => { logout(); setIsProfileOpen() }} className="hover:text-[#57ba4c] text-left">Log out</button>
                        </div>
                    )
                }
            </div>


        </div>
    )
}