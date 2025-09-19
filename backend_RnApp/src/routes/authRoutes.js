import express from "express";
import { requestOTP, verifyOTP, resendOTP } from "../controllers/authController.js";

const router = express.Router();

router.post("/request-otp", requestOTP);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);

export default router;
