import { configureStore } from "@reduxjs/toolkit";

import feedReducer from "./reducers/feed";
import userReducer from "./reducers/user";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      feed: feedReducer,
    },
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
