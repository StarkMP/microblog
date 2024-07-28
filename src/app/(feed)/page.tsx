"use client";

// import styles from "./page.module.scss";
import { Stack } from "@mantine/core";
import type { JSX } from "react";

import { Post } from "./_components";

export default function FeedPage(): JSX.Element {
  return (
    <Stack gap="sm">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Stack>
  );
}
