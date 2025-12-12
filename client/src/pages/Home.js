import { Navbar } from '../components/Navbar';
import { JobPostings } from '../components/JobPostings';
import home_group from '../assets/home_group.jpg';
import { Footer } from '../components/Footer';
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from '../AuthContext';

function Home() {
    const { user, loading } = useContext(AuthContext)
    const navigate = useNavigate()
    // Menu States
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    if (!user) {
        // Menu Handlers
        const menu_handlers = () => {
            function handleOpenProfile() {
                setIsProfileOpen(prev => !prev)
            }

            function testFunction() {
                console.log("this is a test function")
            }

            return {
                handleOpenProfile,
                testFunction
            }
        }

        return (
            <div className="relative space-y-4 text-[#4B4A54]">
                {/* <NewJobForm /> */}

                <Navbar isProfileOpen={isProfileOpen} toggleMenu={menu_handlers} />
                <div className="flex w-[70%] m-auto justify-center">
                    <div className="p-9 text-center shadow items-center border rounded-l-[30px] lato font-bold text-[#4B4A54] h-auto">
                        <p className="text-[40px] ">Join the Community!</p>
                        <p className="mb-4">
                            Learn Together,
                            Grow Together
                            <br />
                            And be Succesful Together
                        </p>
                        <button onClick={() => navigate("/profile")} className="bg-[#b5cb00] p-2 rounded-[10px] text-white">
                            Create Account
                        </button>
                    </div>
                    <img
                        src={home_group}
                        alt='group_picture'
                        className="w-[40%] h-auto shadow "
                    />
                </div>
                <JobPostings />
                <Footer />
            </div>
        );
    } else {
        // Menu Handlers
        const menu_handlers = () => {
            function handleOpenProfile() {
                setIsProfileOpen(prev => !prev)
            }

            function testFunction() {
                console.log("this is a test function")
            }

            return {
                handleOpenProfile,
                testFunction
            }
        }

        return (
            <div className="relative text-[#4B4A54] bg-[#f2f3cc]">
                {/* <NewJobForm /> */}

                <Navbar isProfileOpen={isProfileOpen} toggleMenu={menu_handlers} />
                <JobPostings />
            </div>
        );
    }


}

export default Home;
