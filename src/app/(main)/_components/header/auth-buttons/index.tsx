"use client";

import { useAuthModals } from "@context";
import { Button, Group } from "@mantine/core";
import { IconLogin2 } from "@tabler/icons-react";
import { type JSX } from "react";

export const AuthorizationButtons = (): JSX.Element => {
  const { openLoginModal, openSignUpModal } = useAuthModals();

  return (
    <Group gap="xs">
      <Button
        variant="light"
        radius="md"
        leftSection={<IconLogin2 size={20} />}
        onClick={openLoginModal}
      >
        Sign In
      </Button>
      <Button variant="default" radius="md" onClick={openSignUpModal}>
        Create account
      </Button>
    </Group>
  );
};
