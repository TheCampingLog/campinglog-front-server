import sampleBoards from "@/lib/constants/sample-boards.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(sampleBoards, { status: 200 });
}
