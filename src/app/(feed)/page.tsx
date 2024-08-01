import { getPosts } from "@app/actions/get-posts";
import type { JSX } from "react";

import { PostList } from "./_components";

const INITIAL_POSTS_LIMIT = 10;

export default async function FeedPage(): Promise<JSX.Element> {
  const data = await getPosts(INITIAL_POSTS_LIMIT, 0);

  return <PostList limit={INITIAL_POSTS_LIMIT} offset={0} data={data} />;
}
