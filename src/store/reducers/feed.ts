import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FeedState = {
  search: string;
};

const initialState: FeedState = {
  search: "",
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<FeedState["search"]>) => {
      state.search = action.payload;
    },
  },
});

export const { updateSearch } = feedSlice.actions;

export default feedSlice.reducer;
