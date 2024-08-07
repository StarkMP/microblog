"use server";

import { APIUserResponse } from "@typings/api";
import { SignUpData } from "@typings/auth";

export const signUp = async (data: SignUpData): Promise<APIUserResponse> => {
  const res = await fetch(`${process.env.SERVER_API_URL}/users/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json() as Promise<APIUserResponse>;
};
