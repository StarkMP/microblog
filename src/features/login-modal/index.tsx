"use client";

import { Anchor, Button, Card, Group, Modal, PasswordInput, Text, TextInput } from "@mantine/core";
import Link from "next/link";
import type { JSX } from "react";

type LoginModalProps = {
  opened: boolean;
  onClose: () => void;
};

export const LoginModal = ({ opened, onClose }: LoginModalProps): JSX.Element => {
  return (
    <Modal opened={opened} onClose={onClose} title="Sign In" withinPortal={false} radius="md">
      <form>
        <TextInput withAsterisk label="Email" placeholder="your@email.com" mb="md" />

        <PasswordInput withAsterisk label="Password" mb="md" />

        <Card mb="md" padding="sm">
          <Text fz="sm" c="dimmed">
            It&apos;s fake login form. You can pass any credentials to simulate sign in with mocked
            data from{" "}
            <Anchor fz="sm" href="https://dummyjson.com/docs/auth" target="_blank">
              DummyJSON Auth
            </Anchor>
            .
          </Text>
        </Card>

        <Group justify="space-between">
          <Anchor fz="xs" component={Link} href="/signup">
            Don&apos;t have an account? Register now
          </Anchor>
          <Button type="submit">Sign In</Button>
        </Group>
      </form>
    </Modal>
  );
};
