import { ResponseGetComments } from "@/lib/types/board/response";
import { format } from "date-fns";

interface CommentItemProps {
  comment: ResponseGetComments;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex space-x-3 border-t pt-4">
      <div className="flex-shrink-0">
        {/* 간단한 프로필 아이콘 */}
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600">
          {comment.nickname.charAt(0)}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-gray-800">
              {comment.nickname}
            </span>
            <span className="text-xs text-gray-500 ml-2">
              {format(new Date(comment.createdAt), "yyyy.MM.dd HH:mm")}
            </span>
          </div>
          {/* 수정/삭제 버튼 (기능은 추후 구현) */}
          <div className="text-xs space-x-2">
            <button className="text-gray-500 hover:text-gray-800">수정</button>
            <button className="text-gray-500 hover:text-red-600">삭제</button>
          </div>
        </div>
        <p className="text-gray-800 mt-1 whitespace-pre-wrap">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
