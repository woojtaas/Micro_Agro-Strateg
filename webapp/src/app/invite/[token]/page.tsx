import { redirect } from "next/navigation";
import { getInviteByToken } from "@/lib/db";
import { getCurrentMember } from "@/lib/session";
import { ROLE_LABELS } from "@/lib/types";
import AcceptInviteForm from "@/components/AcceptInviteForm";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const invite = getInviteByToken(token);

  const existingMember = await getCurrentMember();
  if (existingMember) {
    redirect("/");
  }

  if (!invite || invite.revoked) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">
            Link jest nieprawidłowy
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            To zaproszenie zostało odwołane lub nie istnieje. Poproś o nowy
            link.
          </p>
        </div>
      </main>
    );
  }

  return (
    <AcceptInviteForm
      token={token}
      roleLabel={ROLE_LABELS[invite.role]}
      inviteLabel={invite.label}
    />
  );
}
