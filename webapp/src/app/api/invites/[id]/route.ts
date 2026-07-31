import { NextResponse } from "next/server";
import { revokeInvite } from "@/lib/db";
import { getCurrentMember, hasAtLeastRole } from "@/lib/session";

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/invites/[id]">
) {
  const member = await getCurrentMember();
  if (!member || !hasAtLeastRole(member.role, "OWNER")) {
    return NextResponse.json({ error: "Brak dostępu." }, { status: 403 });
  }
  const { id } = await ctx.params;
  revokeInvite(id);
  return NextResponse.json({ ok: true });
}
