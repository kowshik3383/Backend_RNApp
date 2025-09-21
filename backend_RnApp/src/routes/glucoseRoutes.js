import express from "express";
import {
  createGlucoseLog,
  getGlucoseLogs,
  updateGlucoseLog,
  deleteGlucoseLog,
} from "../controllers/glucoseController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware); // all routes need auth

router.post("/", createGlucoseLog);     // Create log
router.get("/", getGlucoseLogs);        // Get all logs
router.put("/:id", updateGlucoseLog);   // Update
router.delete("/:id", deleteGlucoseLog);// Delete

export default router;
