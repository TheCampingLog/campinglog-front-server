import { NextResponse } from "next/server";

import sampleRanking from "@/lib/constants/sample-ranking.json";

export async function GET() {
  return NextResponse.json(sampleRanking, { status: 200 });
}
