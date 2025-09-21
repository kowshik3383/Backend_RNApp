import prisma from "../config/prisma.js";

// CREATE log
export async function createGlucoseLog(req, res) {
  const { value, context, takenAt } = req.body;

  if (!value || !context) {
    return res.status(400).json({ error: "Glucose value & context required" });
  }

  try {
    const log = await prisma.glucoseLog.create({
      data: {
        userId: req.user.userId,
        value,
        context,
        takenAt: takenAt ? new Date(takenAt) : new Date(),
      },
    });

    res.json({ message: "Glucose log created", log });
  } catch (err) {
    console.error("❌ Error creating glucose log:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// READ all logs for logged-in user
export async function getGlucoseLogs(req, res) {
  try {
    const logs = await prisma.glucoseLog.findMany({
      where: { userId: req.user.userId },
      orderBy: { takenAt: "desc" },
    });

    res.json(logs);
  } catch (err) {
    console.error("❌ Error fetching logs:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// UPDATE log
export async function updateGlucoseLog(req, res) {
  const { id } = req.params;
  const { value, context, takenAt } = req.body;

  try {
    const log = await prisma.glucoseLog.updateMany({
      where: { id: Number(id), userId: req.user.userId },
      data: { value, context, takenAt: takenAt ? new Date(takenAt) : undefined },
    });

    if (!log.count) return res.status(404).json({ error: "Log not found" });

    res.json({ message: "Glucose log updated" });
  } catch (err) {
    console.error("❌ Error updating log:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// DELETE log
export async function deleteGlucoseLog(req, res) {
  const { id } = req.params;

  try {
    const log = await prisma.glucoseLog.deleteMany({
      where: { id: Number(id), userId: req.user.userId },
    });

    if (!log.count) return res.status(404).json({ error: "Log not found" });

    res.json({ message: "Glucose log deleted" });
  } catch (err) {
    console.error("❌ Error deleting log:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}
