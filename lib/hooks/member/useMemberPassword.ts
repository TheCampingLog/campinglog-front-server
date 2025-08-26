import { useState } from "react";
import { useRouter } from "next/navigation";
import { ResponseVerifyPassword } from "@/lib/types/member/response";

export default function useMemberPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const verifyPassword = async (password: string) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const token = localStorage.getItem("Authorization");
      const endpoint =
        process.env.NEXT_PUBLIC_BACKEND_ROOT_URL +
        "/api/members/mypage/password/verify";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ password }),
      });

      // 성공 응답
      if (res.ok) {
        const text = await res.text();
        const data: ResponseVerifyPassword = {
          success: text.trim() === "",
        };

        if (data.success) {
          setIsSuccess(true);

          // ✅ 여기서 회원정보 수정 페이지로 이동
          router.push("/mypage/edit"); // 원하는 경로로 수정
          return;
        } else {
          throw new Error("비밀번호가 올바르지 않습니다.");
        }
      }

      // 에러 응답 (401 등)
      let errMsg = "비밀번호 확인에 실패했습니다.";
      try {
        const errData = await res.json();
        if (errData.message) {
          errMsg = errData.message;
        }
      } catch {
        // JSON 파싱 실패하면 기본 메시지 사용
      }
      throw new Error(errMsg);
    } catch (e: unknown) {
      if (e instanceof DOMException && e.name === "AbortError") {
        return;
      }
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error("비밀번호 확인 중 알 수 없는 오류가 발생했습니다."));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { verifyPassword, isLoading, error, isSuccess };
}
