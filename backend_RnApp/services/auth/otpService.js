import client from "../../src/config/twilio.js";

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendSMS(phone, otp) {
  try {
    const message = await client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });
    console.log("✅ SMS sent:", message.sid);
  } catch (err) {
    console.error("❌ Error sending SMS:", err.message);
  }
}
