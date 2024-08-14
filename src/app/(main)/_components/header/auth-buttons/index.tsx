"use client";

import { LoginModal, SignUpModal } from "@features";
import { Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogin2 } from "@tabler/icons-react";
import { type JSX } from "react";

export const AuthorizationButtons = (): JSX.Element => {
  const [loginModalOpened, { close: closeLoginModal, open: openLoginModal }] = useDisclosure(false);
  const [signUpModalOpened, { close: closeSignUpModal, open: openSignUpModal }] =
    useDisclosure(false);

  return (
    <>
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

      <LoginModal opened={loginModalOpened} onClose={closeLoginModal} />
      <SignUpModal opened={signUpModalOpened} onClose={closeSignUpModal} />
    </>
  );
};
