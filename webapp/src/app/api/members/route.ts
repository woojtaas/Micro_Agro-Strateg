import { NextResponse } from "next/server";
import { listMembers } from "@/lib/db";
import { getCurrentMember, hasAtLeastRole } from "@/lib/session";

export async function GET() {
  const member = await getCurrentMember();
  if (!member || !hasAtLeastRole(member.role, "OWNER")) {
    return NextResponse.json({ error: "Brak dostępu." }, { status: 403 });
  }
  return NextResponse.json({ members: listMembers(), currentId: member.id });
}
