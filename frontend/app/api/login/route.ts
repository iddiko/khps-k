import { NextResponse } from "next/server";
import { issueAdminToken, validateAdminCredentials } from "@/lib/server/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();

  if (!validateAdminCredentials(body.id, body.password)) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ token: issueAdminToken() });
}
