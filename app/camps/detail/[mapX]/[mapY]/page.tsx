"use client";

import { useParams } from "next/navigation";
import useCampDetail from "@/lib/hooks/camps/useCampDetail";
import CampDetail from "@/components/camps/CampDetail";

interface Params {
    mapX: string;
    mapY: string;
}

export default function CampDetailPage() {
    const params = useParams();
    const mapX: string = params.mapX as string;
    const mapY: string = params.mapY as string;

    // ✅ useCampDetail 훅 사용
    const { campDetail, isLoading, error } = useCampDetail(mapX, mapY);

    // ✅ 로딩 상태 처리
    if (isLoading) {
        return (
            <div className="max-w-[1200px] mx-auto p-2">
                <div className="text-center py-10">로딩 중...</div>
            </div>
        );
    }

    // ✅ 에러 상태 처리
    if (error) {
        return (
            <div className="max-w-[1200px] mx-auto p-2">
                <div className="text-center py-10 text-red-500">
                    에러 발생: {error}
                </div>
            </div>
        );
    }

    // ✅ 데이터가 없을 때 처리
    if (!campDetail) {
        return (
            <div className="max-w-[1200px] mx-auto p-2">
                <div className="text-center py-10">캠핑장 정보를 찾을 수 없습니다.</div>
            </div>
        );
    }
    
    return (
        <div className="max-w-[1200px] mx-auto p-2">
            <h1 className="text-2xl font-bold mt-3 mb-2">캠핑장 상세</h1>
            <CampDetail camp={campDetail} />
        </div>
    );
}