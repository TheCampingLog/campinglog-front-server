// src/lib/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type AuthState = {
accessToken: string | null;
memberId: number | null;
};


const initialState: AuthState = {
accessToken: null,
memberId: null,
};

type CredentialsPayload = {
  accessToken: string;
  memberId: number | null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.memberId = action.payload.memberId;

      // localStorage 저장 (새로고침 대비)
      localStorage.setItem("accessToken", action.payload.accessToken);
      if (action.payload.memberId !== null) {
        localStorage.setItem("memberId", String(action.payload.memberId));
      }
    },
    clearCredentials: (state) => {
      state.accessToken = null;
      state.memberId = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("memberId");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;