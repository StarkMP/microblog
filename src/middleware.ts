import { refresh } from "@app/actions/auth";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "@constants";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse | void> {
  const hasAccessToken = request.cookies.has(ACCESS_TOKEN_COOKIE_NAME);
  const hasRefreshToken = request.cookies.has(REFRESH_TOKEN_COOKIE_NAME);

  if (!hasAccessToken && !hasRefreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!hasAccessToken && hasRefreshToken) {
    const response = NextResponse.next();
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

    try {
      await refresh(refreshToken as string, response.cookies);
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return response;
  }
}

export const config = {
  matcher: ["/me"],
};
