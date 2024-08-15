"use client";

import { Modal } from "@mantine/core";
import type { JSX } from "react";

import { LoginForm } from "../form";

type LoginModalProps = {
  opened: boolean;
  onClose: () => void;
  onSwitch: () => void;
};

export const LoginModal = ({ opened, onClose, onSwitch }: LoginModalProps): JSX.Element => {
  return (
    <Modal opened={opened} onClose={onClose} title="Sign In" radius="md">
      <LoginForm onSwitch={onSwitch} />
    </Modal>
  );
};
