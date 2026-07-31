import { NextResponse } from "next/server";
import { createInvite, listInvites } from "@/lib/db";
import { getCurrentMember, hasAtLeastRole } from "@/lib/session";

export async function GET() {
  const member = await getCurrentMember();
  if (!member || !hasAtLeastRole(member.role, "OWNER")) {
    return NextResponse.json({ error: "Brak dostępu." }, { status: 403 });
  }
  return NextResponse.json({ invites: listInvites() });
}

export async function POST(request: Request) {
  const member = await getCurrentMember();
  if (!member || !hasAtLeastRole(member.role, "OWNER")) {
    return NextResponse.json({ error: "Brak dostępu." }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const role = body.role === "EDITOR" || body.role === "VIEWER" ? body.role : null;
  if (!role) {
    return NextResponse.json({ error: "Nieprawidłowa rola." }, { status: 400 });
  }
  const label = typeof body.label === "string" ? body.label.trim().slice(0, 60) : "";

  const invite = createInvite(role, label, member.name);
  return NextResponse.json({ invite });
}
