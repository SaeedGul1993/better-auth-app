import { NextRequest, NextResponse } from "next/server";
import { routes } from "./routes"; // ✅ removed space

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  let isLoggedIn = false;
  try {
    const sessionRes = await fetch(
      `${req.nextUrl.origin}/api/auth/get-session`,
      {
        headers: req.headers,
        cache: "no-store",
      },
    );

    if (sessionRes.ok) {
      const text = await sessionRes.text();
      if (text) {
        const session = JSON.parse(text);
        isLoggedIn = !!session?.user;
      }
    }
  } catch {
    isLoggedIn = false;
  }

  const isProtected = routes.protected.some((route) => pathname === route);
  const isAuth = routes.auth.some((route) => pathname === route);

  if (isAuth && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // ✅ removed api exclusion
  ],
};
