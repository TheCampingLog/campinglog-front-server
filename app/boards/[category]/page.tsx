"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import BoardList from "@/components/board/BoardList";
import Pagination from "@/components/common/Pagination";
import useBoardList from "@/lib/hooks/board/useBoardList";
import useBoardSearch from "@/lib/hooks/board/useBoardSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export default function BoardCategoryPage() {
  const params = useParams();
  const category = Array.isArray(params.category)
    ? params.category[0]
    : params.category;
  const categoryName = decodeURIComponent(category || "");

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const PAGE_SIZE = 3;

  const { paginatedData: categoryData, isLoading: isCategoryLoading } =
    useBoardList(
      !submittedSearchTerm ? categoryName : "",
      currentPage,
      PAGE_SIZE
    );

  const { paginatedData: searchData, isLoading: isSearchLoading } =
    useBoardSearch(submittedSearchTerm, currentPage, PAGE_SIZE);

  const isSearching = !!submittedSearchTerm;
  const isLoading = isSearching ? isSearchLoading : isCategoryLoading;
  const paginatedData = isSearching ? searchData : categoryData;
  const boards = paginatedData?.content || paginatedData?.content || [];
  const totalPages = paginatedData?.totalPages ?? 1;

  // --- 페이지네이션 로직 ---
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
  // --- 페이지네이션 로직 끝 ---

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setCurrentPage(1);
    setSubmittedSearchTerm(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSubmittedSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {isSearching
            ? `"${submittedSearchTerm}" 검색 결과`
            : `${categoryName} 게시판`}
        </h1>
        <Link href="/board/write" passHref>
          <Button variant={"camping-solid"}>글쓰기</Button>
        </Link>
      </div>

      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 relative">
          <Input
            type="text"
            placeholder="전체 게시판에서 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow pr-10"
          />
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-12 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          )}
          <Button type="submit" variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </form>
        {isSearching && (
          <div className="mt-2 text-sm text-gray-600">
            <button
              onClick={clearSearch}
              className="text-campinggreen hover:underline"
            >
              전체 목록 보기
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-10">로딩 중...</div>
      ) : (
        <>
          <BoardList boards={boards} />
          <div className="mt-8">
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              hasPrev={hasPrev}
              hasNext={hasNext}
              goToPage={goToPage}
              prevPage={prevPage}
              nextPage={nextPage}
            />
          </div>
        </>
      )}
    </main>
  );
}
