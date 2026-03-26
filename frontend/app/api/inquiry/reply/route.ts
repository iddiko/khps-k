import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/server/admin-auth";
import { replyInquiry } from "@/lib/server/content-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    assertAdmin(request.headers.get("authorization"));
    const body = await request.json();
    const inquiry = await replyInquiry(body);
    return NextResponse.json(inquiry);
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Request failed" }, { status: 401 });
  }
}
