import prisma from "../config/prisma.js";

export async function createProfile(req, res) {
  const { profilePic, name, age, email, gender } = req.body;

  if (!name || !email || !gender) {
    return res.status(400).json({ error: "Name, Email & Gender are required" });
  }

  try {
    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: { profilePic, name, age, email, gender },
    });

    res.json({ message: "Profile created successfully", user });
  } catch (err) {
    console.error("❌ Error creating profile:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}
