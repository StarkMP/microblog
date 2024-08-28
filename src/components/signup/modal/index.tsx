"use client";

import { Modal } from "@mantine/core";
import type { JSX } from "react";

import { SignUpForm } from "../form";

type SignUpModalProps = {
  opened: boolean;
  onClose: () => void;
  onSwitch: () => void;
};

export const SignUpModal = ({ opened, onClose, onSwitch }: SignUpModalProps): JSX.Element => {
  return (
    <Modal opened={opened} onClose={onClose} title="Create account" radius="md">
      <SignUpForm onSwitch={onSwitch} />
    </Modal>
  );
};
