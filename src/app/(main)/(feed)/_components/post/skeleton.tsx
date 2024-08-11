"use client";

import { Card, Group, Skeleton } from "@mantine/core";
import type { JSX } from "react";

export const PostSkeleton = ({ hasPosts }: { hasPosts?: boolean }): JSX.Element => {
  return (
    <Card mt={hasPosts ? "md" : 0} shadow="sm" padding="md" radius="md">
      <Group justify="space-between" align="center" mb="md">
        <Group align="center" gap={8}>
          <Skeleton height={26} circle />
          <Skeleton height={12} width={144} radius="xl" />
        </Group>

        <Group gap={6}>
          <Skeleton height={16} width={198} radius="xl" />
        </Group>
      </Group>

      <Group justify="space-between" mb="sm">
        <Skeleton height={16} width="50%" radius="xl" />
      </Group>

      <Skeleton height={80} radius="md" mb="md" />

      <Group gap={6}>
        <Skeleton height={16} width="30%" radius="xl" />
      </Group>
    </Card>
  );
};
