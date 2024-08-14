"use client";

import { Anchor, Card, Stack, TextInput, Title, useMantineTheme } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { updateSearch } from "@store/reducers/feed";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ParsedUrlQueryInput } from "querystring";
import { type ChangeEventHandler, type JSX, useEffect } from "react";

const MAX_TRENDING_TAGS = 7;

type RightbarProps = {
  trendingTags: string[];
};

export const Rightbar = ({ trendingTags }: RightbarProps): JSX.Element => {
  const searchParams = useSearchParams();
  const theme = useMantineTheme();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.feed.search);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(updateSearch(event.currentTarget.value));
  };

  useEffect(() => {
    dispatch(updateSearch(""));
  }, [pathname]);

  return (
    <Stack pos="sticky" top={theme.spacing.md}>
      <TextInput
        radius="md"
        variant="filled"
        size="md"
        placeholder="Search..."
        leftSection={<IconSearch size={18} />}
        value={searchValue}
        onChange={handleSearch}
        disabled={pathname === "/tag"}
      />
      <Card padding="sm" radius="md">
        <Stack gap="xs">
          <Title order={4} fw={600}>
            Trending tags:
          </Title>
          <Stack gap="sm">
            {trendingTags.slice(0, MAX_TRENDING_TAGS).map((tag) => (
              <Anchor
                key={tag}
                component={Link}
                prefetch
                scroll={false}
                href={{
                  pathname: "/tag",
                  query: {
                    ...Array.from(searchParams.entries()).reduce(
                      (memo: ParsedUrlQueryInput, [key, value]) => {
                        memo[key] = value;

                        return memo;
                      },
                      {}
                    ),
                    text: tag,
                  },
                }}
              >
                #{tag}
              </Anchor>
            ))}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};
