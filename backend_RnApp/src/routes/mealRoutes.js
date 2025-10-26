// routes/mealRoutes.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, mealType, description, calories, carbs, protein, fat } = req.body;

    if (!userId || !mealType) {
      return res.status(400).json({ error: "userId and mealType are required" });
    }

    const meal = await prisma.mealLog.create({
      data: {
        userId,
        mealType,
        description,
        calories,
        carbs,
        protein,
        fat,
      },
    });

    res.json(meal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to log meal" });
  }
});
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const meals = await prisma.mealLog.findMany({
      where: { userId: Number(userId) },
      orderBy: { loggedAt: "desc" },
    });
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch meals" });
  }
});

router.delete("/:mealId", async (req, res) => {
  try {
    const { mealId } = req.params;
    await prisma.mealLog.delete({
      where: { id: Number(mealId) },
    });
    res.json({ message: "Meal deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete meal" });
  }
});

export default router;
