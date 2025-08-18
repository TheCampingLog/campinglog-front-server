"use client";

import Link from "next/link";
import useBoards from "@/lib/hooks/board/useBoards"; // useBoards import

function BoardList() {
  // useBoards 훅 사용
  const { isLoading, board: boards, error } = useBoards();

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
  if (!boards || boards.length === 0) {
    return <div className="text-center py-8">게시글이 없습니다.</div>;
  }

  return (
    <ul>
      {boards.map((board) => {
        return (
          <li
            key={board.boardId}
            className="flex bg-amber-100 mb-4 border-black"
          >
            <Link href={`/board/${board.boardId}`}>
              {" "}
              <div>{board.title}</div>
              <div>{board.content}</div>
              <div>{board.categoryName}</div>
              <div>{board.viewCount}</div>
              <div>{board.likeCount}</div>
              <div>{board.commentCount}</div>
              <div>{board.boardImage}</div>
              <div>{board.createAt}</div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default BoardList;
