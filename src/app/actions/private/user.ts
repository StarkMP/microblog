"use server";

import { DEFAULT_GET_DATA_REVALIDATION_TIME } from "@constants";
import { APIUserResponse } from "@typings/api";
import { fetchWithAuth } from "@utils/fetch";

export const getProfile = async (): Promise<APIUserResponse> => {
  const res = await fetchWithAuth(`${process.env.SERVER_API_URL}/user/me`, {
    next: { revalidate: DEFAULT_GET_DATA_REVALIDATION_TIME },
  });

  return res.json() as Promise<APIUserResponse>;
};
