import express from "express";
import {
  createWeightLog,
  getWeightLogs,
  updateWeightLog,
  deleteWeightLog,
} from "../controllers/weightController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createWeightLog);
router.get("/", getWeightLogs);
router.put("/:id", updateWeightLog);
router.delete("/:id", deleteWeightLog);

export default router;
