import prisma from "../config/prisma.js";
import { generateOTP, sendSMS } from "../../services/auth/otpService.js";
import { signToken } from "../config/jwt.js";

export async function requestOTP(req, res) {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone is required" });

  const otp = generateOTP();
  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  let user = await prisma.user.findUnique({ where: { phone } });
  if (!user) {
    user = await prisma.user.create({ data: { phone, otp, otpExpires: expiry } });
  } else {
    user = await prisma.user.update({ where: { phone }, data: { otp, otpExpires: expiry } });
  }

  await sendSMS(phone, otp);
  res.json({ message: "OTP sent successfully" });
}

export async function verifyOTP(req, res) {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ error: "Phone & OTP required" });

  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user || !user.otp || !user.otpExpires) {
    return res.status(400).json({ error: "OTP not requested" });
  }

  if (user.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });
  if (new Date() > user.otpExpires) return res.status(400).json({ error: "OTP expired" });

  await prisma.user.update({ where: { phone }, data: { otp: null, otpExpires: null } });

  const token = signToken({ userId: user.id, phone: user.phone });
  res.json({ message: "OTP verified", token });
}
