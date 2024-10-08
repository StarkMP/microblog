"use client";

import { auth } from "@app/actions/auth";
import { signUp } from "@app/actions/signup";
import { useFetch } from "@hooks";
import {
  Anchor,
  Button,
  Card,
  Checkbox,
  Group,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { SignUpData } from "@typings/auth";
import { type JSX, useState } from "react";

export const SignUpForm = ({ onSwitch }: { onSwitch: () => void }): JSX.Element => {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const [fetchSignUp] = useFetch(signUp);
  const [fetchAuth] = useFetch(auth);

  const form = useForm({
    mode: "uncontrolled",
    validateInputOnBlur: true,
    clearInputErrorOnChange: true,
    initialValues: { email: "", username: "", password: "", confirmPassword: "", terms: false },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      username: (value) => (value.length < 2 ? "Username must have at least 2 letters" : null),
      password: (value) => (value.length < 6 ? "Password must have at least 6 letters" : null),
      confirmPassword: (value, values) => {
        if (value !== values.password) {
          return "Passwords do not match";
        }

        if (!value) {
          return "Empty field";
        }

        return null;
      },
      terms: (value) => (!value ? "You should accept the privacy policy" : null),
    },
  });

  const registerUser = async ({ email, username, password }: SignUpData): Promise<void> => {
    setFetching(true);

    try {
      await fetchSignUp({
        email,
        username,
        password,
      });

      await fetchAuth({ username, password });

      window.location.reload();
    } catch (err) {
      setError(true);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = (values: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
  }): void => {
    registerUser({ email: values.email, username: values.username, password: values.password });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        mb="md"
        disabled={fetching}
        key={form.key("email")}
        {...form.getInputProps("email")}
      />

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

      <PasswordInput
        withAsterisk
        label="Confirm password"
        mb="md"
        disabled={fetching}
        key={form.key("confirmPassword")}
        {...form.getInputProps("confirmPassword")}
      />

      <Checkbox
        label={
          <>
            I agree with{" "}
            <Anchor href="https://youtu.be/dQw4w9WgXcQ" target="_blank" inherit>
              privacy policy
            </Anchor>
          </>
        }
        mb="md"
        disabled={fetching}
        key={form.key("terms")}
        {...form.getInputProps("terms", { type: "checkbox" })}
      />

      <Card mb="md" padding="sm">
        <Text fz="sm" c="dimmed">
          It&apos;s fake registration form. You can pass any credentials to simulate sign up with
          mocked data from{" "}
          <Anchor fz="sm" href="https://dummyjson.com/docs/auth" target="_blank">
            DummyJSON Auth
          </Anchor>
          .
        </Text>
      </Card>

      <Group justify="space-between">
        <Anchor fz="xs" onClick={onSwitch}>
          Already have an account? Sign In
        </Anchor>
        <Button type="submit" loading={fetching}>
          Submit
        </Button>
      </Group>

      {error && (
        <Text fz="sm" c="red">
          Error: Something went wrong
        </Text>
      )}
    </form>
  );
};
