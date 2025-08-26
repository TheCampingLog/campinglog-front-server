"use client";

import Password from "@/components/member/Password";

export default function PasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdfaf5]">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-3xl shadow-sm p-10">
        <h2 className="text-center text-2xl font-bold mb-8">비밀번호 확인</h2>
        <Password />
      </div>
    </div>
  );
}
