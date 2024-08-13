"use client";

import { Button, Group } from "@mantine/core";
import { IconLogin2 } from "@tabler/icons-react";
import Link from "next/link";
import { type JSX } from "react";

export const AuthorizationButtons = (): JSX.Element => (
  <Group gap="xs">
    <Button
      component={Link}
      scroll={false}
      href="/login"
      prefetch
      variant="light"
      radius="md"
      leftSection={<IconLogin2 size={20} />}
    >
      Sign In
    </Button>
    <Button component={Link} scroll={false} href="/signup" prefetch variant="default" radius="md">
      Create account
    </Button>
  </Group>
);
