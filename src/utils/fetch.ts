"use server";

import { ACCESS_TOKEN_COOKIE_NAME } from "@constants";
import { cookies } from "next/headers";

export const fetchWithAuth = async (
  input: string | URL | globalThis.Request,
  init: RequestInit = {}
): Promise<Response> => {
  // await checkSession();

  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value}`,
    },
  });
};
