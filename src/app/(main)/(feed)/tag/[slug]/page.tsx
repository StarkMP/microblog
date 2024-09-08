import { getPostsByTag } from "@app/actions/feed";
import { PostList } from "@components";
import { FEED_POSTS_LOADING_LIMIT } from "@constants";
import { Stack, Title } from "@mantine/core";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import type { JSX } from "react";

type TagPageParams = { slug: string };

export async function generateMetadata(
  { params }: { params: TagPageParams },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const tag = params.slug;

  if (!tag || !(typeof tag === "string")) {
    return {
      title: (await parent).title,
    };
  }

  return {
    title: `#${tag} - MicroBlog`,
  };
}

export default async function TagPage({ params }: { params: TagPageParams }): Promise<JSX.Element> {
  const tag = params.slug;

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
