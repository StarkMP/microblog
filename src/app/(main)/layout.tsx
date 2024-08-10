import { Container } from "@mantine/core";
import type { JSX, ReactNode } from "react";

import { Header } from "./_components";

export default function MainLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <>
      <Header />
      <Container size="xl" pb="md" pt="md">
        {children}
      </Container>
    </>
  );
}
