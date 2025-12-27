import MyProfile from "../components/profile/pages/MyProfile";
import CreateAccount from "../components/profile/pages/CreateAccount";
import { useContext } from "react";
import { AuthContext } from "../AuthContext"

export default function ProfilePage() {
    const { user, loading } = useContext(AuthContext)

    return (
        <div className="">
            {
                user ?
                    // yes
                    <div className="bg-[#f2f3cc] text-[#4B4A54]  min-h-[100vh]">
                        <MyProfile />
                    </div>
                    :
                    <div className="fixed inset-0 bg-[#f2f3cc] lato">
                        <CreateAccount />
                    </div>
            }
        </div>
    )
}