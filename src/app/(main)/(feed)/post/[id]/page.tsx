import { getComments, getPost } from "@app/actions/feed";
import { POST_COMMENTS_LOADING_LIMIT } from "@constants";
import { Stack } from "@mantine/core";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import type { JSX } from "react";

import { Comments, Info } from "./_components";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;

  if (!id) {
    notFound();
  }

  const numberId = Number(id);

  if (isNaN(numberId)) {
    notFound();
  }

  const data = await getPost(numberId);
  const { title, body, tags } = data;

  return {
    title,
    description: body,
    keywords: tags,
    creator: "DummyJSON",
  };
}

export default async function PostPage({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const { id } = params;

  if (!id) {
    notFound();
  }

  const numberId = Number(id);

  if (isNaN(numberId)) {
    notFound();
  }

  const info = await getPost(numberId);
  const { title, body, tags, views, reactions } = info;

  const commentsData = await getComments(numberId, {
    limit: POST_COMMENTS_LOADING_LIMIT,
    offset: 0,
  });

  return (
    <Stack gap="xs">
      <Info
        title={title}
        body={body}
        tags={tags}
        views={views}
        likes={reactions.likes}
        dislikes={reactions.dislikes}
        authorName="DummyJSON"
      />
      <Comments
        postId={numberId}
        data={commentsData}
        limit={POST_COMMENTS_LOADING_LIMIT}
        offset={0}
      />
    </Stack>
  );
}

// export async function generateStaticParams(): Promise {
//   const posts = await getPosts({ limit: 0 });

//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }
