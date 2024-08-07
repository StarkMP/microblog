"use server";

import { APIUserResponse } from "@typings/api";
import { fetchWithAuth } from "@utils/fetch";

export const getProfile = async (): Promise<APIUserResponse> => {
  const res = await fetchWithAuth(`${process.env.SERVER_API_URL}/user/me`, {
    next: { revalidate: 10 },
  });

  return res.json() as Promise<APIUserResponse>;
};
