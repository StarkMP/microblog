"use client";

import { logout as logoutServerAction } from "@app/actions/auth";
import { ActionIcon, Anchor, Avatar, Group, Skeleton } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { logout } from "@store/reducers/user";
import { IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type JSX } from "react";

import styles from "./styles.module.scss";

export const ProfileSection = (): JSX.Element => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    logoutServerAction();

    router.push("/");
    router.refresh();

    dispatch(logout());
  };

  return (
    <Group gap="lg">
      <Group align="center" gap={8}>
        {user.data ? (
          <>
            <Avatar color="pink" radius="xl" size={28}>
              {user.data.username[0]}
            </Avatar>
            <Anchor
              fw="bold"
              size="sm"
              underline="never"
              component={Link}
              href="/me"
              className={styles.profileLink}
            >
              {user.data.username}
            </Anchor>
          </>
        ) : (
          <>
            <Skeleton height={28} circle />
            <Skeleton height={12} width={80} radius="xl" />
          </>
        )}
      </Group>
      <ActionIcon size="lg" variant="default" onClick={handleLogout}>
        <IconLogout size={20} />
      </ActionIcon>
    </Group>
  );
};
