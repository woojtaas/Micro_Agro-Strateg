import { cookies } from "next/headers";
import { getMemberById, touchMemberLastSeen, type Member, type Role } from "./db";

export const SESSION_COOKIE = "magro_member_id";

// Browsers drop `Secure` cookies on plain-HTTP origins other than localhost, so
// flagging by NODE_ENV alone locks users out of a LAN/self-hosted deployment.
// Trust the proxy's forwarded protocol first, then the request's own scheme.
export function isSecureRequest(request: Request): boolean {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  if (forwardedProto) {
    return forwardedProto.split(",")[0].trim().toLowerCase() === "https";
  }
  return new URL(request.url).protocol === "https:";
}

export function sessionCookieOptions(request: Request) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isSecureRequest(request),
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  };
}

export async function getCurrentMember(): Promise<Member | null> {
  const store = await cookies();
  const memberId = store.get(SESSION_COOKIE)?.value;
  if (!memberId) return null;
  const member = getMemberById(memberId);
  if (!member) return null;
  touchMemberLastSeen(member.id);
  return member;
}

export function roleRank(role: Role): number {
  if (role === "OWNER") return 3;
  if (role === "EDITOR") return 2;
  return 1;
}

export function hasAtLeastRole(role: Role, minimum: Role): boolean {
  return roleRank(role) >= roleRank(minimum);
}
