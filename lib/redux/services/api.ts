// RTK Query root (baseQueryWithReauth 포함)
// src/lib/redux/services/api.ts
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { clearCredentials, setCredentials } from "../slices/authSlice";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_ROOT_URL ?? "";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // refreshToken 쿠키 전송
  prepareHeaders: (headers, { getState }) => {
    const state: any = getState();
    const token: string | null = state?.auth?.accessToken ?? null;
    console.log("prepareHeaders auth:", state.auth); // 디버깅용
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  // accessToken 만료 시 refresh 시도
  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    const refreshRes: any = await rawBaseQuery(
      { url: "/api/members/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshRes.data && refreshRes.data.accessToken) {
      api.dispatch(
        setCredentials({
          accessToken: refreshRes.data.accessToken,
          memberId: refreshRes.data.member?.memberId ?? null,
        })
      );
      // 원 요청 재시도
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Member"],
  endpoints: () => ({}),
});