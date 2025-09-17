"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/lib/redux/services/memberApi";
import { store } from "@/lib/redux/store";
import { clearCredentials } from "@/lib/redux/slices/authSlice";
import { api } from "@/lib/redux/services/api";
import defaultImg from "@/public/image/default.png";

export default function AuthButtons() {
  const router = useRouter();
  const { data: me, isLoading, error } = useGetMeQuery();

  const handleLogout = () => {
    // 1) 로컬 토큰 제거
    localStorage.removeItem("Authorization");

    // 2) Redux 상태 초기화
    store.dispatch(clearCredentials());
    store.dispatch(api.util.resetApiState());

    // 3) 라우팅 이동
    router.push("/");
  };

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
        <span className="text-sm text-gray-400">Loading...</span>
      </div>
    );
  }

  // 로그인 상태 (me 데이터 있음)
  if (me && !error) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/mypage" prefetch={false}>
          <Image
            src={me.profileImage || defaultImg}
            alt={me.nickname || "프로필"}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        </Link>
        <button
          onClick={handleLogout}
          className="px-3 py-1 border rounded hover:bg-gray-50"
        >
          로그아웃
        </button>
      </div>
    );
  }

  // 비로그인 상태
  return (
    <div className="flex gap-2">
      <Link href="/signup">
        <button className="px-4 py-2 border border-campinggreen bg-white text-campinggreen rounded-md hover:border-campingorange hover:text-campingorange transition-colors duration-200">
          회원가입
        </button>
      </Link>
      <Link
        href="/login"
        className="px-4 py-2 border border-campinggreen bg-campinggreen text-white rounded-md hover:border-campingorange hover:bg-campingorange transition-colors duration-200"
        prefetch={false}
      >
        로그인
      </Link>
    </div>
  );
}
