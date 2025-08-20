"use client";

import useBoardRankList from "@/lib/hooks/board/useBoardRankList";
import Image from "next/image";
import { imageUrl } from "@/lib/config";

function BoardsRank() {
  // useBoards 훅 사용
  const { isLoading, boardsRank, error } = useBoardRankList();

  // 로딩 상태 처리
  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  // 데이터가 없을 때 처리
  if (!boardsRank || boardsRank.length === 0) {
    return <div className="text-center py-8">게시글이 없습니다.</div>;
  }

  const mainBoard = boardsRank[0];
  const subBoards = boardsRank.slice(1);

  return (
    <div>
      {/* 메인 포스트 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
        <div className="relative">
          <Image
            src={imageUrl + "/images/board/" + mainBoard.boardImage}
            alt="캠핑장 이미지"
            width={400}
            height={256}
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h2 className="text-white text-lg font-bold mb-2 leading-tight">
              {mainBoard.title}
            </h2>
            <div className="flex items-center justify-between text-white/80 text-sm">
              <span>{mainBoard.nickname}</span>
              <div className="flex items-center space-x-4">
                <span>조회 {mainBoard.viewCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 서브 포스트들 */}
      <div className="grid grid-cols-2 gap-4">
        {subBoards.map((board) => (
          <div
            key={board.boardId}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <Image
                src={imageUrl + "/images/board/" + board.boardImage}
                alt="캠핑 이미지"
                width={400}
                height={256}
                className="w-full h-24 object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-800 text-sm leading-tight mb-2 line-clamp-2">
                {board.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{board.nickname}</span>
                <div className="flex items-center space-x-2">
                  <span>조회 {board.viewCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardsRank;
