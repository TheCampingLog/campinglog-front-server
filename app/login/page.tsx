"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_ROOT_URL + "/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!res.ok) {
      console.log("로그인 실패: 서버 오류");
      return;
    }

    const token =
      res.headers.get("Authorization") || res.headers.get("authorization"); // 대소문자 유의
    if (token) {
      // 보통 "Bearer xxx" 형식일 수 있어, 필요에 따라 "Bearer " 제거
      const jwt = token.startsWith("Bearer ") ? token.slice(7) : token;
      localStorage.setItem("Authorization", jwt);
      router.push("/");
    } else {
      // 만약 헤더에 토큰이 없으면 응답 바디 JSON에서 토큰 찾기 시도 가능
      try {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem("Authorization", data.token);
          router.push("/");
        } else {
          console.log("로그인 실패: 토큰이 없습니다.");
        }
      } catch (e) {
        console.log("로그인 실패: 응답 파싱 오류");
      }
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
    >
      <input
        type="text"
        placeholder="아이디"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        로그인
      </button>
    </form>
  );
}
