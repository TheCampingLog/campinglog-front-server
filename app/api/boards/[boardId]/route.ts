import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = params;
  const response = await fetch(`${BACKEND_URL}/api/boards/${boardId}`);
  const data = await response.json();

  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = params;
  const response = await fetch(`${BACKEND_URL}/api/boards/${boardId}`, {
    method: "PUT",
    body: request.body,
  });
  const data = await response.json();

  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = params;
  const response = await fetch(`${BACKEND_URL}/api/boards/${boardId}`, {
    method: "DELETE",
  });
  const data = await response.json();

  return NextResponse.json(data);
}
