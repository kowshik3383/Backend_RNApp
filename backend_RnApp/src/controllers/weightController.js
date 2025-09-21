import prisma from "../config/prisma.js";

// CREATE weight log
export async function createWeightLog(req, res) {
  const { value, unit, takenAt } = req.body;

  if (!value) {
    return res.status(400).json({ error: "Weight value is required" });
  }

  try {
    const log = await prisma.weightLog.create({
      data: {
        userId: req.user.userId,
        value: parseFloat(value),
        unit: unit || "kg",
        takenAt: takenAt ? new Date(takenAt) : new Date(),
      },
    });

    res.json({ message: "Weight log created", log });
  } catch (err) {
    console.error("❌ Error creating weight log:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// READ logs
export async function getWeightLogs(req, res) {
  try {
    const logs = await prisma.weightLog.findMany({
      where: { userId: req.user.userId },
      orderBy: { takenAt: "desc" },
    });

    res.json(logs);
  } catch (err) {
    console.error("❌ Error fetching weight logs:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// UPDATE log
export async function updateWeightLog(req, res) {
  const { id } = req.params;
  const { value, unit, takenAt } = req.body;

  try {
    const log = await prisma.weightLog.updateMany({
      where: { id: Number(id), userId: req.user.userId },
      data: { value, unit, takenAt: takenAt ? new Date(takenAt) : undefined },
    });

    if (!log.count) return res.status(404).json({ error: "Log not found" });

    res.json({ message: "Weight log updated" });
  } catch (err) {
    console.error("❌ Error updating weight log:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// DELETE log
export async function deleteWeightLog(req, res) {
  const { id } = req.params;

  try {
    const log = await prisma.weightLog.deleteMany({
      where: { id: Number(id), userId: req.user.userId },
    });

    if (!log.count) return res.status(404).json({ error: "Log not found" });

    res.json({ message: "Weight log deleted" });
  } catch (err) {
    console.error("❌ Error deleting weight log:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}
