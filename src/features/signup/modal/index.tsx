"use client";

import { Modal } from "@mantine/core";
import type { JSX } from "react";

import { SignUpForm } from "../form";

type SignUpModalProps = {
  opened: boolean;
  onClose: () => void;
};

export const SignUpModal = ({ opened, onClose }: SignUpModalProps): JSX.Element => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Create account"
      withinPortal={false}
      radius="md"
    >
      <SignUpForm />
    </Modal>
  );
};
