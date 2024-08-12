"use client";

import { Anchor, Card, NavLink, Stack, Text } from "@mantine/core";
import { LogoIcon } from "@ui/icons";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ParsedUrlQueryInput } from "querystring";
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
  const searchParams = useSearchParams();

  return (
    <Stack className={styles.wrapper}>
      <Stack mb="sm" gap="xs">
        {categories.map(({ id, label }) => {
          const queryParamName = "category";
          const hasQueryParam = searchParams.has(queryParamName);

          return (
            <NavLink
              key={id}
              component={Link}
              prefetch
              href={{
                query: id && {
                  ...Array.from(searchParams.entries()).reduce(
                    (memo: ParsedUrlQueryInput, [key, value]) => {
                      memo[key] = value;

                      return memo;
                    },
                    {}
                  ),
                  [queryParamName]: id,
                },
                pathname,
              }}
              label={label}
              classNames={{
                root: styles.navlink,
                label: styles.navlinkLabel,
              }}
              active={
                (hasQueryParam && searchParams.get(queryParamName) === id) ||
                (!id && !hasQueryParam)
              }
            />
          );
        })}
      </Stack>

      <Card padding="sm" radius="md">
        <Stack gap="xs">
          <LogoIcon className={styles.logo} />
          <Text c="dimmed" size="sm">
            <Text inherit c="red.7" fw="bold" mb="xs">
              WORK IN PROGRESS
            </Text>
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
