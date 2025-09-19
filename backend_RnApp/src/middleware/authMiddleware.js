import { verifyToken } from "../config/jwt.js";

export function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Unauthorized" });

  try {
    const token = auth.split(" ")[1];
    req.user = verifyToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
