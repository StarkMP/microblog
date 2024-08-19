"use client";

import { Avatar, Badge, Button, Card, Group, Stack, Text, Title } from "@mantine/core";
import { IconEye, IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { type JSX, useState } from "react";

type InfoProps = {
  authorName: string;
  // creationDate: Date;
  likes: number;
  dislikes: number;
  views: number;
  title: string;
  body: string;
  tags: string[];
};

enum Reaction {
  Like = 0,
  Dislike,
}

export const Info = ({
  authorName,
  // creationDate,
  likes: initialLikes,
  dislikes: initialDislikes,
  views,
  title,
  body,
  tags,
}: InfoProps): JSX.Element => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [reaction, setReaction] = useState<Reaction | null>(null);

  // also we should to make a request for this
  // but DummyJSON has no API for it
  const handleReact = (value: Reaction): void => {
    if (reaction === value) {
      setReaction(null);

      if (value === Reaction.Like) {
        setLikes((prev) => prev - 1);
      }

      if (value === Reaction.Dislike) {
        setDislikes((prev) => prev - 1);
      }

      return;
    }

    if (value === Reaction.Like) {
      if (reaction === Reaction.Dislike) {
        setDislikes((prev) => prev - 1);
      }

      setLikes((prev) => prev + 1);
    }

    if (value === Reaction.Dislike) {
      if (reaction === Reaction.Like) {
        setLikes((prev) => prev - 1);
      }

      setDislikes((prev) => prev + 1);
    }

    setReaction(value);
  };

  return (
    <Card component="article" shadow="sm" padding="lg" radius="md">
      <Stack>
        <Group align="center" gap="sm">
          <Avatar name={authorName} color="initials" radius="xl" size="md" />
          <Text size="md" fw="bold">
            {authorName}
          </Text>
          <Text size="sm" c="dimmed">
            4 hours ago
          </Text>
        </Group>

        <Group justify="space-between">
          <Title order={1}>{title}</Title>
        </Group>

        <Text size="md">{body}</Text>

        <Group gap={6}>
          {tags.map((tag, index) => (
            <Badge key={index} color="gray" variant="light">
              #{tag}
            </Badge>
          ))}
        </Group>

        <Group align="center" justify="space-between">
          <Group gap="sm">
            <Button
              color={reaction === Reaction.Like ? "green" : "gray"}
              variant={reaction === Reaction.Like ? "light" : "default"}
              leftSection={<IconThumbUp size={24} />}
              radius="lg"
              onClick={(): void => handleReact(Reaction.Like)}
            >
              {likes}
            </Button>
            <Button
              color={reaction === Reaction.Dislike ? "red" : "gray"}
              variant={reaction === Reaction.Dislike ? "light" : "default"}
              leftSection={<IconThumbDown size={24} />}
              radius="lg"
              onClick={(): void => handleReact(Reaction.Dislike)}
            >
              {dislikes}
            </Button>
          </Group>

          <Badge
            color="gray"
            variant="light"
            rightSection={<IconEye size={24} stroke={1.75} />}
            size="lg"
          >
            {views}
          </Badge>
        </Group>
      </Stack>
    </Card>
  );
};
