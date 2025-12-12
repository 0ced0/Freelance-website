import { newJob } from "../controllers/JobsController.js";
import { getJobs } from "../controllers/JobsController.js";
import { registerUser } from "../controllers/UsersControllers.js";
import { loginUser } from "../controllers/UsersControllers.js";
import { checkUser } from "../controllers/UsersControllers.js";
import express from "express";
const route = express.Router();

route.post("/login", loginUser)
route.post("/register", registerUser)
route.post("/jobs", newJob)
route.get("/jobs", getJobs)
route.get("/auth/me", checkUser)

export default route  