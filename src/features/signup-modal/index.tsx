"use client";

import {
  Anchor,
  Button,
  Card,
  Checkbox,
  Group,
  Modal,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import type { JSX } from "react";

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
      <form>
        <TextInput withAsterisk label="Email" placeholder="your@email.com" mb="md" />

        <TextInput withAsterisk label="Username" mb="md" />

        <PasswordInput withAsterisk label="Password" mb="md" />

        <PasswordInput withAsterisk label="Confirm password" mb="md" />

        <Checkbox
          label={
            <>
              I agree with{" "}
              <Anchor href="https://youtu.be/dQw4w9WgXcQ" target="_blank" inherit>
                privacy policy
              </Anchor>
            </>
          }
          mb="md"
        />

        <Card mb="md" padding="sm">
          <Text fz="sm" c="dimmed">
            It&apos;s fake registration form. You can pass any credentials to simulate sign up with
            mocked data from{" "}
            <Anchor fz="sm" href="https://dummyjson.com/docs/auth" target="_blank">
              DummyJSON Auth
            </Anchor>
            .
          </Text>
        </Card>

        <Group justify="space-between">
          <Anchor fz="xs" component={Link} href="/login">
            Already have an account? Sign In
          </Anchor>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
};
