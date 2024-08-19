"use server";

import { DEFAULT_GET_DATA_REVALIDATION_TIME } from "@constants";
import {
  APIGetCommentsResponse,
  APIGetPostsResponse,
  APIGetTagsResponse,
  APIPostModel,
} from "@typings/api";
import { ParsedUrlQueryInput, stringify } from "querystring";

export const getPosts = async ({
  limit,
  offset,
  search,
}: {
  limit: number;
  offset: number;
  search?: string;
}): Promise<APIGetPostsResponse> => {
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
      next: { revalidate: DEFAULT_GET_DATA_REVALIDATION_TIME },
    }
  );

  return res.json() as Promise<APIGetPostsResponse>;
};

export const getPostsByTag = async ({
  limit,
  offset,
  tag,
}: {
  limit: number;
  offset: number;
  tag: string;
}): Promise<APIGetPostsResponse> => {
  const queryParams: ParsedUrlQueryInput = {
    limit,
    skip: offset,
  };

  const res = await fetch(
    `${process.env.SERVER_API_URL}/posts/tag/${tag}?${stringify(queryParams)}`,
    {
      next: { revalidate: DEFAULT_GET_DATA_REVALIDATION_TIME },
    }
  );

  return res.json() as Promise<APIGetPostsResponse>;
};

export const getTags = async (): Promise<APIGetTagsResponse> => {
  const res = await fetch(`${process.env.SERVER_API_URL}/posts/tag-list`, {
    next: { revalidate: DEFAULT_GET_DATA_REVALIDATION_TIME },
  });

  return res.json() as Promise<APIGetTagsResponse>;
};

export const getPost = async (id: number): Promise<APIPostModel> => {
  const res = await fetch(`${process.env.SERVER_API_URL}/posts/${id}`, {
    next: { revalidate: DEFAULT_GET_DATA_REVALIDATION_TIME },
  });

  return res.json() as Promise<APIPostModel>;
};

export const getComments = async (
  postId: number,
  {
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }
): Promise<APIGetCommentsResponse> => {
  const queryParams: ParsedUrlQueryInput = {
    limit,
    skip: offset,
  };

  const res = await fetch(
    `${process.env.SERVER_API_URL}/comments/post/${postId}/?${stringify(queryParams)}`,
    {
      next: { revalidate: DEFAULT_GET_DATA_REVALIDATION_TIME },
    }
  );

  return res.json() as Promise<APIGetCommentsResponse>;
};
