"use client";

import { useAppSelector } from "@store/hooks";
import type { JSX } from "react";

export default function ProfilePage(): JSX.Element {
  const user = useAppSelector((state) => state.user);

  if (!user.data) {
    return <p>Loading...</p>;
  }

  return <p>Profile page - {user.data.username}</p>;
}
