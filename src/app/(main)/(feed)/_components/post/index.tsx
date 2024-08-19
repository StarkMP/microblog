"use client";

import { Anchor, Avatar, Badge, Card, Group, Text, useMantineTheme } from "@mantine/core";
import { IconEye, IconMessageCircle, IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import Link from "next/link";
import type { JSX } from "react";

type PostProps = {
  id: number;
  authorName: string;
  // creationDate: Date;
  likes?: number;
  dislikes?: number;
  views?: number;
  comments?: number;
  title: string;
  body: string;
  tags: string[];
};

export const Post = ({
  id,
  authorName,
  // creationDate,
  likes,
  dislikes,
  views,
  comments,
  title,
  body,
  tags,
}: PostProps): JSX.Element => {
  const theme = useMantineTheme();

  return (
    <Card component="article" shadow="sm" padding="md" radius="md">
      <Group justify="space-between" align="center" mb="md">
        <Group align="center" gap={8}>
          <Avatar name={authorName} color="initials" radius="xl" size="sm" />
          <Text size="sm">{authorName}</Text>
          <Text size="xs" c="dimmed" lh={1}>
            4 hours ago
          </Text>
        </Group>

        <Group gap={6}>
          {likes && (
            <Badge
              color="green"
              variant="light"
              fw={theme.other.fontWeight.medium}
              rightSection={<IconThumbUp size={16} />}
            >
              {likes}
            </Badge>
          )}
          {dislikes && (
            <Badge
              color="red"
              variant="light"
              fw={theme.other.fontWeight.medium}
              rightSection={<IconThumbDown size={16} />}
            >
              {dislikes}
            </Badge>
          )}
          {comments && (
            <Badge
              color="gray"
              variant="light"
              fw={theme.other.fontWeight.medium}
              rightSection={<IconMessageCircle size={16} />}
            >
              {comments}
            </Badge>
          )}
          <Badge
            color="gray"
            variant="light"
            fw={theme.other.fontWeight.medium}
            rightSection={<IconEye size={16} />}
          >
            {views}
          </Badge>
        </Group>
      </Group>

      <Anchor fz="h4" fw="bold" c="gray" component={Link} href={`/post/${id}`} mb="xs">
        {title}
      </Anchor>

      <Text size="sm" mb="lg">
        {body}
      </Text>

      <Group gap={6}>
        {tags.map((tag, index) => (
          <Badge key={index} color="gray" variant="light">
            #{tag}
          </Badge>
        ))}
      </Group>
    </Card>
  );
};
