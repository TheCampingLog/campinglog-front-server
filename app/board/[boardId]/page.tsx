"use client";

import useBoardDetail from "@/lib/hooks/board/useBoardDetail";
import { useParams } from "next/navigation";
import BoardDetailView from "@/components/board/BoardDetailView";
import CommentSection from "@/components/comment/CommentSection";

export default function BoardDetailPage() {
  const params = useParams();
  const boardId = Array.isArray(params.boardId)
    ? params.boardId[0]
    : params.boardId;

  const { board, isLoading, error } = useBoardDetail(boardId || null);

  if (isLoading)
    return <div className="text-center py-20">게시글을 불러오는 중...</div>;
  if (error)
    return (
      <div className="text-center py-20 text-red-500">에러가 발생했습니다.</div>
    );
  if (!board)
    return <div className="text-center py-20">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* 1. 본문 표시를 BoardDetailView 컴포넌트에 위임 */}
      <BoardDetailView board={board} />

      {/* 2. 댓글 표시를 CommentSection 컴포넌트에 위임 */}
      <CommentSection boardId={board.boardId} />
    </div>
  );
}
