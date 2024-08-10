"use client";

import { getPosts } from "@app/actions/posts";
import { Stack, Text, useMantineTheme } from "@mantine/core";
import { IconCircleX } from "@tabler/icons-react";
import type { APIGetPostsResponse } from "@typings/api";
import { type JSX, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Post, PostSkeleton } from "..";

type PostListProps = {
  data: APIGetPostsResponse;
  limit: number;
  offset: number;
};

export const PostList = ({ data, limit, offset: initialOffset }: PostListProps): JSX.Element => {
  const [posts, setPosts] = useState(data.posts);
  const [offset, setOffset] = useState(initialOffset);
  const [hasMore, setHasMore] = useState(data.total > data.posts.length);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  const theme = useMantineTheme();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    setHasMore(!error);
  }, [error]);

  const loadMore = async (): Promise<void> => {
    if (fetching || error) {
      return;
    }

    setFetching(true);

    try {
      const nextOffset = offset + limit;

      const data = await getPosts(limit, nextOffset);

      setOffset(nextOffset);
      setPosts((prev) => prev.concat(data.posts));

      if (posts.length >= data.total || data.posts.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      setError(true);

      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<PostSkeleton />}
    >
      <Stack gap="sm">
        {posts.map((post) => {
          const { title, body, tags, views } = post;
          const { likes, dislikes } = post.reactions;

          return (
            <Post
              key={post.id}
              title={title}
              body={body}
              tags={tags}
              views={views}
              likes={likes}
              dislikes={dislikes}
              comments={0}
              authorName="EmilyJohnson"
            />
          );
        })}
        {error && (
          <Stack align="center" gap={4} mt="lg" mb="lg">
            <IconCircleX size={40} stroke={1.25} style={{ color: theme.colors.red[6] }} />
            <Text ta="center" size="md" c="red.5">
              An error occured while loading
            </Text>
            <Text ta="center" size="xs" c="dimmed">
              Please, refresh the page and try again
            </Text>
          </Stack>
        )}
      </Stack>
    </InfiniteScroll>
  );
};
