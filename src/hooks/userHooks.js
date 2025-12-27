import { useState, useEffect } from "react";

export const useUsers = () => {
    const [user, setUser] = useState([])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch("https://freelance-website-server.onrender.com/api/fetchFreeLancers")
                const data = await res.json()
                setUser(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserData()
    }, [])
    return user
}

export const usePopularFreeLancers = () => {
    const [popularFreeLancers, setPopularFreeLancers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch("https://freelance-website-server.onrender.com/api/fetchFreeLancers/popular")
                const result = await data.json()
                setPopularFreeLancers(result)

            } catch (error) {
                return (
                    console.log("failed to fetch popular", error)
                )
            }
        };
        fetchData()
    }, [])

    return popularFreeLancers
}