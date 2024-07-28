import { Button, Container, Group, rem, Switch, useMantineTheme } from "@mantine/core";
import { IconLogin2, IconMoonStars, IconSun } from "@tabler/icons-react";
import { LogoIcon } from "@ui/icons";
import type { JSX } from "react";

import styles from "./styles.module.scss";

export const Header = (): JSX.Element => {
  const theme = useMantineTheme();

  return (
    <div className={styles.wrapper}>
      <Container size="xl" className={styles.container}>
        <LogoIcon />
        <Group>
          {/* <Switch
            size="md"
            color="dark.4"
            onLabel={
              <IconSun
                style={{ width: rem(16), height: rem(16) }}
                stroke={2.5}
                color={theme.colors.yellow[4]}
              />
            }
            offLabel={
              <IconMoonStars
                style={{ width: rem(16), height: rem(16) }}
                stroke={2.5}
                color={theme.colors.blue[6]}
              />
            }
          /> */}
          <Group gap="xs">
            <Button variant="light" radius="md" leftSection={<IconLogin2 size={20} />}>
              Sign In
            </Button>
            <Button variant="default" radius="md">
              Create account
            </Button>
          </Group>
        </Group>
      </Container>
    </div>
  );
};
