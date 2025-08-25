"use client";

import { useState } from "react";
import Link from "next/link";
import BoardList from "@/components/board/BoardList";
import Pagination from "@/components/common/Pagination";
import useBoardList from "@/lib/hooks/board/useBoardList";
import { Button } from "@/components/ui/button";

export default function BoardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 3;

  const { paginatedData, boards, isLoading, error } = useBoardList(
    "정보",
    currentPage,
    PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div className="text-center py-10">로딩 중...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">에러 발생</div>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">정보 게시판</h1>
        <Link href="/board/write" passHref>
          <Button>글쓰기</Button>
        </Link>
      </div>

      <BoardList boards={boards || []} />

      <div className="mt-8">
        {paginatedData && paginatedData.totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={paginatedData.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
}
