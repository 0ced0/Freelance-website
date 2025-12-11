import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import route from "./routes/JobsRoute.js"
import cors from "cors";

// const uri = "mongodb+srv://nrosscedric_db_user:goodmorning246810@freelance-website.fatvult.mongodb.net/?appName=Freelance-website";


const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 2000;
const my_db = process.env.MONGO_URL

mongoose
    .connect(my_db)
    .then(() => {
        console.log("db connected succesfully")
        app.listen(PORT, () => {
            console.log(`server is running on port : ${PORT}`)
        });
    })
    .catch((error) => console.log(error))

// const jobs_schema = new mongoose.Schema({
//     name: String,
//     price: Number,
// });


// const Item = mongoose.model("jobs", ItemSchema);

// app.get("/api/items", async (req, res) => {
//     const items = await Item.find();
//     res.json(items);
// });

// app.post("/api/items", async (req, res) => {
//     const newItem = await Item.create(req.body);
//     res.json(newItem);
// });

app.use("/api", route);






// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// const userSchema = new mongoose.Schema({})



// async function run() {
//     try {
//         await client.connect();
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);