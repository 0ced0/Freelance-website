import { Navbar } from '../components/home/Navbar';
import { JobPostings } from '../components/home/JobPostings';
import home_group from '../assets/home_group.jpg';
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from '../AuthContext';
import { ViewJobPost } from '../components/home/ViewPost';
import ProfileCard from '../components/home/ProfileCard';
import { CheckUser } from '../components/home/ProfileCard';

function Home() {
    const [query, setQuery] = useState("")
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    // Menu States
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isViewing, setIsViewing] = useState(false)
    const [viewTarget, setViewTarget] = useState(null)
    const [isViewingProfile, setIsViewingProfile] = useState(false)
    const [viewProfileTarget, setViewProfileTarget] = useState("")

    function handleSearchQuery(e) {
        setQuery(e.target.value)
    }

    const menu_handlers = () => {
        function handleOpenProfile() {
            setIsProfileOpen(prev => !prev)
        }
        function handleViewPost(key) {
            setIsViewing(prev => !prev)
            setViewTarget(key)
        }
        return {
            handleOpenProfile,
            handleViewPost
        }
    }


    if (!user) {
        // Menu Handlers

        return (
            <div className="relative space-y-4 text-[#4B4A54] scrollbar scrollbar-thumb-blue-100 ">
                {/* <NewJobForm /> */}

                <Navbar isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} toggleMenu={menu_handlers} searchQuery={query} handleSearchQuery={handleSearchQuery} />
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
                <JobPostings query={query} />
                <ProfileCard setIsViewingProfile={setIsViewingProfile} setViewProfileTarget={setViewProfileTarget} query={query} />
            </div>
        );
    } else {
        // logged in
        return (
            <div className="relative text-[#4B4A54]  scrollbar-thumb-red-600 scrollbar-thumb-rounded-full">
                {/* <NewJobForm /> */}

                <Navbar
                    isProfileOpen={isProfileOpen}
                    setIsProfileOpen={setIsProfileOpen}
                    toggleMenu={menu_handlers}
                    searchQuery={query}
                    handleSearchQuery={handleSearchQuery} />
                <JobPostings query={query} isViewing={isViewing} menu_handlers={menu_handlers} />
                <ProfileCard setIsViewingProfile={setIsViewingProfile} setViewProfileTarget={setViewProfileTarget} query={query} />
                {isViewing && (<ViewJobPost menu_handlers={menu_handlers} viewTarget={viewTarget} />)}
                {isViewingProfile && (<CheckUser setIsViewingProfile={setIsViewingProfile} user={user} viewProfileTarget={viewProfileTarget} />)}
            </div>
        );
    }


}

export default Home;
