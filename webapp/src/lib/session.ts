import { cookies } from "next/headers";
import { getMemberById, touchMemberLastSeen, type Member, type Role } from "./db";

export const SESSION_COOKIE = "magro_member_id";

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
