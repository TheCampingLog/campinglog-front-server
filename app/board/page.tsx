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

  const totalPages = paginatedData?.totalPages ?? 1;
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const prevPage = () => {
    if (hasPrev) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (hasNext) {
      setCurrentPage(currentPage + 1);
    }
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
          // Pagination 컴포넌트에 새로운 props 전달
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            hasPrev={hasPrev}
            hasNext={hasNext}
            goToPage={goToPage}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        )}
      </div>
    </main>
  );
}
