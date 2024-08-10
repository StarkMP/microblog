import { ACCESS_TOKEN_COOKIE_NAME } from "@constants";
import { cookies } from "next/headers";

import { headersSetCookie } from "./cookie";

export const fetchWithAuth = async (
  input: string | URL | globalThis.Request,
  init: RequestInit = {}
): Promise<Response> => {
  const accessToken =
    cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value ||
    headersSetCookie().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
