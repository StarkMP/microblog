"use client";

import { Stack } from "@mantine/core";
import type { JSX, ReactNode } from "react";

import { PostSkeleton } from "..";

export const FeedLoader = ({ count = 6 }: { count?: number }): JSX.Element => {
  const skeletons: ReactNode[] = [];

  for (let i = 0; i < count; i++) {
    skeletons[i] = <PostSkeleton key={i} />;
  }

  return <Stack gap="sm">{skeletons}</Stack>;
};
