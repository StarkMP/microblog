import "@mantine/core/styles.css";

import StoreProvider from "@app/store-provider";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "@constants";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@theme";
import { headersSetCookie } from "@utils/cookie";
import { cookies } from "next/headers";
import type { JSX, ReactNode } from "react";

export const metadata = {
  title: "MicroBlog - Share your outlook and knowledges online",
  description: "MicroBlog is a paltform to share any information between people in internet.",
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  const cookieStore = cookies();
  const hasAccessToken =
    cookieStore.has(ACCESS_TOKEN_COOKIE_NAME) || headersSetCookie().has(ACCESS_TOKEN_COOKIE_NAME);

  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <ColorSchemeScript defaultColorScheme="dark" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <StoreProvider
          isAuth={hasAccessToken}
          refreshToken={cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value}
        >
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            {children}
          </MantineProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
