import { getTags } from "@app/actions/feed";
import { type JSX, type ReactNode } from "react";

import { ClientFeedLayout } from "./client-layout";

export default async function FeedLayout({
  children,
}: {
  children: ReactNode;
}): Promise<JSX.Element> {
  const tags = await getTags();

  return <ClientFeedLayout trendingTags={tags}>{children}</ClientFeedLayout>;
}
