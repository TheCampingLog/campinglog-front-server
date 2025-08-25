import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET() {
  const response = await fetch(`${BACKEND_URL}/api/boards/rank`);
  const data = await response.json();

  return NextResponse.json(data);
}
