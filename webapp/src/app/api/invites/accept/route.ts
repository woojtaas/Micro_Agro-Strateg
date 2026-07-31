import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createMember, getInviteByToken, incrementInviteUse } from "@/lib/db";
import {
  SESSION_COOKIE,
  getCurrentMember,
  sessionCookieOptions,
} from "@/lib/session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const token = typeof body.token === "string" ? body.token : "";
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 60) : "";

  const invite = getInviteByToken(token);
  if (!invite || invite.revoked) {
    return NextResponse.json({ error: "Zaproszenie jest nieprawidłowe lub wygasło." }, { status: 404 });
  }

  const existing = await getCurrentMember();
  if (existing) {
    return NextResponse.json({
      member: { id: existing.id, name: existing.name, role: existing.role },
      alreadyMember: true,
    });
  }

  if (!name) {
    return NextResponse.json({ error: "Podaj swoje imię." }, { status: 400 });
  }

  const member = createMember(name, invite.role);
  incrementInviteUse(invite.id);

  const store = await cookies();
  store.set(SESSION_COOKIE, member.id, sessionCookieOptions(request));

  return NextResponse.json({
    member: { id: member.id, name: member.name, role: member.role },
    alreadyMember: false,
  });
}
