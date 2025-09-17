// src/lib/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./slices/authSlice";
import { api } from "./services/api";

// localStorage에서 auth 상태 복원
const loadAuthState = (): AuthState => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const memberIdStr = localStorage.getItem("memberId");
    return {
      accessToken: accessToken ? accessToken : null,
      memberId: memberIdStr ? Number(memberIdStr) : null,
    };
  } catch {
    return { accessToken: null, memberId: null };
  }
};

const preloadedState = {
  auth: loadAuthState(),
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  preloadedState, // ← 여기 추가
  middleware: (getDefault) => getDefault().concat(api.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
