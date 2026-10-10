import { NextResponse, type NextRequest } from "next/server";

/**
 * - /admin/* requires ADMIN_PASSWORD (HTTP Basic auth). If unset, admin is disabled (404).
 * - When PREVIEW_PASSWORD is set, the whole site requires it — useful for
 *   sharing the private prelaunch prototype with reviewers.
 * - Outside LIVE mode every response carries `X-Robots-Tag: noindex`.
 */

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function checkBasic(req: NextRequest, user: string, password: string): boolean {
  const header = req.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;
  try {
    const [u, ...rest] = atob(header.slice(6)).split(":");
    return timingSafeEqual(u ?? "", user) && timingSafeEqual(rest.join(":"), password);
  } catch {
    return false;
  }
}

function challenge(realm: string) {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${realm}", charset="UTF-8"`, "X-Robots-Tag": "noindex" },
  });
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    const pw = process.env.ADMIN_PASSWORD;
    if (!pw) return new NextResponse("Not found", { status: 404 });
    if (!checkBasic(req, process.env.ADMIN_USER ?? "admin", pw)) return challenge("Fairward Admin");
  } else if (process.env.PREVIEW_PASSWORD) {
    if (!checkBasic(req, process.env.PREVIEW_USER ?? "preview", process.env.PREVIEW_PASSWORD)) {
      return challenge("Fairward Preview");
    }
  }

  const res = NextResponse.next();
  if (process.env.NEXT_PUBLIC_SITE_MODE !== "live" || isAdmin) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
