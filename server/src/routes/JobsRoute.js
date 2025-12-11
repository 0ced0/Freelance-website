import express from "express";
import { newJob } from "../controllers/JobsController.js";
import { getJobs } from "../controllers/JobsController.js";

const route = express.Router()

route.post("/jobs", newJob)
route.get("/jobs", getJobs)



export default route  