"use client";

import useMemberReviews from "@/lib/hooks/member/useMemberReviews";
import Pagination from "@/components/common/Pagination";
import Image from "next/image";
import Link from "next/link";

export default function Reviews() {
  const {
    reviews,
    isLoading,
    error,
    page,
    totalPages,
    hasNext,
    hasPrev,
    nextPage,
    prevPage,
    goToPage,
  } = useMemberReviews(0);

  if (isLoading) return <p className="text-center py-6">불러오는 중...</p>;
  if (error) return <p className="text-center py-6 text-red-500">{error.message}</p>;
  if (reviews.length === 0)
    return <p className="text-center py-6 text-gray-500">작성한 리뷰가 없습니다.</p>;

  return (
    <div className="flex flex-col min-h-full">
      {/* 제목 */}
      <h2 className="text-xl font-bold mb-6">- 내 리뷰 조회</h2>

      {/* 리뷰 리스트 */}
      <ul className="space-y-5 basis-2/3">
        {reviews.map((r) => (
          <li key={r.id}>
            <Link
              href={`/camps/detail/${r.mapX}/${r.mapY}`}
              className="block bg-[#E6F7FF] rounded-xl p-4 flex gap-4 
              hover:shadow-md hover:bg-[#d6f0ff] transition cursor-pointer 
              min-h-36 sm:min-h-36 lg:min-h-36"
            >
              {/* 썸네일 이미지 */}
              <div className="w-28 h-20 relative flex-shrink-0">
                <Image
                  src={r.firstImageUrl || "/image/camp-default.png"}
                  alt={r.facltNm}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              {/* 내용 */}
              <div className="flex-1">
                <h3 className="font-bold text-base">{r.facltNm}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{r.reviewContent}</p>
                <p className="text-xs text-gray-500 mt-1">⭐ {r.reviewScore} / 5</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(r.createAt).toLocaleString()}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* ✅ 리스트 바로 아래 고정 페이지네이션 */}
      <div className="mt-4">
        <Pagination
          page={page + 1}
          totalPages={totalPages}
          hasPrev={hasPrev}
          hasNext={hasNext}
          goToPage={goToPage}
          prevPage={prevPage}
          nextPage={nextPage}
          maxVisible={4}
        />
      </div>
    </div>
  );
}
