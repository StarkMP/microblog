"use client";

import { Anchor, Button, Container, Group } from "@mantine/core";
import { useAppSelector } from "@store/hooks";
import { IconLogin2 } from "@tabler/icons-react";
import { LogoIcon } from "@ui/icons";
import Link from "next/link";
import { type JSX } from "react";

import { ProfileSection } from "./profile-section";
import styles from "./styles.module.scss";

export const Header = (): JSX.Element => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return (
    <div className={styles.wrapper}>
      <Container size="xl" className={styles.container}>
        <Group justify="space-between" style={{ width: "100%" }}>
          <Anchor component={Link} href="/" display="inline-flex">
            <LogoIcon />
          </Anchor>
          {isAuth ? (
            <ProfileSection />
          ) : (
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
              <Button
                component={Link}
                scroll={false}
                href="/signup"
                prefetch
                variant="default"
                radius="md"
              >
                Create account
              </Button>
            </Group>
          )}
        </Group>
      </Container>
    </div>
  );
};
