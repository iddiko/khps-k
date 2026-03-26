import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/server/admin-auth";
import { getSiteConfigContent, saveSiteContent } from "@/lib/server/content-store";

export const runtime = "nodejs";

export async function GET() {
  const site = await getSiteConfigContent();
  return NextResponse.json(site);
}

export async function PUT(request: Request) {
  try {
    assertAdmin(request.headers.get("authorization"));
    const body = await request.json();
    await saveSiteContent("site", body);
    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Request failed" }, { status: 401 });
  }
}
