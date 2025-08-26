"use client";

import { useState } from "react";
import useCampLatestList from "@/lib/hooks/camps/useCampLatestList";
import { ResponseGetCampLatestList } from "@/lib/types/camps/response";
import CampLatestList from "@/components/camps/CampLatestList";
import Pagination from "@/components/common/Pagination";

export default function CampListPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 4;
    
    const { isLoading, campLatestList, paginationData, error } = useCampLatestList<ResponseGetCampLatestList>(currentPage, PAGE_SIZE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (paginationData && currentPage < paginationData.totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    
    if(isLoading) {
        return <p>Loading...</p>;
    }

    if(error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="max-w-[1200px] mx-auto p-2">
            <h1 className="text-2xl font-bold mt-3 mb-2">캠핑장 목록</h1>
            <CampLatestList camps={campLatestList} />

            <div className="mt-12 mb-8">
                {paginationData && paginationData.totalPages > 0 && (
                    <Pagination
                        page={currentPage}
                        totalPages={paginationData.totalPages}
                        hasPrev={currentPage > 1}
                        hasNext={paginationData.hasNext}
                        goToPage={handlePageChange}
                        prevPage={handlePrevPage}
                        nextPage={handleNextPage}
                        maxVisible={5}
                    />
                )}
            </div>
        </div>
    );
}