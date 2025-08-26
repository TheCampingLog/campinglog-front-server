import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_ROOT_URL;

export async function POST(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  const response = await fetch(
    `${BACKEND_URL}/api/boards/${params.boardId}/comments`,
    {
      method: "POST",
      body: request.body,
    }
  );
  const data = await response.json();

  return NextResponse.json(data);
}
