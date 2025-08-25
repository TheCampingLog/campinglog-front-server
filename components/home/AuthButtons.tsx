"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import defaultImg from "@/public/image/default.png";
import Image from "next/image";

export default function AuthButtons() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    console.log("jwt 검증 실행");
    const token = localStorage.getItem("Authorization");
    if (token) {
      // JWT 검증 및 사용자 정보 가져오기
      fetch(
        process.env.NEXT_PUBLIC_BACKEND_ROOT_URL +
          "/api/members/mypage/profile-image",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
            if (data.profileImage) {
              setProfileImg(process.env.NEXT_PUBLIC_IMAGE_ROOT_URL + data.profileImage);
            }
          }
        })
        .catch(() => setIsLoggedIn(false));
    }
  });

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/mypage">
          <Image
            src={profileImg || defaultImg}
            alt="프로필"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("Authorization");
            window.location.reload();
          }}
          className="px-3 py-1 border rounded"
        >
          로그아웃
        </button>
      </div>
    );
  }

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
      >
        로그인
      </Link>
    </div>
  );
}
