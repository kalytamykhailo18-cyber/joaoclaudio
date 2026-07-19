import { NextResponse } from "next/server";

// Preview lock REMOVED for production (joaoclaudiomiranda.com).
// All 40 pages are public. Middleware is disabled (empty matcher → never runs).
export function middleware() {
  return NextResponse.next();
}

export const config = { matcher: [] };
