"use client";

import { useState } from "react";
import useMemberPassword from "@/lib/hooks/member/useMemberPassword";

export default function Password() {
  const [password, setPassword] = useState("");
  const { verifyPassword, isLoading, error, isSuccess } = useMemberPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyPassword(password);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
      <div className="w-full">
        <label className="block text-sm font-medium mb-2">비밀번호</label>
        <input
          type="password"
          className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
  );
}
