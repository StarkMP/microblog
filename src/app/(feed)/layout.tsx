"use client";

import { Container, Grid } from "@mantine/core";
import type { JSX, ReactNode } from "react";

import { Header, Navigation, Rightbar } from "./_components";

export default function FeedLayout({
  children,
  auth,
}: {
  children: ReactNode;
  auth: ReactNode;
}): JSX.Element {
  return (
    <>
      {auth}
      <Header />
      <Container size="xl" pb="md" pt="md">
        <Grid>
          <Grid.Col span={3}>
            <Navigation />
          </Grid.Col>
          <Grid.Col span={6}>{children}</Grid.Col>
          <Grid.Col span={3}>
            <Rightbar />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
