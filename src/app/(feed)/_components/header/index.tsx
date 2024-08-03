import { Button, Container, Group } from "@mantine/core";
import { IconLogin2 } from "@tabler/icons-react";
import { LogoIcon } from "@ui/icons";
import Link from "next/link";
import type { JSX } from "react";

import styles from "./styles.module.scss";

export const Header = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Container size="xl" className={styles.container}>
        <Group justify="space-between" style={{ width: "100%" }}>
          <LogoIcon />
          <Group gap="xs">
            <Button
              component={Link}
              href="/login"
              variant="light"
              radius="md"
              leftSection={<IconLogin2 size={20} />}
            >
              Sign In
            </Button>
            <Button component={Link} href="/signup" variant="default" radius="md">
              Create account
            </Button>
          </Group>
        </Group>
      </Container>
    </div>
  );
};
