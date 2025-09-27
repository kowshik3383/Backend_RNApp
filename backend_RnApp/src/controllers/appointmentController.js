import prisma from "../config/prisma.js";

// ✅ Book an appointment
export async function bookAppointment(req, res) {
  const { doctorId, date, amount } = req.body;

  if (!doctorId || !date || !amount) {
    return res.status(400).json({ error: "Doctor, Date & Amount are required" });
  }

  try {
    // check doctor exists
    const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // create appointment
    const appointment = await prisma.appointment.create({
      data: {
        userId: req.user.userId,
        doctorId,
        date: new Date(date),
        amount,
      },
      include: { doctor: true },
    });

    res.json({ message: "Appointment booked successfully", appointment });
  } catch (err) {
    console.error("❌ Error booking appointment:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// ✅ Get all appointments of logged-in user
export async function getMyAppointments(req, res) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: req.user.userId },
      include: { doctor: true },
      orderBy: { date: "asc" },
    });

    res.json(appointments);
  } catch (err) {
    console.error("❌ Error fetching appointments:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// ✅ Cancel appointment
export async function cancelAppointment(req, res) {
  const { id } = req.params;

  try {
    const appointment = await prisma.appointment.findUnique({ where: { id: Number(id) } });

    if (!appointment) return res.status(404).json({ error: "Appointment not found" });
    if (appointment.userId !== req.user.userId) {
      return res.status(403).json({ error: "Not your appointment" });
    }

    if (appointment.status === "cancelled") {
      return res.status(400).json({ error: "Already cancelled" });
    }

    const updated = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { status: "cancelled" },
    });

    res.json({ message: "Appointment cancelled", updated });
  } catch (err) {
    console.error("❌ Error cancelling appointment:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// ✅ Doctor: Get appointments for logged-in doctor
export async function getDoctorAppointments(req, res) {
  try {
    const doctor = await prisma.doctor.findUnique({ where: { userId: req.user.userId } });
    if (!doctor) return res.status(404).json({ error: "Doctor profile not found" });

    const appointments = await prisma.appointment.findMany({
      where: { doctorId: doctor.id },
      include: { user: true },
      orderBy: { date: "asc" },
    });

    res.json(appointments);
  } catch (err) {
    console.error("❌ Error fetching doctor appointments:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}
