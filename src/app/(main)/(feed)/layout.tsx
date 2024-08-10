"use client";

import { Grid } from "@mantine/core";
import { type JSX, type ReactNode } from "react";

import { Navigation, Rightbar } from "./_components";

export default function FeedLayout({
  children,
  auth,
}: {
  children: ReactNode;
  auth: ReactNode;
}): JSX.Element {
  return (
    <>
      <Grid>
        <Grid.Col span={3}>
          <Navigation />
        </Grid.Col>
        <Grid.Col span={6}>{children}</Grid.Col>
        <Grid.Col span={3}>
          <Rightbar />
        </Grid.Col>
      </Grid>

      {auth}
    </>
  );
}
