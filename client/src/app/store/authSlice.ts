import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { ProfileData } from "../../common/types/ProfileData";

interface AuthData {
  profileData: Partial<ProfileData>;
  token: string;
  tokenExpirationDate?: string;
}

type AuthState = {
  authData: AuthData;
} | null;

const initialState = null as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth(_, action: PayloadAction<AuthData>) {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return { authData: action.payload };
    },
    logout(_, _action: PayloadAction) {
      localStorage.clear();
      return null;
    },
  },
});

export const selectUserEmail = (state: RootState) =>
  state.auth?.authData.profileData?.email;

export const selectUser = (state: RootState) =>
  state.auth && state.auth.authData;

export const { auth, logout } = authSlice.actions;

export default authSlice.reducer;
