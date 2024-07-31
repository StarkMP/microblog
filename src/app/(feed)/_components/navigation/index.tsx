import { Anchor, Card, NavLink, Stack, Text } from "@mantine/core";
import { LogoIcon } from "@ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { JSX } from "react";

import styles from "./styles.module.scss";

export const Navigation = (): JSX.Element => {
  const pathname = usePathname();

  return (
    <Stack className={styles.wrapper}>
      <Stack mb="sm" gap="xs">
        <NavLink
          component={Link}
          href="/"
          label="🏠 Home"
          classNames={{
            root: styles.navlink,
            label: styles.navlinkLabel,
          }}
          active={pathname == "/"}
        />
        <NavLink
          component={Link}
          href="/"
          label="🎙️ Podcasts"
          classNames={{
            root: styles.navlink,
            label: styles.navlinkLabel,
          }}
        />
        <NavLink
          component={Link}
          href="/"
          label="👨‍💻 Software Development"
          classNames={{
            root: styles.navlink,
            label: styles.navlinkLabel,
          }}
        />
        <NavLink
          component={Link}
          href="/"
          label="🏛️ Politics"
          classNames={{
            root: styles.navlink,
            label: styles.navlinkLabel,
          }}
        />
        <NavLink
          component={Link}
          href="/"
          label="🌎 World News"
          classNames={{
            root: styles.navlink,
            label: styles.navlinkLabel,
          }}
        />
        <NavLink
          component={Link}
          href="/"
          label="⚽ Sports"
          classNames={{
            root: styles.navlink,
            label: styles.navlinkLabel,
          }}
        />
      </Stack>

      <Card padding="sm" radius="md">
        <Stack gap="xs">
          <LogoIcon className={styles.logo} />
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
