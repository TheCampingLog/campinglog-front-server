import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  const response = await fetch(
    `${BACKEND_URL}/api/boards/${params.boardId}/comments`
  );
  const data = await response.json();

  return NextResponse.json(data);
}
