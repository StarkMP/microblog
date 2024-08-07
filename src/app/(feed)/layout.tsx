"use client";

import { getProfile } from "@app/actions/private/user";
import { Container, Grid } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { updateUserData } from "@store/reducers/user";
import { type JSX, type ReactNode, useEffect } from "react";

import { Header, Navigation, Rightbar } from "./_components";

export default function FeedLayout({
  children,
  auth,
}: {
  children: ReactNode;
  auth: ReactNode;
}): JSX.Element {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const dispatch = useAppDispatch();

  const loadUserData = async (): Promise<void> => {
    const { username, email } = await getProfile();

    dispatch(updateUserData({ username, email }));
  };

  useEffect(() => {
    if (isAuth) {
      loadUserData();
    }
  }, []);

  return (
    <>
      <Header />
      <Container size="xl" pb="md" pt="md">
        <Grid>
          <Grid.Col span={3}>
            <Navigation />
          </Grid.Col>
          <Grid.Col span={6}>{children}</Grid.Col>
          <Grid.Col span={3}>
            <Rightbar />
          </Grid.Col>
        </Grid>
      </Container>

      {auth}
    </>
  );
}
