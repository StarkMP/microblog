import { Anchor, Card, Stack, TextInput, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import type { JSX } from "react";

import styles from "./styles.module.scss";

export const Rightbar = (): JSX.Element => {
  return (
    <Stack className={styles.wrapper}>
      <TextInput
        radius="md"
        variant="filled"
        size="md"
        placeholder="Search..."
        leftSection={<IconSearch size={18} />}
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
