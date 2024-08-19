"use client";

import { Grid } from "@mantine/core";
import { usePathname } from "next/navigation";
import type { JSX, ReactNode } from "react";

import { Navigation, Rightbar } from "./_components";

type ClientFeedLayoutProps = {
  children: ReactNode;
  trendingTags: string[];
};

// we need to use components like this
// because Mantine's components are client-only :(
// and at the same time we need to fetch data at server pages/layouts
export const ClientFeedLayout = ({
  children,
  trendingTags,
}: ClientFeedLayoutProps): JSX.Element => {
  const pathname = usePathname();
  const isPostPage = pathname.startsWith("/post/");

  return (
    <Grid>
      <Grid.Col span={{ lg: 3 }} order={0}>
        <Navigation />
      </Grid.Col>
      <Grid.Col span={{ lg: isPostPage ? 9 : 6, md: 12 }} order={2}>
        {children}
      </Grid.Col>
      {!isPostPage && (
        <Grid.Col span={{ lg: 3 }} order={{ lg: 3, md: 1 }}>
          <Rightbar trendingTags={trendingTags} />
        </Grid.Col>
      )}
    </Grid>
  );
};
