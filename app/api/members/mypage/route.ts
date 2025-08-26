import { NextRequest, NextResponse } from "next/server";

// ✅ 회원정보 조회 (GET)
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization");

    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_ROOT_URL + "/api/members/mypage",
      {
        method: "GET",
        headers: {
          Authorization: token ?? "",
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { message: "회원정보 조회 실패", detail: errorText },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (e: unknown) {
    return NextResponse.json(
      { message: "서버 에러 발생" },
      { status: 500 }
    );
  }
}

// ✅ 회원정보 수정 (PUT)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const token = req.headers.get("authorization");

    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_ROOT_URL + "/api/members/mypage",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ?? "",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { message: "회원정보 수정 실패", detail: errorText },
        { status: res.status }
      );
    }

    // 백엔드가 204 No Content 반환 → 성공
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e: unknown) {
    return NextResponse.json(
      { message: "서버 에러 발생" },
      { status: 500 }
    );
  }
}
