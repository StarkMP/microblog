"use server";

import { APICommentModel } from "@typings/api";
import { fetchWithAuth } from "@utils/fetch";

export const addCommentToPost = async ({
  userId,
  postId,
  body,
}: {
  userId: number;
  postId: number;
  body: string;
}): Promise<APICommentModel> => {
  const res = await fetchWithAuth(`${process.env.SERVER_API_URL}/comments/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      body,
      postId,
      userId,
    }),
  });

  return res.json() as Promise<APICommentModel>;
};
