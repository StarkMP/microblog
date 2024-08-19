"use client";

import { getComments } from "@app/actions/feed";
import { Avatar, Card, Group, Stack, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { APICommentModel, APIGetCommentsResponse } from "@typings/api";
import { type JSX, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { CommentForm } from "./form";

type CommentsProps = {
  postId: number;
  data: APIGetCommentsResponse;
  limit: number;
  offset: number;
};

export const Comments = ({
  postId,
  data,
  limit,
  offset: initialOffset,
}: CommentsProps): JSX.Element => {
  const [comments, setComments] = useState(data.comments);
  const [count, setCount] = useState(data.total);
  const [hasMore, setHasMore] = useState(data.total > 0 && data.comments.length < data.total);
  const [error, setError] = useState(false);
  const offsetRef = useRef<number>(initialOffset);

  useEffect(() => {
    if (error) {
      notifications.show({
        title: "Error: Something went wrong",
        message: "Please, try again",
        color: "red",
        autoClose: 5000,
      });
    }
  }, [error]);

  const fetchComments = async (): Promise<void> => {
    try {
      const data = await getComments(postId, { limit, offset: offsetRef.current });

      setComments((prev) => prev.concat(data.comments));

      offsetRef.current = offsetRef.current + limit;

      if (data.comments.length >= data.total || data.comments.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      setError(true);
    }
  };

  const addCommentToList = (data: APICommentModel): void => {
    setComments((prev) => [data, ...prev]);
    setCount((prev) => prev + 1);
  };

  return (
    <Card component="section" shadow="sm" padding="lg" radius="md">
      <Stack gap="md">
        <Title order={3}>{count} comments:</Title>
        <CommentForm postId={postId} addCommentToList={addCommentToList} />
        <InfiniteScroll
          dataLength={comments.length}
          next={fetchComments}
          hasMore={hasMore}
          loader={<span>Loading...</span>}
        >
          <Stack>
            {comments.map((comment) => (
              <Stack key={comment.id} gap={0}>
                <Group align="center" gap="sm">
                  <Avatar name={comment.user.fullName} color="initials" radius="xl" size={28} />
                  <Text size="sm" fw="bold">
                    {comment.user.fullName}
                  </Text>
                  <Text size="xs" c="dimmed">
                    4 hours ago
                  </Text>
                </Group>
                <Text pl={40}>{comment.body}</Text>
              </Stack>
            ))}
          </Stack>
        </InfiniteScroll>
      </Stack>
    </Card>
  );
};
