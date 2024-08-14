import { Anchor, Center, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import type { JSX } from "react";

export const metadata = {
  title: "404 Page not found - Microblog",
};

export default function NotFound(): JSX.Element {
  return (
    <Center w="100vw" h="100vh">
      <Stack ta="center">
        <Title order={1}>404</Title>
        <Text c="dimmed" fz="sm">
          Page not found.{" "}
          <Anchor inherit component={Link} prefetch scroll={false} href="/">
            Return
          </Anchor>{" "}
          to the home page.
        </Text>
      </Stack>
    </Center>
  );
}
