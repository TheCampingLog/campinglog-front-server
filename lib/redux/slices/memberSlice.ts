// src/lib/redux/slices/memberSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type MemberState = {
nickname: string | null;
grade: "GREEN" | "BLUE" | "RED" | "BLACK" | null;
profileImageUrl: string | null;
// 필요 시 활동 요약 등 확장
};


const initialState: MemberState = {
nickname: null,
grade: null,
profileImageUrl: null,
};


const memberSlice = createSlice({
name: "member",
initialState,
reducers: {
setProfile: (
state,
action: PayloadAction<{
nickname: string;
grade: MemberState["grade"];
profileImageUrl: string | null;
}>
) => {
state.nickname = action.payload.nickname;
state.grade = action.payload.grade;
state.profileImageUrl = action.payload.profileImageUrl;
},
updateProfileImageSuccess: (state, action: PayloadAction<string | null>) => {
state.profileImageUrl = action.payload;
},
clearProfile: (state) => {
state.nickname = null;
state.grade = null;
state.profileImageUrl = null;
},
},
});


export const { setProfile, updateProfileImageSuccess, clearProfile } = memberSlice.actions;
export default memberSlice.reducer;


// selectors
export const selectProfileImageUrl = (state: any) => state.member.profileImageUrl as string | null;
export const selectNickname = (state: any) => state.member.nickname as string | null;
export const selectGrade = (state: any) => state.member.grade as MemberState["grade"] | null;