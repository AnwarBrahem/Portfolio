import { NextRequest } from "next/server";

export function isAdmin(req: NextRequest): boolean {
  return req.cookies.get("admin_session")?.value === "authenticated";
}
