import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/server/admin-auth";
import { addMenuContent, getMenusContent } from "@/lib/server/content-store";

export const runtime = "nodejs";

export async function GET() {
  const menus = await getMenusContent();
  return NextResponse.json(menus);
}

export async function POST(request: Request) {
  try {
    assertAdmin(request.headers.get("authorization"));
    const body = await request.json();
    const menu = await addMenuContent(body.parentTitle, body.childTitle);
    return NextResponse.json(menu, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error) }, { status: 401 });
  }
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Request failed";
}
