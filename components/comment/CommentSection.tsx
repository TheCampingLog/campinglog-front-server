"use client";

import { useState } from "react";
import useCommentList from "@/lib/hooks/comment/useCommentList";
import CommentItem from "./CommentItem"; // 개별 댓글 UI (다음 단계에서 생성)
import Pagination from "../common/Pagination"; // 이전에 만든 페이지네이션 컴포넌트

interface CommentSectionProps {
  boardId: string;
}

export default function CommentSection({ boardId }: CommentSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const COMMENT_PAGE_SIZE = 3; // 한 페이지에 보여줄 댓글 수

  // 3단계에서 만든 훅을 호출하여 댓글 데이터를 가져옵니다.
  const { paginatedComments, comments, isLoading, error } = useCommentList(
    boardId,
    currentPage,
    COMMENT_PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">
        {/* 전체 댓글 수를 표시합니다. */}
        댓글 {paginatedComments ? `(${paginatedComments.totalComments})` : ""}
      </h2>

      {/* 댓글 입력 폼 (기능은 추후 구현) */}
      <div className="mb-8">
        <textarea
          className="w-full p-2 border rounded-md"
          rows={3}
          placeholder="따뜻한 댓글을 남겨주세요."
        />
        <div className="text-right mt-2">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
            댓글 등록
          </button>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-6">
        {isLoading && (
          <p className="text-center text-gray-500">댓글을 불러오는 중...</p>
        )}
        {error && (
          <p className="text-center text-red-500">
            댓글을 불러오는데 실패했습니다.
          </p>
        )}
        {comments && comments.length > 0
          ? // comments 배열을 순회하며 CommentItem 컴포넌트를 렌더링합니다.
            comments.map((comment) => (
              <CommentItem key={comment.commentId} comment={comment} />
            ))
          : // 로딩이 끝났는데 댓글이 없으면 메시지를 표시합니다.
            !isLoading && (
              <p className="text-center text-gray-500">아직 댓글이 없습니다.</p>
            )}
      </div>

      {/* 댓글 페이지네이션 */}
      <div className="mt-8">
        {paginatedComments && paginatedComments.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={paginatedComments.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
