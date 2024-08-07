"use client";

import { AppStore, createStore } from "@store";
import { login, logout } from "@store/reducers/user";
import { type JSX, type ReactNode, useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  isAuth,
  children,
}: {
  isAuth: boolean;
  children: ReactNode;
}): JSX.Element {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createStore();

    if (isAuth) {
      storeRef.current.dispatch(login());
    } else {
      storeRef.current.dispatch(logout());
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
