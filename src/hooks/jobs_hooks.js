import { useEffect, useState } from "react";

export function useLatestJobs() {
    const [latestJobs, setLatestJobs] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("http://localhost:8000/api/latestJobs");
                const data = await result.json();
                setLatestJobs(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return latestJobs;
}

export default function useJobs() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/jobs")
                const data = await res.json();
                setJobs(data)
            } catch (error) {
                console.error("error fetching data")
            }
        };
        fetchData()
    }, [])

    return jobs;
}


