import { NextResponse, type NextRequest } from "next/server";
import { isLocale, matchLocale } from "@/lib/i18n";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = pathname
    .split("/")
    .some((segment) => segment.length > 0 && isLocale(segment));
  if (hasLocale) return NextResponse.next();

  const locale = matchLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next internals and files with an extension.
  matcher: ["/((?!_next|.*\\.).*)"],
};
