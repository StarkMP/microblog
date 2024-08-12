"use client";

import { getPosts } from "@app/actions/feed";
import { Stack, Text, useMantineTheme } from "@mantine/core";
import { useAppSelector } from "@store/hooks";
import { IconCircleX, IconMoodConfuzedFilled, IconSearch } from "@tabler/icons-react";
import type { APIGetPostsResponse } from "@typings/api";
import { type JSX, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Post, PostSkeleton } from "..";

type PostListProps = {
  data: APIGetPostsResponse;
  limit: number;
  offset: number;
};

export const PostList = ({ data, limit, offset: initialOffset }: PostListProps): JSX.Element => {
  const [posts, setPosts] = useState(data.posts);
  const [hasMore, setHasMore] = useState(data.total > data.posts.length);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const search = useAppSelector((state) => state.feed.search);
  const searchRef = useRef(search);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const offsetRef = useRef<number>(initialOffset);

  const theme = useMantineTheme();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    setHasMore(!error);
  }, [error]);

  useEffect(() => {
    searchRef.current = search;

    setError(false);
    setHasMore(true);
    setFetching(false);

    clearSearchTimeout();

    if (search) {
      setPosts([]);
      offsetRef.current = 0;

      loadPostsBySearch();
    } else {
      // if search is empty then we return posts and offset to initial values
      setHasMore(data.total > data.posts.length);
      setPosts(data.posts);
      offsetRef.current = initialOffset;
    }
  }, [search]);

  const loadPostsBySearch = (): void => {
    // we need to use timeout to avoid a requests flood
    searchTimeoutRef.current = setTimeout(() => {
      loadMore(true);
    }, 300);
  };

  const clearSearchTimeout = (): void => {
    if (searchTimeoutRef.current !== null) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
  };

  const loadMore = async (startOffset?: boolean): Promise<void> => {
    if (fetching || error) {
      return;
    }

    const currentSearchValue = searchRef.current;

    setFetching(true);

    try {
      const nextOffset = offsetRef.current + limit;

      const data = await getPosts(limit, startOffset ? 0 : nextOffset, currentSearchValue);

      // compare this values to avoid conflicts
      if (currentSearchValue !== searchRef.current) {
        return;
      }

      offsetRef.current = nextOffset;
      setPosts((prev) => prev.concat(data.posts));

      if (data.posts.length >= data.total || data.posts.length === 0) {
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
      loader={<PostSkeleton hasPosts={posts.length > 0} />}
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
        {!hasMore && !posts.length && (
          <Stack align="center" gap="md" p="lg">
            {search ? <IconSearch size={36} /> : <IconMoodConfuzedFilled size={36} />}
            <Text ta="center" size="md" fw={500}>
              {search ? "There are no results for your search request :(" : "There are no posts"}
            </Text>
          </Stack>
        )}
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
