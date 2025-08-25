"use client";

import { ResponseGetBoardByCategory } from "@/lib/types/board/response";
//import Image from "next/image";
import Link from "next/link";
//import { useState } from "react";

interface BoardListItemProps {
  board: ResponseGetBoardByCategory;
}

export default function BoardListItem({ board }: BoardListItemProps) {
  const truncatedContent =
    board.content.length > 100
      ? `${board.content.substring(0, 100)}...`
      : board.content;
  // const [imgSrc] = useState(
  //   board.boardImage ? `/image/${board.boardImage}` : "/image/cmap-default.png"
  // );

  return (
    <Link href={`/board/${board.boardId}`} passHref>
      <div className="bg-[#faf6f0] rounded-lg p-4 shadow-sm border border-[#d0d0d0] hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex space-x-4">
          {/* <div className="relative w-48 h-32 flex-shrink-0">
            <Image
              // 완성된 이미지 경로를 src에 전달합니다.
              src={imgSrc}
              alt={board.title}
              fill
              className="object-cover rounded-lg"
              // 이미지를 불러오다 에러가 나면 기본 이미지로 대체합니다.
              onError={(e) => {
                e.currentTarget.src = "/image/camp-default.png";
              }}
            /> */}
          <div className="w-48 h-32 flex-shrink-0 bg-gray-200 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-block bg-[#7a8a65] text-white text-xs px-2 py-1 rounded">
                {board.categoryName}
              </span>
              <span className="text-xs text-[#cccccc]">
                조회수 {board.viewCount}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#333333] truncate">
              {board.title}
            </h3>
            <p className="text-sm text-[#333333] leading-relaxed whitespace-pre-line">
              {truncatedContent}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
