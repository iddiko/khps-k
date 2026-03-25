import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "change-this-secret";

export const signToken = (payload) => jwt.sign(payload, secret, { expiresIn: "12h" });

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    req.user = jwt.verify(token, secret);
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
