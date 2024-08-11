"use client";

import { Anchor, Card, Stack, TextInput, Title, useMantineTheme } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { updateSearch } from "@store/reducers/feed";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import type { ChangeEventHandler, JSX } from "react";

export const Rightbar = (): JSX.Element => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.feed.search);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(updateSearch(event.currentTarget.value));
  };

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
      />
      <Card padding="sm" radius="md">
        <Stack gap="xs">
          <Title order={4} fw={600}>
            Trending tags:
          </Title>
          <Anchor component={Link} href="/">
            #frontend
          </Anchor>
          <Anchor component={Link} href="/">
            #web
          </Anchor>
          <Anchor component={Link} href="/">
            #backend
          </Anchor>
          <Anchor component={Link} href="/">
            #development
          </Anchor>
          <Anchor component={Link} href="/">
            #react
          </Anchor>
          <Anchor component={Link} href="/">
            #nextjs
          </Anchor>
          <Anchor component={Link} href="/">
            #it
          </Anchor>
        </Stack>
      </Card>
    </Stack>
  );
};
