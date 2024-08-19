"use client";

import { addCommentToPost } from "@app/actions/private/feed";
import { useAuthModals } from "@context";
import { useFetch } from "@hooks";
import { Anchor, Button, Group, Stack, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAppSelector } from "@store/hooks";
import { APICommentModel } from "@typings/api";
import { type JSX, useState } from "react";

type CommentFormProps = {
  postId: number;
  addCommentToList: (data: APICommentModel) => void;
};

export const CommentForm = ({ postId, addCommentToList }: CommentFormProps): JSX.Element => {
  const [showButtons, setShowButtons] = useState(false);
  const [fetching, setFetching] = useState(false);
  const user = useAppSelector((state) => state.user);
  const { openLoginModal } = useAuthModals();
  const [fetchAddComment] = useFetch(addCommentToPost);

  const form = useForm({
    mode: "uncontrolled",
    validateInputOnBlur: true,
    clearInputErrorOnChange: true,
    initialValues: { comment: "" },
    validate: {
      comment: (value) => (value.length < 2 ? "Must have at least 2 letters" : null),
    },
  });

  const addComment = async (comment: string): Promise<void> => {
    setFetching(true);

    try {
      const data = await fetchAddComment({ userId: user.data.id, postId, body: comment });

      // we need to replace the id because DummyJSON every time send the same id for us
      addCommentToList({ ...data, id: Date.now() });

      form.reset();
      onTextareaBlur();
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = ({ comment }: { comment: string }): void => {
    addComment(comment);
  };

  const onTextareaFocus = (): void => {
    setShowButtons(true);
  };

  const onTextareaBlur = (): void => {
    const formValues = form.getValues();

    if (!formValues.comment) {
      setShowButtons(false);
    }
  };

  if (!user.isAuth) {
    return (
      <Text c="dimmed" fz="sm">
        You need to{" "}
        <Anchor inherit component="button" onClick={openLoginModal}>
          sign in
        </Anchor>{" "}
        to write comments below posts.
      </Text>
    );
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="sm">
        <Textarea
          size="md"
          placeholder="Type your comment..."
          key={form.key("comment")}
          {...form.getInputProps("comment")}
          onFocus={onTextareaFocus}
          onBlur={onTextareaBlur}
        />
        {showButtons && (
          <Group gap="xs">
            <Button loading={fetching} type="submit">
              Submit
            </Button>
          </Group>
        )}
      </Stack>
    </form>
  );
};
