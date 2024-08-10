import { getProfile } from "@app/actions/private/user";
import type { JSX } from "react";

export default async function ProfilePage(): Promise<JSX.Element> {
  const user = await getProfile();

  return <p>Profile page - {user.username}</p>;
}
