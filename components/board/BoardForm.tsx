"use client";

import { useState } from "react";
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
import { ImageIcon, Bold, Italic, Underline, List } from "lucide-react";
import { RequestAddBoard } from "@/lib/types/board/request"; // 방금 만든 타입 임포트

export default function BoardForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    categoryName: "", // 백엔드 타입에 맞게 category -> categoryName으로 변경
    content: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setPostData((prev) => ({ ...prev, categoryName: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postData.categoryName) {
      alert("카테고리를 선택해주세요.");
      return;
    }
    setIsLoading(true);

    // 전송할 데이터를 RequestAddBoard 타입에 맞게 준비합니다.
    // email과 boardImage는 현재 폼에 없으므로, 우선 빈 값으로 보냅니다.
    // 백엔드 API 라우트에서 email은 토큰으로 처리하므로 여기서 보낼 필요 없습니다.
    const newPost: Omit<RequestAddBoard, "email" | "boardImage"> = {
      title: postData.title,
      content: postData.content,
      categoryName: postData.categoryName,
    };

    try {
      const response = await fetch("/api/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "게시글 등록에 실패했습니다.");
      }

      alert("게시글이 성공적으로 등록되었습니다.");
      // 백엔드에서 boardId를 반환해준다고 가정하고 상세 페이지로 이동합니다.
      router.push(`/board/${result.boardId}`);
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert(error instanceof Error ? error.message : "알 수 없는 오류 발생");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
    >
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">게시글 작성</h1>
      <div className="space-y-6">
        {/* 카테고리 선택 */}
        <Select onValueChange={handleCategoryChange} name="categoryName">
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

        {/* 제목 입력 */}
        <Input
          name="title"
          value={postData.title}
          onChange={handleInputChange}
          placeholder="제목을 입력하세요"
          className="w-full p-4 border-gray-300 rounded-md"
          required
        />

        {/* 내용 입력 (에디터) */}
        <Textarea
          name="content"
          value={postData.content}
          onChange={handleInputChange}
          placeholder="내용을 입력하세요"
          className="min-h-[300px] w-full border border-gray-300 rounded-md resize-none p-4"
          required
        />

        {/* 게시하기 버튼 */}
        <div className="flex justify-center pt-8">
          <Button
            type="submit"
            className="bg-[#7a8a65] hover:bg-[#4a6920] text-white px-12 py-3 rounded-md text-lg"
            disabled={isLoading}
          >
            {isLoading ? "등록 중..." : "게시하기"}
          </Button>
        </div>
      </div>
    </form>
  );
}
