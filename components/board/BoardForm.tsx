"use client";

import { useState, useEffect } from "react"; // useEffect 임포트
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
// 게시글 상세 정보 타입을 임포트해야 합니다. (경로는 실제 파일 위치에 맞게 조정)
import { ResponseGetBoardDetail } from "@/lib/types/board/response";

// 1. 컴포넌트가 받을 props 타입을 정의합니다.
interface BoardFormProps {
  isEditMode?: boolean; // 수정 모드 여부
  boardId?: string; // 수정할 게시글의 ID
  initialData?: ResponseGetBoardDetail; // 수정할 게시글의 기존 데이터
}

// 2. props를 받도록 컴포넌트 시그니처를 수정합니다.
export default function BoardForm({
  isEditMode = false,
  boardId,
  initialData,
}: BoardFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    categoryName: "",
    content: "",
  });

  // 3. 수정 모드일 때, props로 받은 기존 데이터로 폼을 채웁니다.
  useEffect(() => {
    if (isEditMode && initialData) {
      setPostData({
        title: initialData.title,
        categoryName: initialData.categoryName,
        content: initialData.content,
      });
    }
  }, [isEditMode, initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setPostData((prev) => ({ ...prev, categoryName: value }));
  };

  // 4. handleSubmit 함수를 수정/등록 모두 처리하도록 변경합니다.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("Authorization");
      if (!token) {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      // 백엔드에 보낼 데이터 (등록/수정 공통)
      const requestBody = {
        title: postData.title,
        content: postData.content,
        categoryName: postData.categoryName,
        boardImage: "",
      };

      // isEditMode 값에 따라 URL과 HTTP 메서드를 동적으로 결정
      const url = isEditMode
        ? `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/boards/${boardId}`
        : `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/boards`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "요청 처리 중 오류가 발생했습니다."
        );
      }

      const result = await response.json();
      alert(result.message); // 백엔드가 보내주는 성공 메시지 (예: "게시글이 수정되었습니다.")

      // 성공 후 상세 페이지로 이동
      router.push(`/board/${boardId || result.boardId}`);
    } catch (error) {
      console.error("요청 실패:", error);
      alert(error instanceof Error ? error.message : "알 수 없는 오류 발생");
    } finally {
      setIsLoading(false);
    }
  };

  // 5. JSX 부분도 isEditMode에 따라 동적으로 변경되도록 수정합니다.
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
    >
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        {isEditMode ? "게시글 수정" : "게시글 작성"}
      </h1>
      <div className="space-y-6">
        <Select
          onValueChange={handleCategoryChange}
          value={postData.categoryName} // value prop 추가
          name="categoryName"
        >
          <SelectTrigger className="w-64 p-4 border-gray-300 rounded-md">
            <SelectValue placeholder="카테고리를 선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="자유게시판">자유게시판</SelectItem>
            <SelectItem value="질문게시판">질문게시판</SelectItem>
            <SelectItem value="캠핑후기">캠핑 후기</SelectItem>
            <SelectItem value="캠핑팁">캠핑 팁</SelectItem>
          </SelectContent>
        </Select>

        <Input
          name="title"
          value={postData.title}
          onChange={handleInputChange}
          placeholder="제목을 입력하세요"
          className="w-full p-4 border-gray-300 rounded-md"
          required
        />

        <Textarea
          name="content"
          value={postData.content}
          onChange={handleInputChange}
          placeholder="내용을 입력하세요"
          className="min-h-[300px] w-full border border-gray-300 rounded-md resize-none p-4"
          required
        />

        <div className="flex justify-center pt-8">
          <Button
            type="submit"
            className="bg-[#7a8a65] hover:bg-[#4a6920] text-white px-12 py-3 rounded-md text-lg"
            disabled={isLoading}
          >
            {isLoading ? "처리 중..." : isEditMode ? "수정하기" : "게시하기"}
          </Button>
        </div>
      </div>
    </form>
  );
}
