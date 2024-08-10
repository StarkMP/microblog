"use client";

import { AppStore, createStore } from "@store";
import { login, logout, updateUserData } from "@store/reducers/user";
import { APIUserResponse } from "@typings/api";
import { type JSX, type ReactNode, useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  isAuth,
  user,
  refreshToken,
  children,
}: {
  isAuth: boolean;
  user?: APIUserResponse;
  refreshToken?: string;
  children: ReactNode;
}): JSX.Element {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createStore();

    if (isAuth && user) {
      storeRef.current.dispatch(login());
      storeRef.current.dispatch(updateUserData(user));
    } else {
      storeRef.current.dispatch(logout());
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
