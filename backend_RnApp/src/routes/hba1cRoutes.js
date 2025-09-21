import express from "express";
import {
  createHba1cLog,
  getHba1cLogs,
  updateHba1cLog,
  deleteHba1cLog,
} from "../controllers/hba1cController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all HbA1c routes
router.use(authMiddleware);

// CRUD routes
router.post("/", createHba1cLog);
router.get("/", getHba1cLogs);
router.put("/:id", updateHba1cLog);
router.delete("/:id", deleteHba1cLog);

export default router;
