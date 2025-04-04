import express from "express";
import axios from "axios";
import { exec } from "child_process";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors()); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
