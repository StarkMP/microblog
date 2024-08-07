import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  isAuth: boolean;
  data: {
    username: string;
    email: string;
  } | null;
};

const initialState: UserState = {
  isAuth: false,
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
      state.data = null;
    },
    updateUserData: (state, action: PayloadAction<UserState["data"]>) => {
      state.data = action.payload;
    },
  },
});

export const { login, logout, updateUserData } = userSlice.actions;

export default userSlice.reducer;
