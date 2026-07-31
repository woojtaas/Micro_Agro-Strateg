import { NextResponse } from "next/server";
import { countMembers } from "@/lib/db";
import { getCurrentMember } from "@/lib/session";

export async function GET() {
  const member = await getCurrentMember();
  return NextResponse.json({
    member: member && { id: member.id, name: member.name, role: member.role },
    needsBootstrap: countMembers() === 0,
  });
}
