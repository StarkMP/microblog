"use client";

import { SignUpModal } from "@features";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import type { JSX } from "react";

export default function SignUpPage(): JSX.Element {
  const [opened, { close }] = useDisclosure(true);
  const router = useRouter();

  const onClose = (): void => {
    close();
    router.push("/", { scroll: false });
  };

  return <SignUpModal opened={opened} onClose={onClose} />;
}
