import type { JSX, ReactNode } from "react";

export default function FeedLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <main>
      <nav>navigation</nav>

      {children}
    </main>
  );
}
