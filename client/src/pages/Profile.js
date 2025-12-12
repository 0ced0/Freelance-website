import MyJobPostings from "../components/profile/pages/MyJobPostings";
import CreateAccount from "../components/profile/pages/CreateAccount";
import { useContext } from "react";
import { AuthContext } from "../AuthContext"

export default function ProfilePage() {
    const { user, loading } = useContext(AuthContext)

    return (
        <div>
            {
                user ?
                    // yes
                    <div className="fixed inset-0 bg-[#f2f3cc] text-[#4B4A54]">
                        <MyJobPostings />
                    </div>
                    :
                    <div className="fixed inset-0 bg-[#f2f3cc] lato">
                        <CreateAccount />
                    </div>
            }
        </div>
    )
}