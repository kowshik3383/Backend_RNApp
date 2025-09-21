import prisma from "../config/prisma.js";

// CREATE HbA1c log
export async function createHba1cLog(req, res) {
  const { value, unit, takenAt } = req.body;

  if (!value) {
    return res.status(400).json({ error: "HbA1c value is required" });
  }

  try {
    const log = await prisma.hba1cLog.create({
      data: {
        userId: req.user.userId,
        value: parseFloat(value),
        unit: unit || "%",
        takenAt: takenAt ? new Date(takenAt) : new Date(),
      },
    });

    res.json({ message: "HbA1c log created", log });
  } catch (err) {
    console.error("❌ Error creating HbA1c log:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// READ logs
export async function getHba1cLogs(req, res) {
  try {
    const logs = await prisma.hba1cLog.findMany({
      where: { userId: req.user.userId },
      orderBy: { takenAt: "desc" },
    });

    res.json(logs);
  } catch (err) {
    console.error("❌ Error fetching HbA1c logs:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// UPDATE log
export async function updateHba1cLog(req, res) {
  const { id } = req.params;
  const { value, unit, takenAt } = req.body;

  try {
    const log = await prisma.hba1cLog.updateMany({
      where: { id: Number(id), userId: req.user.userId },
      data: { 
        value: value ? parseFloat(value) : undefined, 
        unit, 
        takenAt: takenAt ? new Date(takenAt) : undefined 
      },
    });

    if (!log.count) return res.status(404).json({ error: "Log not found" });

    res.json({ message: "HbA1c log updated" });
  } catch (err) {
    console.error("❌ Error updating HbA1c log:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// DELETE log
export async function deleteHba1cLog(req, res) {
  const { id } = req.params;

  try {
    const log = await prisma.hba1cLog.deleteMany({
      where: { id: Number(id), userId: req.user.userId },
    });

    if (!log.count) return res.status(404).json({ error: "Log not found" });

    res.json({ message: "HbA1c log deleted" });
  } catch (err) {
    console.error("❌ Error deleting HbA1c log:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}
