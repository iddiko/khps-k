import "server-only";
import jwt from "jsonwebtoken";

const adminId = process.env.ADMIN_ID || "admin";
const adminPassword = process.env.ADMIN_PASSWORD || "1761";
const adminJwtSecret = process.env.ADMIN_JWT_SECRET || "change-this-admin-jwt-secret";

export function validateAdminCredentials(id: string, password: string) {
  return id === adminId && password === adminPassword;
}

export function issueAdminToken() {
  return jwt.sign({ sub: adminId, role: "admin" }, adminJwtSecret, { expiresIn: "12h" });
}

export function verifyAdminToken(token: string) {
  return jwt.verify(token, adminJwtSecret);
}

export function getBearerToken(headerValue: string | null) {
  if (!headerValue?.startsWith("Bearer ")) {
    return null;
  }

  return headerValue.slice("Bearer ".length);
}

export function assertAdmin(headerValue: string | null) {
  const token = getBearerToken(headerValue);

  if (!token) {
    throw new Error("Unauthorized");
  }

  verifyAdminToken(token);
}
