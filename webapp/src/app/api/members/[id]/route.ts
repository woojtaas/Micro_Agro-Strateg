import { NextResponse } from "next/server";
import { countOwners, deleteMember, updateMemberRole } from "@/lib/db";
import { getCurrentMember, hasAtLeastRole } from "@/lib/session";

export async function PATCH(
  request: Request,
  ctx: RouteContext<"/api/members/[id]">
) {
  const member = await getCurrentMember();
  if (!member || !hasAtLeastRole(member.role, "OWNER")) {
    return NextResponse.json({ error: "Brak dostępu." }, { status: 403 });
  }

  const { id } = await ctx.params;
  const body = await request.json().catch(() => ({}));
  const role = body.role;
  if (role !== "OWNER" && role !== "EDITOR" && role !== "VIEWER") {
    return NextResponse.json({ error: "Nieprawidłowa rola." }, { status: 400 });
  }

  if (id === member.id && role !== "OWNER" && countOwners() <= 1) {
    return NextResponse.json(
      { error: "Nie możesz odebrać sobie roli właściciela — jesteś jedynym właścicielem." },
      { status: 400 }
    );
  }

  const updated = updateMemberRole(id, role);
  if (!updated) {
    return NextResponse.json({ error: "Nie znaleziono użytkownika." }, { status: 404 });
  }
  return NextResponse.json({ member: updated });
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/members/[id]">
) {
  const member = await getCurrentMember();
  if (!member || !hasAtLeastRole(member.role, "OWNER")) {
    return NextResponse.json({ error: "Brak dostępu." }, { status: 403 });
  }

  const { id } = await ctx.params;
  if (id === member.id) {
    return NextResponse.json(
      { error: "Nie możesz usunąć samego siebie." },
      { status: 400 }
    );
  }

  deleteMember(id);
  return NextResponse.json({ ok: true });
}
