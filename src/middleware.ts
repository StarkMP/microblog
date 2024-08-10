import { refresh } from "@app/actions/auth";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "@constants";
import { type NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/me"];

const unauthorizedRedirectRoute = "/login";

export async function middleware(request: NextRequest): Promise<NextResponse | void> {
  const pathname = request.nextUrl.pathname;
  const hasAccessToken = request.cookies.has(ACCESS_TOKEN_COOKIE_NAME);
  const hasRefreshToken = request.cookies.has(REFRESH_TOKEN_COOKIE_NAME);
  const hasAnyToken = hasAccessToken || hasRefreshToken;
  const unauthorizedRedirectResponse = NextResponse.redirect(
    new URL(unauthorizedRedirectRoute, request.url)
  );

  for (const privateRoute of privateRoutes) {
    if (!hasAnyToken && pathname.startsWith(privateRoute)) {
      return unauthorizedRedirectResponse;
    }
  }

  if (!hasAccessToken && hasRefreshToken) {
    const response = NextResponse.next();
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

    try {
      await refresh(refreshToken as string, response.cookies);
    } catch {
      return unauthorizedRedirectResponse;
    }

    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
