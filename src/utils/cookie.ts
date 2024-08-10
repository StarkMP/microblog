import { headers } from "next/headers";
import setCookie from "set-cookie-parser";

type SetCookies = { [name: string]: SetCookie };

type SetCookie = { name: string; value: string };

type HeadersSetCookie = {
  get: (name: string) => SetCookie | void;
  has: (name: string) => boolean;
};

export const headersSetCookie = (): HeadersSetCookie => {
  const parsed = setCookie.parse(headers().get("set-cookie") || "");
  const mapped = parsed.reduce((memo: SetCookies, current) => {
    const { name, value } = current;

    memo[name] = { name, value };

    return memo;
  }, {});

  const get = (name: string): SetCookie | void => {
    return mapped[name];
  };

  const has = (name: string): boolean => !!get(name);

  return { get, has };
};
