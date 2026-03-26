import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/server/admin-auth";
import { createInquiry, listInquiries } from "@/lib/server/content-store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    assertAdmin(request.headers.get("authorization"));
    const inquiries = await listInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const inquiry = await createInquiry(body);
    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Request failed" }, { status: 500 });
  }
}
