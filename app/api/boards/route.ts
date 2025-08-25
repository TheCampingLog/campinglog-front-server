import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function POST(request: Request) {
  const response = await fetch(`${BACKEND_URL}/api/boards`, {
    method: "POST",
    body: request.body,
  });
  const data = await response.json();
  return NextResponse.json(data, { status: 200 });
}
