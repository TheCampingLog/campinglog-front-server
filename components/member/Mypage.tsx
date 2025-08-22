"use client";

import { ResponseGetMember, ResponseGetMemberActivitySummary } from "@/lib/types/member/response";

interface MemberMypageProps {
  member: ResponseGetMember | null;
  profileImage?: string;
  activitySummary?: ResponseGetMemberActivitySummary;
}


function Mypage({ member, profileImage, activitySummary }: MemberMypageProps) {
  if (!member) {
    return <div className="text-center py-8">회원 정보를 불러올 수 없습니다.</div>;
  }

  return (
  <main>
    {/* 오른쪽: 메인 컨텐츠 */}
      <div className="grid grid-cols-3 gap-6">
        {/* 프로필 (왼쪽) */}
        <div className="col-span-1 flex flex-col items-center">
          <img
            src={profileImage || "/image/profile-default.png"}
            alt="프로필 이미지"
            className="w-40 h-40 object-cover rounded-full mb-4"
          />
          <button className="px-3 py-2 bg-gray-200 rounded-lg text-sm">
            사진 수정
          </button>
        </div>

        {/* 활동요약 + 회원상세 (오른쪽) */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* 활동 요약 */}
          <div className="bg-[#FFF9E6] rounded-lg p-4 shadow-sm">
            {/* 제목 + 뱃지 영역 */}
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold">내 활동 요약</h4>
              {member?.memberGrade && (
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_ROOT_URL}/images/member/${member.memberGrade}.png`}
                  alt={`${member.memberGrade} 뱃지`}
                  className="w-24 h-24 badge-sparkle"
                />
              )}
            </div>

            <p>작성한 게시글 : {activitySummary?.postCount ?? 0}개</p>
            <p>작성한 댓글 : {activitySummary?.commentCount ?? 0}개</p>
            <p>작성한 리뷰 : {activitySummary?.reviewCount ?? 0}개</p>
            <p>받은 좋아요 : {activitySummary?.likeCount ?? 0}개</p>
            <p>가입 일자 : {member?.joinDate ?? "-"}</p>
          </div>

          {/* 회원 상세 */}
          <div className="bg-[#F0F9F9] rounded-lg p-4 shadow-sm">
            <h4 className="font-bold mb-3">내 계정 정보</h4>
            <p>이메일: {member?.email}</p>
            <p>닉네임: {member?.nickname}</p>
            <p>이름: {member?.name}</p>
            <p>전화번호: {member?.phoneNumber}</p>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 mt-6 justify-end">
        <button className="bg-campinggreen text-white px-4 py-2 rounded-md">
          개인정보 수정
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">
          회원 탈퇴
        </button>
      </div>
</main>




  );
}

export default Mypage;
