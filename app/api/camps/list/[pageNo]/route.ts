import { NextResponse } from "next/server";
import { ResponseGetCampLatestList } from "@/lib/types/camps/response";
import { backendUrl } from "@/lib/config";

interface Params {
  pageNo: string;
}

export async function GET(
    request: Request,
    { params }: { params: Params }
) {
  try {
    const { pageNo } = params;
    
    const res = await fetch(`${backendUrl}/api/camps/list/${pageNo}`);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch camp latest list: ${res.status} ${res.statusText}`
      );
    }

    const data: ResponseGetCampLatestList[] = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching camp latest list:", error);
    return NextResponse.json(
      { error: "Failed to fetch camp latest list" },
      { status: 500 }
    );
  }
}