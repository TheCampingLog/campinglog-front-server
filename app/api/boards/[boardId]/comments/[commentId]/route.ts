import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function PUT(
  request: Request,
  { params }: { params: { boardId: string; commentId: string } }
) {
  const response = await fetch(
    `${BACKEND_URL}/api/boards/${params.boardId}/comments/${params.commentId}`,
    {
      method: "PUT",
      body: request.body,
    }
  );
  const data = await response.json();

  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: { boardId: string; commentId: string } }
) {
  const response = await fetch(
    `${BACKEND_URL}/api/boards/${params.boardId}/comments/${params.commentId}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();

  return NextResponse.json(data);
}
