import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/server/admin-auth";
import { uploadAsset } from "@/lib/server/content-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    assertAdmin(request.headers.get("authorization"));
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const result = await uploadAsset(file);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Request failed" }, { status: 401 });
  }
}
