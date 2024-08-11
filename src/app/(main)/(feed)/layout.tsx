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
        <Grid.Col span={{ lg: 3 }} order={0}>
          <Navigation />
        </Grid.Col>
        <Grid.Col span={{ lg: 6, md: 12 }} order={2}>
          {children}
        </Grid.Col>
        <Grid.Col span={{ lg: 3 }} order={{ lg: 3, md: 1 }}>
          <Rightbar />
        </Grid.Col>
      </Grid>

      {auth}
    </>
  );
}
