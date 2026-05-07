import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const COOKIE_NAME = "admin_session";
const COOKIE_VALUE = "authenticated";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}

export function isAdmin(req: NextRequest): boolean {
  return req.cookies.get(COOKIE_NAME)?.value === COOKIE_VALUE;
}
