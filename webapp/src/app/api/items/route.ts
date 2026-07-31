import { NextResponse } from "next/server";
import { listItems } from "@/lib/db";
import { getCurrentMember } from "@/lib/session";

export async function GET() {
  const member = await getCurrentMember();
  if (!member) {
    return NextResponse.json({ error: "Brak dostępu." }, { status: 401 });
  }
  return NextResponse.json({ items: listItems() });
}
