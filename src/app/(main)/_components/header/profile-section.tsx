"use client";

import { logout as logoutServerAction } from "@app/actions/auth";
import { ActionIcon, Avatar, Group, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { logout } from "@store/reducers/user";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { type JSX, useEffect } from "react";

import styles from "./profile-section.module.scss";

export const ProfileSection = (): JSX.Element => {
  const router = useRouter();
  const userData = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    logoutServerAction();

    router.push("/");
    router.refresh();

    dispatch(logout());
  };

  const redirectToProfile = (): void => {
    router.push("/me");
  };

  useEffect(() => {
    router.prefetch("/me");
  }, []);

  return (
    <Group gap="lg">
      <Group align="center" gap={8} onClick={redirectToProfile} className={styles.profileLink}>
        <Avatar color="pink" radius="xl" size={28}>
          {userData?.username[0].toUpperCase()}
        </Avatar>
        <Text fw="bold" size="sm">
          {userData?.username}
        </Text>
      </Group>
      <ActionIcon size="lg" variant="default" onClick={handleLogout}>
        <IconLogout size={20} />
      </ActionIcon>
    </Group>
  );
};
