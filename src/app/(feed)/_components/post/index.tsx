import { Avatar, Badge, Card, Group, Text, Title } from "@mantine/core";
import { IconEye, IconMessageCircle, IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import type { JSX } from "react";

import styles from "./styles.module.scss";

export const Post = (): JSX.Element => {
  return (
    <Card shadow="sm" padding="md" radius="md" className={styles.wrapper}>
      <Group justify="space-between" align="center" mb="md">
        <Group align="center" gap={8}>
          <Avatar color="pink" radius="xl" size="sm">
            EJ
          </Avatar>
          <Text size="sm">emilyjohnson</Text>
          <Text size="xs" c="dimmed" lh={1}>
            4 hours ago
          </Text>
        </Group>

        <Group gap={6}>
          <Badge color="green" variant="light" rightSection={<IconThumbUp size={16} />}>
            51
          </Badge>
          <Badge color="red" variant="light" rightSection={<IconThumbDown size={16} />}>
            2
          </Badge>
          <Badge color="gray" variant="light" rightSection={<IconMessageCircle size={16} />}>
            2
          </Badge>
          <Badge color="gray" variant="light" rightSection={<IconEye size={16} />}>
            365
          </Badge>
        </Group>
      </Group>

      <Group justify="space-between" mb="xs">
        <Title order={4}>Norway Fjord Adventures</Title>
      </Group>

      <Text size="sm" mb="lg">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Group gap={6}>
        <Badge color="gray" variant="light">
          #development
        </Badge>
        <Badge color="gray" variant="light">
          #frontend
        </Badge>
        <Badge color="gray" variant="light">
          #react
        </Badge>
      </Group>
    </Card>
  );
};
