import express from "express";
import { bookAppointment, getMyAppointments, cancelAppointment, getDoctorAppointments } from "../controllers/appointmentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; // ensure user is logged in

const router = express.Router();

// user
router.post("/book", authMiddleware, bookAppointment);
router.get("/my", authMiddleware, getMyAppointments);
router.put("/cancel/:id", authMiddleware, cancelAppointment);

// doctor
router.get("/doctor", authMiddleware, getDoctorAppointments);

export default router;
