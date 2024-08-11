import { Avatar, Badge, Card, Group, Text, Title } from "@mantine/core";
import { IconEye, IconMessageCircle, IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import type { JSX } from "react";

import styles from "./styles.module.scss";

type PostProps = {
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
  return (
    <Card shadow="sm" padding="md" radius="md" className={styles.wrapper}>
      <Group justify="space-between" align="center" mb="md">
        <Group align="center" gap={8}>
          <Avatar color="pink" radius="xl" size="sm">
            {authorName[0].toUpperCase()}
          </Avatar>
          <Text size="sm">{authorName}</Text>
          <Text size="xs" c="dimmed" lh={1}>
            4 hours ago
          </Text>
        </Group>

        <Group gap={6}>
          {likes && (
            <Badge color="green" variant="light" fw={500} rightSection={<IconThumbUp size={16} />}>
              {likes}
            </Badge>
          )}
          {dislikes && (
            <Badge color="red" variant="light" fw={500} rightSection={<IconThumbDown size={16} />}>
              {dislikes}
            </Badge>
          )}
          {comments && (
            <Badge
              color="gray"
              variant="light"
              fw={500}
              rightSection={<IconMessageCircle size={16} />}
            >
              {comments}
            </Badge>
          )}
          <Badge color="gray" variant="light" fw={500} rightSection={<IconEye size={16} />}>
            {views}
          </Badge>
        </Group>
      </Group>

      <Group justify="space-between" mb="xs">
        <Title order={4}>{title}</Title>
      </Group>

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
