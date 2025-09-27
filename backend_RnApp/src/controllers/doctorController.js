import prisma from "../config/prisma.js";

// ✅ Register doctor
export async function registerDoctor(req, res) {
  const { name, designation, hospital, place, phone, email } = req.body;

  if (!name || !designation || !hospital || !place || !phone || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existing = await prisma.doctor.findUnique({
      where: { userId: req.user.userId },
    });

    if (existing) {
      return res.status(400).json({ error: "Doctor profile already exists" });
    }

    const doctor = await prisma.doctor.create({
      data: {
        userId: req.user.userId,
        name,
        designation,
        hospital,
        place,
        phone,
        email,
      },
    });

    res.json({ message: "Doctor registered successfully", doctor });
  } catch (err) {
    console.error("❌ Error registering doctor:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// ✅ Get logged-in doctor
export async function getDoctorProfile(req, res) {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { userId: req.user.userId },
    });

    if (!doctor) return res.status(404).json({ error: "Doctor profile not found" });

    res.json(doctor);
  } catch (err) {
    console.error("❌ Error fetching doctor:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// ✅ Update doctor profile
export async function updateDoctorProfile(req, res) {
  const { name, designation, hospital, place, phone, email } = req.body;

  try {
    const doctor = await prisma.doctor.update({
      where: { userId: req.user.userId },
      data: { name, designation, hospital, place, phone, email },
    });

    res.json({ message: "Doctor profile updated", doctor });
  } catch (err) {
    console.error("❌ Error updating doctor:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}
