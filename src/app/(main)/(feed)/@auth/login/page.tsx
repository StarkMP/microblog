"use client";

import { MODAL_FADE_TRANSITION_DELAY } from "@constants";
import { LoginModal } from "@features";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { type JSX, useEffect } from "react";

export default function LoginPage(): JSX.Element {
  const [opened, { close }] = useDisclosure(true);
  const router = useRouter();

  const onClose = (): void => {
    close();
    setTimeout(() => router.push("/", { scroll: false }), MODAL_FADE_TRANSITION_DELAY);
  };

  const onSwitch = (): void => {
    close();
    setTimeout(() => router.push("/signup", { scroll: false }), MODAL_FADE_TRANSITION_DELAY);
  };

  useEffect(() => {
    router.prefetch("/signup");
  }, []);

  return <LoginModal opened={opened} onClose={onClose} onSwitch={onSwitch} />;
}
