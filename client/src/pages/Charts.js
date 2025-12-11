import Chart from "chart.js/auto"
import { useEffect, useRef } from "react";

const data = [
    { year: 2010, count: 30 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
];

const Charts = () => {
    const canvas = useRef(null)
    const currentCanvas = useRef(null)

    useEffect(() => {
        currentCanvas.current = new Chart(
            canvas.current, {
            type: "bar",
            data: {
                labels: data.map(col => col.year),
                datasets: [{
                    label: "Acquisitions by year",
                    data: data.map(col => col.count)
                }]
            }
        }
        )
        return (() =>
            currentCanvas.current.destroy()
        )
    }, [])

    return (
        <div>
            <h1>test chart</h1>
            <canvas ref={canvas} className="w-auto h-auto"></canvas>
        </div>
    )
};

export default Charts;