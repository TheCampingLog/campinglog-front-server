// member 관련 endpoints
// src/lib/redux/services/memberApi.ts
import { api } from "./api";

export type MemberProfile = {
  memberId: number;
  nickname: string;
  email: string;
  name: string;
  joinDate: string;
  phoneNumber: string;
  grade: "GREEN" | "BLUE" | "RED" | "BLACK";
  profileImage: string | null;
};

export const memberApi = api.injectEndpoints({
  endpoints: (build) => ({
    // 내 정보 가져오기
    getMe: build.query<MemberProfile, void>({
      query: () => ({ url: "/api/members/mypage", method: "GET" }),
      providesTags: ["Member"],  //캐시 태그 등록 Mypage.tsx에서       //window.location.reload(); 하던걸 RTX가 해냄
    }),

    // 프로필 수정
    updateProfile: build.mutation<void, { nickname?: string }>({
      query: (body) => ({
        url: "/api/members/mypage",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Member"],
    }),

    // 프로필 이미지 가져오기
    getProfileImage: build.query<{ profileImage: string | null }, void>({
      query: () => ({ url: "/api/members/mypage/profile-image", method: "GET" }),
      providesTags: ["Member"],
    }),

    // 프로필 이미지 등록 (POST) or 수정 (PUT)
    setProfileImage: build.mutation<void, { profileImage: string }>({
      query: (body) => ({
        url: "/api/members/mypage/profile-image",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Member"],
    }),

    // 프로필 이미지 삭제
    deleteProfileImage: build.mutation<void, void>({
      query: () => ({
        url: "/api/members/mypage/profile-image",
        method: "DELETE",
      }),
      invalidatesTags: ["Member"],
    }),

    // 활동 요약
    getMySummary: build.query<any, void>({
      query: () => ({ url: "/api/members/mypage/summary", method: "GET" }),
      providesTags: ["Member"],
    }),

    // 내가 쓴 게시글
    getBoards: build.query<any, { pageNo?: number }>({
      query: ({ pageNo = 1 }) => ({
        url: `/api/members/mypage/boards?pageNo=${pageNo}`,
        method: "GET",
      }),
    }),

    // 내가 쓴 댓글
    getComments: build.query<any, { pageNo?: number }>({
      query: ({ pageNo = 1 }) => ({
        url: `/api/members/mypage/comments?pageNo=${pageNo}`,
        method: "GET",
      }),
    }),

    // 내가 쓴 리뷰
    getReviews: build.query<any, { pageNo?: number; size?: number }>({
      query: ({ pageNo = 1, size = 4 }) => ({
        url: `/api/members/mypage/reviews?pageNo=${pageNo}&size=${size}`,
        method: "GET",
      }),
    }),

    deleteMember: build.mutation<void, void>({
      query: () => ({
        url: "/api/members",
        method: "DELETE",
      }),
      invalidatesTags: ["Member"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useGetProfileImageQuery,
  useSetProfileImageMutation,
  useDeleteProfileImageMutation,
  useGetMySummaryQuery,
  useGetBoardsQuery,
  useGetCommentsQuery,
  useGetReviewsQuery,
  useDeleteMemberMutation, 
} = memberApi;
