import Jobs from "../../../server/src/models/JobsDB.js";


export const displayJobs = async (req, res) => {
    try {
        const job = await Jobs.find()
        res.status(200).json(job)
    } catch (error) {
        res.status(500).json({ messaage: "Something went wrong" })
    }
}

export const newJob = async (req, res) => {
    try {
        const { title, description, location, date, category } = req.body;
        const job = new Jobs({ title, description, location, date, category })
        await job.save();

        res.status(201).json(job);
    }
    catch (error) {
        res.status(500).json({ message: "failed to submit" })
    }
};

export const getJobs = async (req, res) => {
    try {
        const allJobs = await Jobs.find()
        if (!allJobs || allJobs.length === 0)
            return res.status(404).json("No jobs available")
        res.status(200).json(allJobs)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


