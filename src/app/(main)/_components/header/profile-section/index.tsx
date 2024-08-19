"use client";

import { logout as logoutServerAction } from "@app/actions/auth";
import { ActionIcon, Avatar, Group, Text } from "@mantine/core";
import { useAppSelector } from "@store/hooks";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { type JSX, useEffect, useState } from "react";

import styles from "./styles.module.scss";

export const ProfileSection = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userData = useAppSelector((state) => state.user.data);

  const handleLogout = (): void => {
    logoutUser();
  };

  const logoutUser = async (): Promise<void> => {
    setLoading(true);

    await logoutServerAction();

    window.location.reload();
  };

  const redirectToProfile = (): void => {
    router.push("/me", { scroll: false });
  };

  useEffect(() => {
    router.prefetch("/me");
  }, []);

  const fullName = `${userData.firstName} ${userData.lastName}`;

  return (
    <Group gap="lg">
      <Group align="center" gap={8} onClick={redirectToProfile} className={styles.profileLink}>
        <Avatar name={fullName} color="initials" radius="xl" size={28} />
        <Text fw="bold" size="sm">
          {fullName}
        </Text>
      </Group>
      <ActionIcon disabled={loading} size="lg" variant="default" onClick={handleLogout}>
        <IconLogout size={20} />
      </ActionIcon>
    </Group>
  );
};
