"use client";

import { Anchor, Card, Stack, TextInput, Title, useMantineTheme } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { updateSearch } from "@store/reducers/feed";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ChangeEventHandler, type JSX, useEffect } from "react";

const MAX_TRENDING_TAGS = 7;

type RightbarProps = {
  trendingTags: string[];
};

export const Rightbar = ({ trendingTags }: RightbarProps): JSX.Element => {
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
    <Stack pos={{ lg: "sticky", md: "static" }} top={theme.spacing.md}>
      <TextInput
        radius="md"
        variant="filled"
        size="md"
        placeholder="Search..."
        leftSection={<IconSearch size={18} />}
        value={searchValue}
        onChange={handleSearch}
        disabled={pathname.startsWith("/tag/")}
      />
      <Card padding="sm" radius="md">
        <Stack gap="xs">
          <Title order={4} fw={theme.other.fontWeight.semiBold}>
            Trending tags:
          </Title>
          <Stack gap="sm">
            {trendingTags.slice(0, MAX_TRENDING_TAGS).map((tag) => (
              <Anchor key={tag} component={Link} scroll={false} href={`/tag/${tag}`}>
                #{tag}
              </Anchor>
            ))}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};
