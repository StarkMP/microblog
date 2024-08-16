"use client";

import { getPosts, getPostsByTag } from "@app/actions/feed";
import { useDidUpdateEffect } from "@hooks";
import { Stack, Text, useMantineTheme } from "@mantine/core";
import { useAppSelector } from "@store/hooks";
import { IconCircleX, IconMoodConfuzedFilled, IconSearch } from "@tabler/icons-react";
import type { APIGetPostsResponse } from "@typings/api";
import { useRouter } from "next/navigation";
import { type JSX, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { FeedLoader, Post } from "..";

type PostListProps = {
  data: APIGetPostsResponse;
  limit: number;
  offset: number;
  tag?: string;
};

export const PostList = ({
  data,
  limit,
  offset: initialOffset,
  tag,
}: PostListProps): JSX.Element => {
  const [posts, setPosts] = useState(data.posts);
  const [hasMore, setHasMore] = useState(data.total > 0 && data.posts.length < data.total);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const search = useAppSelector((state) => state.feed.search);
  const searchRef = useRef(search);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const offsetRef = useRef<number>(initialOffset);
  const theme = useMantineTheme();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useDidUpdateEffect(() => {
    if (tag) {
      clearSearchTimeout();
      setPosts([]);
      setHasMore(true);
      setError(false);
      setLoading(false);

      // refresh router to change metadata
      router.refresh();

      fetchPosts(true, true);
    }
  }, [tag]);

  useEffect(() => {
    // we should turn off the search if we use tag post list
    // because DummyJSON doesn't support search posts by tag yet
    // https://dummyjson.com/docs/posts#posts-tag
    if (tag) {
      return;
    }

    searchRef.current = search;

    setError(false);
    setHasMore(true);

    clearSearchTimeout();

    if (search) {
      setPosts([]);
      offsetRef.current = 0;

      fetchPostsBySearch();
    } else {
      // if search is empty then we return posts and offset to initial values
      setHasMore(data.total > 0 && data.posts.length < data.total);
      setPosts(data.posts);
      offsetRef.current = initialOffset;
    }
  }, [search]);

  const fetchPostsBySearch = (): void => {
    // if we start search proccess, we need to start our loader
    setLoading(true);

    // we need to use timeout to avoid a requests flood
    searchTimeoutRef.current = setTimeout(() => {
      fetchPosts(true, true);
    }, 300);
  };

  const clearSearchTimeout = (): void => {
    if (searchTimeoutRef.current !== null) {
      // remove loader if we prevent a search timer delay
      setLoading(false);

      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
  };

  const fetchPosts = async (startOffset?: boolean, fullLoader?: boolean): Promise<void> => {
    const currentSearchValue = searchRef.current;

    if (fullLoader) {
      setLoading(true);
    }

    try {
      const nextOffset = offsetRef.current + limit;

      const data = tag
        ? await getPostsByTag({
            limit,
            offset: startOffset ? 0 : nextOffset,
            tag,
          })
        : await getPosts({
            limit,
            offset: startOffset ? 0 : nextOffset,
            search: currentSearchValue,
          });

      // compare this values to avoid conflicts
      if (currentSearchValue !== searchRef.current) {
        return;
      }

      offsetRef.current = nextOffset;

      if (startOffset) {
        setPosts(data.posts);
      } else {
        setPosts((prev) => prev.concat(data.posts));
      }

      if (data.posts.length >= data.total || data.posts.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      setError(true);

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchPosts}
      hasMore={hasMore}
      // 6 - for the full loader, 1 - for just a scroll loader
      loader={<FeedLoader count={loading ? 6 : 1} />}
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
            <Text ta="center" size="md" fw={theme.other.fontWeight.medium}>
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
