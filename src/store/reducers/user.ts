import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  isAuth: boolean;
  data: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

const initialState: UserState = {
  isAuth: false,
  data: {
    id: 0,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  },
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
      state.data = initialState.data;
    },
    updateUserData: (state, action: PayloadAction<UserState["data"]>) => {
      state.data = action.payload;
    },
  },
});

export const { login, logout, updateUserData } = userSlice.actions;

export default userSlice.reducer;
