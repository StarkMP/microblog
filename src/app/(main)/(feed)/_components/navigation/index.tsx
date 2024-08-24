"use client";

import { Anchor, Card, NavLink, Stack, Text, useMantineTheme } from "@mantine/core";
import { LogoIcon } from "@ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { JSX } from "react";

import styles from "./styles.module.scss";

const categories = [
  { id: "", label: "🏠 Home" },
  { id: "podcasts", label: "🎙️ Podcasts" },
  { id: "development", label: "👨‍💻 Software Development" },
  { id: "politics", label: "🏛️ Politics" },
  { id: "news", label: "🌎 World News" },
  { id: "sports", label: "⚽ Sports" },
];

export const Navigation = (): JSX.Element => {
  const pathname = usePathname();
  const theme = useMantineTheme();

  return (
    <Stack pos={{ lg: "sticky", md: "static" }} top={theme.spacing.md}>
      <Stack gap="xs">
        {categories.map(({ id, label }) => {
          const categoryPath = id ? `/category/${id}` : "/";
          const match = pathname === categoryPath;

          return (
            <NavLink
              key={id}
              component={Link}
              scroll={false}
              href={categoryPath}
              label={label}
              classNames={{
                root: styles.navlink,
                label: styles.navlinkLabel,
              }}
              active={match}
            />
          );
        })}
      </Stack>

      <Card padding="sm" radius="md">
        <Stack gap="xs">
          <LogoIcon className={styles.logo} />
          <Text size="sm" c="red.7" fw="bold">
            WORK IN PROGRESS
          </Text>
          <Text c="dimmed" size="sm">
            It&apos;s just fake website for GitHub.
            <br />
            All mocked data fetch from{" "}
            <Anchor href="https://dummyjson.com" target="_blank">
              DummyJSON
            </Anchor>
            .
            <br />
            You can find the source code{" "}
            <Anchor href="https://github.com/StarkMP/microblog" target="_blank" rel="noreferrer">
              here
            </Anchor>
            .
            <br />
            <br />
            Made by{" "}
            <Anchor href="https://github.com/StarkMP" target="_blank" rel="noreferrer">
              StarkMP
            </Anchor>
            .
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
};
