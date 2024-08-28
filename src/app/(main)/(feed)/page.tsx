import { getPosts } from "@app/actions/feed";
import { FEED_POSTS_LOADING_LIMIT } from "@constants";
import { PostList } from "@components";
import type { JSX } from "react";

export default async function FeedPage(): Promise<JSX.Element> {
  const data = await getPosts({ limit: FEED_POSTS_LOADING_LIMIT, offset: 0 });

  return <PostList limit={FEED_POSTS_LOADING_LIMIT} offset={0} data={data} />;
}
