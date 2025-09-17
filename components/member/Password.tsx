"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useMemberPassword from "@/lib/hooks/member/useMemberPassword";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useDeleteMemberMutation } from "@/lib/redux/services/memberApi";
import { useDispatch } from "react-redux";
import { clearCredentials } from "@/lib/redux/slices/authSlice";
import { api } from "@/lib/redux/services/api";

export default function Password() {
  const [password, setPassword] = useState("");
  const { verifyPassword, isLoading, error, isSuccess } = useMemberPassword();

  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawCompleteModalOpen, setWithdrawCompleteModalOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const dispatch = useDispatch();
  const [deleteMember] = useDeleteMemberMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await verifyPassword(password);
    if (!ok) return;

    if (next === "edit") {
      router.push("/mypage/edit");
    } else if (next === "withdraw") {
      setWithdrawModalOpen(true);
    }
  };

  // 회원 탈퇴 실행
  const handleWithdraw = async () => {
    try {
      await deleteMember().unwrap(); // ✅ RTK Query로 탈퇴 요청

      // 상태 정리 (로그아웃)
      localStorage.removeItem("Authorization");
      dispatch(clearCredentials());
      dispatch(api.util.resetApiState());

      setWithdrawModalOpen(false);
      setWithdrawCompleteModalOpen(true);
    } catch (e) {
      console.error("회원 탈퇴 실패", e);
      alert("회원 탈퇴 실패");
    }
  };

  return (
  <div className="max-w-md mx-auto mt-20 bg-white border border-gray-300 rounded-3xl shadow-sm p-10">
    <h2 className="text-2xl font-bold mb-6 text-center">비밀번호 확인</h2> 
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
      <div className="w-full">
        <input
          type="password"
          className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="비밀번호를 입력하세요"
        />
      </div>

      <button
        type="submit"
        className="w-32 bg-green-700 text-white py-2 rounded-md font-bold hover:bg-green-800 transition"
        disabled={isLoading}
      >
        {isLoading ? "확인중..." : "확인"}
      </button>

      {/* 🔽 error는 Error 객체이므로 .message를 출력해야 함 */}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}

      {isSuccess && <p className="text-green-600 text-sm">인증 성공!</p>}
    </form>

   {/* 탈퇴 확인 모달 */}
      <ConfirmModal
        isOpen={withdrawModalOpen}
        title="회원 탈퇴"
        message="정말 탈퇴하시겠습니까?"
        onConfirm={handleWithdraw}
        onClose={() => setWithdrawModalOpen(false)}
        confirmText="탈퇴"
        cancelText="취소"
      />

      {/* 탈퇴 완료 모달 */}
      <ConfirmModal
        isOpen={withdrawCompleteModalOpen}
        title="알림"
        message="탈퇴가 완료되었습니다."
        onConfirm={() => router.push("/")}
        onClose={() => setWithdrawCompleteModalOpen(false)}
        confirmText="확인"
        cancelText=""
      />
    </div>  
  );
}
