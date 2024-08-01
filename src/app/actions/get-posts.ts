"use server";

import { APIGetPostsResponse } from "@typings/api";

export const getPosts = async (limit: number, offset: number): Promise<APIGetPostsResponse> => {
  const res = await fetch(`${process.env.SERVER_API_URL}/post?limit=${limit}&skip=${offset}`);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json() as Promise<APIGetPostsResponse>;
};
