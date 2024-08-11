"use server";

import { APIGetPostsResponse } from "@typings/api";
import { ParsedUrlQueryInput, stringify } from "querystring";

export const getPosts = async (
  limit: number,
  offset: number,
  search?: string
): Promise<APIGetPostsResponse> => {
  const queryParams: ParsedUrlQueryInput = {
    limit,
    skip: offset,
  };

  if (search) {
    queryParams.q = search;
  }

  const res = await fetch(
    `${process.env.SERVER_API_URL}/posts${search ? "/search" : ""}?${stringify(queryParams)}`,
    {
      next: { revalidate: 10 },
    }
  );

  return res.json() as Promise<APIGetPostsResponse>;
};
