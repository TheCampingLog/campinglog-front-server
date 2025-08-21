"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import useCampLatestList from "@/lib/hooks/camps/useCampLatestList";
import CampLatestList from "@/components/camps/CampLatestList";

export default function CampListPage() {
    const { pageNo } = useParams();
    const pageNumber = Number(pageNo) || "1"; // 기본값 설정
    const { isLoading, campLatestList, error } = useCampLatestList(Number(pageNo));

    if(isLoading) {
        return <p>Loading...</p>;
    }

    if(error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">🏕️ 캠핑장 목록</h1>
            <CampLatestList camps={campLatestList} />{" "}
           
        </div>
    );
}