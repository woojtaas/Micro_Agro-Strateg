import { NextResponse } from "next/server";
import { updateItem } from "@/lib/db";
import { getCurrentMember, hasAtLeastRole } from "@/lib/session";

export async function PATCH(
  request: Request,
  ctx: RouteContext<"/api/items/[id]">
) {
  const member = await getCurrentMember();
  if (!member) {
    return NextResponse.json({ error: "Brak dostępu." }, { status: 401 });
  }
  if (!hasAtLeastRole(member.role, "EDITOR")) {
    return NextResponse.json(
      { error: "Nie masz uprawnień do edycji." },
      { status: 403 }
    );
  }

  const { id } = await ctx.params;
  const body = await request.json().catch(() => ({}));

  const changes: { checked?: boolean; notes?: string } = {};
  if (typeof body.checked === "boolean") changes.checked = body.checked;
  if (typeof body.notes === "string") changes.notes = body.notes.slice(0, 2000);

  const item = updateItem(id, changes, member.name);
  if (!item) {
    return NextResponse.json({ error: "Nie znaleziono pozycji." }, { status: 404 });
  }

  return NextResponse.json({ item });
}
