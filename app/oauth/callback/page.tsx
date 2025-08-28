"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token"); // 백엔드가 리다이렉트 시 넘긴 토큰
    if (token) {
      localStorage.setItem("Authorization", token); // 토큰 저장
      console.log("카카오 콜백 실행");
      router.replace("/"); // 메인 페이지 등으로 리다이렉트
    } else {
      router.replace("/login"); // 토큰이 없으면 로그인 페이지로 재이동
    }
  }, [searchParams, router]);

  return <div>로그인 처리 중...</div>;
}
