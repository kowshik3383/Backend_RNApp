import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import glucoseRoutes from "./routes/glucoseRoutes.js"; 
import weightRoutes from "./routes/weightRoutes.js"; 
import hba1cRoutes from "./routes/hba1cRoutes.js"; 
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/glucose", glucoseRoutes); 
app.use("/weight", weightRoutes);
app.use("/hba1c", hba1cRoutes);
app.use("/doctor", doctorRoutes);

app.use("/appointment", appointmentRoutes);


export default app;
