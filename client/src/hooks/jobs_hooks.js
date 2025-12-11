import { useEffect, useState } from "react";

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


