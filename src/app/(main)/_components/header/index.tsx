"use client";

import { Anchor, Box, Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAppSelector } from "@store/hooks";
import { LogoIcon } from "@ui/icons";
import Link from "next/link";
import { type JSX } from "react";

import { AuthorizationButtons } from "./auth-buttons";
import { MobileMenu } from "./mobile-menu";
import { ProfileSection } from "./profile-section";
import styles from "./styles.module.scss";

export const Header = (): JSX.Element => {
  const [opened, { toggle, close }] = useDisclosure();
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return (
    <>
      <MobileMenu opened={opened} close={close} />

      <Box component="div" className={styles.wrapper} w="100%" h={68}>
        <Container size="xl" display="flex" h="100%">
          <Group justify="space-between" style={{ width: "100%" }}>
            <Anchor component={Link} href="/" display="inline-flex">
              <LogoIcon />
            </Anchor>
            <Burger
              display={{ lg: "none", base: "block" }}
              opened={opened}
              onClick={toggle}
              aria-label="Toggle navigation"
            />
            <Box component="div" display={{ lg: "block", base: "none" }}>
              {isAuth ? <ProfileSection /> : <AuthorizationButtons />}
            </Box>
          </Group>
        </Container>
      </Box>
    </>
  );
};
