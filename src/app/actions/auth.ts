"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_EXPIRES_IN_MINS,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@constants";
import { APIAuthResponse, APIRefreshTokenResponse } from "@typings/api";
import { AuthData } from "@typings/auth";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const writeTokensToCookies = (
  {
    access,
    refresh,
  }: {
    access: string;
    refresh: string;
  },
  responseCookieStore?: ResponseCookies
): void => {
  const cookieStore = responseCookieStore || cookies();
  const isProd = process.env.NODE_ENV === "production";

  cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, access, {
    maxAge: ACCESS_TOKEN_EXPIRES_IN_MINS * 60,
    httpOnly: true,
    secure: isProd,
  });

  cookieStore.set(REFRESH_TOKEN_COOKIE_NAME, refresh, {
    httpOnly: true,
    secure: isProd,
  });
};

export const auth = async (data: AuthData): Promise<APIAuthResponse> => {
  const res = await fetch(`${process.env.SERVER_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      expiresInMins: ACCESS_TOKEN_EXPIRES_IN_MINS,
      // hardcode. we replace credentials by one of existing in DummyJSON users database
      // to simulate authorization and don't make an app visitor to write strict DummyJSON's credentials
      // it's just for a website demonstration, nothing more
      username: "emilys",
      password: "emilyspass",
    }),
  });

  const json = (await res.json()) as APIAuthResponse;

  writeTokensToCookies({
    access: json.token,
    refresh: json.refreshToken,
  });

  return json;
};

export const refresh = async (
  refreshToken: string,
  // hack to set cookie in server components
  // topic: https://github.com/vercel/next.js/discussions/49843
  responseCookieStore?: ResponseCookies
): Promise<APIRefreshTokenResponse> => {
  const res = await fetch(`${process.env.SERVER_API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
      expiresInMins: ACCESS_TOKEN_EXPIRES_IN_MINS,
    }),
  });

  const json = (await res.json()) as APIRefreshTokenResponse;

  writeTokensToCookies(
    {
      access: json.token,
      refresh: json.refreshToken,
    },
    responseCookieStore
  );

  return json;
};

export const logout = (): void => {
  const cookieStore = cookies();

  cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
};
