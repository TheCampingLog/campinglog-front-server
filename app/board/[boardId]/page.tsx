"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ConfirmModal from "@/components/common/ConfirmModal"; // 방금 만든 모달 임포트
import { ResponseGetBoardDetail } from "@/lib/types/board/response"; // 실제 프로젝트의 타입 경로로 수정하세요

export default function BoardDetailPage() {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId as string;

  // 상태 변수들
  const [board, setBoard] = useState<ResponseGetBoardDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 삭제 확인 모달 상태

  // 게시글 데이터를 불러오는 로직
  useEffect(() => {
    if (!boardId) return;

    const fetchBoardDetail = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/boards/${boardId}`
        );

        if (!response.ok) {
          throw new Error("게시글을 불러오는 데 실패했습니다.");
        }

        const data: ResponseGetBoardDetail = await response.json();
        setBoard(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoardDetail();
  }, [boardId]);

  // 삭제 버튼 클릭 시 실행될 함수
  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      if (!token) {
        alert("삭제 권한이 없습니다. 로그인 후 다시 시도해주세요.");
        return;
      }

      // 🚨 중요: 백엔드 @DeleteMapping에 @AuthenticationPrincipal을 추가하여
      //    작성자 본인만 삭제할 수 있도록 보안을 강화해야 합니다.
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/boards/${boardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        // 204 No Content는 성공적인 삭제를 의미
        alert("게시글이 삭제되었습니다.");
        router.push("/board"); // 삭제 후 게시판 목록 페이지로 이동
      } else {
        // 204가 아닌 다른 실패 응답 처리
        const errorData = await response.json().catch(() => null); // JSON 파싱 실패 대비
        throw new Error(errorData?.message || "삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("삭제 실패:", error);
      alert(error instanceof Error ? error.message : "알 수 없는 오류 발생");
    } finally {
      setIsModalOpen(false); // 작업 완료 후 항상 모달 닫기
    }
  };

  // 로딩 및 에러 상태 처리
  if (isLoading) {
    return <div className="text-center mt-10">게시글을 불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">오류: {error}</div>;
  }

  if (!board) {
    return <div className="text-center mt-10">게시글 정보가 없습니다.</div>;
  }

  // 게시글 상세 정보 렌더링
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-md rounded-lg p-8">
        {/* 헤더: 카테고리 및 제목 */}
        <div className="border-b pb-4 mb-4">
          <p className="text-sm text-gray-500 mb-2">{board.categoryName}</p>
          <h1 className="text-3xl font-bold text-gray-900">{board.title}</h1>
          <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
            <span>작성자: {board.nickname}</span>
            <span>{new Date(board.createdAt).toLocaleString()}</span>
          </div>
        </div>

        {/* 본문 내용 */}
        <div
          className="prose max-w-none mt-6 mb-8"
          dangerouslySetInnerHTML={{
            __html: board.content.replace(/\n/g, "<br />"),
          }}
        />

        {/* 수정 및 삭제 버튼 컨테이너 */}
        {/* TODO: 실제 로그인한 사용자와 게시글 작성자가 같을 때만 버튼이 보이도록 조건 추가 */}
        <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
          <button
            onClick={() => router.push(`/board/${boardId}/edit`)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            수정
          </button>
          <button
            onClick={() => setIsModalOpen(true)} // '삭제' 버튼 클릭 시 모달을 엽니다.
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            삭제
          </button>
        </div>
      </div>

      {/* 확인 모달 컴포넌트 */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="게시글 삭제"
        message="정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        onConfirm={handleDeleteConfirm}
        onClose={() => setIsModalOpen(false)}
        confirmText="삭제"
        cancelText="취소"
      />
    </div>
  );
}
