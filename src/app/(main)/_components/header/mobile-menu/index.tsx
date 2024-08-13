"use client";

import { Anchor, Drawer, Stack } from "@mantine/core";
import { useAppSelector } from "@store/hooks";
import { LogoIcon } from "@ui/icons";
import Link from "next/link";
import { type JSX } from "react";

import { AuthorizationButtons } from "../auth-buttons";
import { ProfileSection } from "../profile-section";

type MobileMenuProps = {
  opened: boolean;
  close: () => void;
};

export const MobileMenu = ({ opened, close }: MobileMenuProps): JSX.Element => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return (
    <Drawer.Root opened={opened} onClose={close} position="right">
      <Drawer.Overlay />

      <Drawer.Content>
        <Drawer.Header>
          <Anchor component={Link} href="/" display="inline-flex">
            <LogoIcon />
          </Anchor>
          <Drawer.CloseButton />
        </Drawer.Header>

        <Drawer.Body>
          <Stack align="flex-end">{isAuth ? <ProfileSection /> : <AuthorizationButtons />}</Stack>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
