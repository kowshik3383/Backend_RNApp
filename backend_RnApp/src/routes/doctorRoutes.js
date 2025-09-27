import express from "express";
import {
  registerDoctor,
  getDoctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Register / create doctor profile
router.post("/", registerDoctor);

// Get logged-in doctor profile
router.get("/me", getDoctorProfile);

// Update doctor profile
router.put("/me", updateDoctorProfile);

export default router;
