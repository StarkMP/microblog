"use client";

import { LoginModal } from "@features";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import type { JSX } from "react";

export default function LoginPage(): JSX.Element {
  const [opened, { close }] = useDisclosure(true);
  const router = useRouter();

  const onClose = (): void => {
    close();
    router.push("/", { scroll: false });
  };

  return <LoginModal opened={opened} onClose={onClose} />;
}
