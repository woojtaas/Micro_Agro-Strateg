import { countMembers } from "@/lib/db";
import { getCurrentMember } from "@/lib/session";
import BootstrapForm from "@/components/BootstrapForm";
import NeedInvite from "@/components/NeedInvite";
import ChecklistApp from "@/components/ChecklistApp";

export default async function Home() {
  const member = await getCurrentMember();

  if (member) {
    return (
      <ChecklistApp
        initialMember={{ id: member.id, name: member.name, role: member.role }}
      />
    );
  }

  if (countMembers() === 0) {
    return <BootstrapForm />;
  }

  return <NeedInvite />;
}
