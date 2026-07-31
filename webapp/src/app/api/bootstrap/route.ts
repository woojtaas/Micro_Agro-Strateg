import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { countMembers, createMember } from "@/lib/db";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/session";

export async function POST(request: Request) {
  if (countMembers() > 0) {
    return NextResponse.json(
      { error: "Lista ma już właściciela." },
      { status: 409 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 60) : "";
  if (!name) {
    return NextResponse.json({ error: "Podaj swoje imię." }, { status: 400 });
  }

  const member = createMember(name, "OWNER");
  const store = await cookies();
  store.set(SESSION_COOKIE, member.id, sessionCookieOptions(request));

  return NextResponse.json({ member: { id: member.id, name: member.name, role: member.role } });
}
