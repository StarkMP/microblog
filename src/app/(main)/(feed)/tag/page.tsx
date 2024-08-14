import { getPostsByTag } from "@app/actions/feed";
import { FEED_POSTS_LOADING_LIMIT } from "@constants";
import { Stack, Title } from "@mantine/core";
import { SearchParams } from "@typings/utils";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import type { JSX } from "react";

import { PostList } from "../_components";

export async function generateMetadata(
  { searchParams }: { searchParams: SearchParams },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const tag = searchParams.text;

  if (!tag || !(typeof tag === "string")) {
    return {
      title: (await parent).title,
    };
  }

  return {
    title: `#${tag} - MicroBlog`,
  };
}

export default async function TagPage({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<JSX.Element> {
  const tag = searchParams.text;

  if (!tag || !(typeof tag === "string")) {
    notFound();
  }

  const data = await getPostsByTag({ limit: FEED_POSTS_LOADING_LIMIT, offset: 0, tag });

  return (
    <Stack>
      <Title order={1} style={{ overflowWrap: "anywhere" }}>
        #{tag}
      </Title>
      <PostList limit={FEED_POSTS_LOADING_LIMIT} offset={0} data={data} tag={tag} />
    </Stack>
  );
}
