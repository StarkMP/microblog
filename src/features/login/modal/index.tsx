"use client";

import { Modal } from "@mantine/core";
import type { JSX } from "react";

import { LoginForm } from "../form";

type LoginModalProps = {
  opened: boolean;
  onClose: () => void;
};

export const LoginModal = ({ opened, onClose }: LoginModalProps): JSX.Element => {
  return (
    <Modal opened={opened} onClose={onClose} title="Sign In" withinPortal={false} radius="md">
      <LoginForm />
    </Modal>
  );
};
