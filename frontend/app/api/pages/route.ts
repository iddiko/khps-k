import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/server/admin-auth";
import { createPageContent, getPageContent, getPagesContent, updatePageContent } from "@/lib/server/content-store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    const pages = await getPagesContent();
    return NextResponse.json(pages);
  }

  const page = await getPageContent(slug.split("/").filter(Boolean));
  return NextResponse.json(page);
}

export async function POST(request: Request) {
  try {
    assertAdmin(request.headers.get("authorization"));
    const body = await request.json();
    const page = await createPageContent(body);
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error) }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    assertAdmin(request.headers.get("authorization"));
    const body = await request.json();
    const page = await updatePageContent(body);
    return NextResponse.json(page);
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ message }, { status: message === "Page not found" ? 404 : 401 });
  }
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Request failed";
}
