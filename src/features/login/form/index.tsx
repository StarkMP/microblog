"use client";

import { auth } from "@app/actions/auth";
import { Anchor, Button, Card, Group, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAppDispatch } from "@store/hooks";
import { login, updateUserData } from "@store/reducers/user";
import { AuthData } from "@typings/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type JSX, useState } from "react";

export const LoginForm = (): JSX.Element => {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    validateInputOnBlur: true,
    clearInputErrorOnChange: true,
    initialValues: { email: "", username: "", password: "", confirmPassword: "", terms: false },
    validate: {
      username: (value) => (value.length < 2 ? "Username must have at least 2 letters" : null),
      password: (value) => (value.length < 6 ? "Password must have at least 6 letters" : null),
    },
  });

  const loginUser = async ({ username, password }: AuthData): Promise<void> => {
    setFetching(true);

    try {
      const user = await auth({ username, password });

      router.push("/");
      router.refresh();

      dispatch(login());
      dispatch(updateUserData({ username: user.username, email: user.email }));
    } catch (err) {
      setError(true);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = (values: { username: string; password: string }): void => {
    loginUser({ username: values.username, password: values.password });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="Username"
        mb="md"
        disabled={fetching}
        key={form.key("username")}
        {...form.getInputProps("username")}
      />

      <PasswordInput
        withAsterisk
        label="Password"
        mb="md"
        disabled={fetching}
        key={form.key("password")}
        {...form.getInputProps("password")}
      />

      <Card mb="md" padding="sm">
        <Text fz="sm" c="dimmed">
          It&apos;s fake login form. You can pass any credentials to simulate sign in with mocked
          data from{" "}
          <Anchor fz="sm" href="https://dummyjson.com/docs/auth" target="_blank">
            DummyJSON Auth
          </Anchor>
          .
        </Text>
      </Card>

      <Group justify="space-between">
        <Anchor fz="xs" component={Link} scroll={false} href="/signup">
          Don&apos;t have an account? Register now
        </Anchor>
        <Button type="submit" loading={fetching}>
          Sign In
        </Button>
      </Group>

      {error && (
        <Text ta="center" c="red">
          An error occured
        </Text>
      )}
    </form>
  );
};
