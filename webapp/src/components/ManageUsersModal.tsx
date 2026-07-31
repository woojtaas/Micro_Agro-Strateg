"use client";

import { useEffect, useState } from "react";
import type { Invite, Member, Role } from "@/lib/types";
import { ROLE_LABELS } from "@/lib/types";

export default function ManageUsersModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"invites" | "members">("invites");
  const [members, setMembers] = useState<Member[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<Role>("EDITOR");
  const [newLabel, setNewLabel] = useState("");
  const [creating, setCreating] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadAll() {
      const [membersRes, invitesRes] = await Promise.all([
        fetch("/api/members", { cache: "no-store" }),
        fetch("/api/invites", { cache: "no-store" }),
      ]);
      if (cancelled) return;
      if (membersRes.ok) {
        const data = await membersRes.json();
        if (cancelled) return;
        setMembers(data.members);
        setCurrentId(data.currentId);
      }
      if (invitesRes.ok) {
        const data = await invitesRes.json();
        if (cancelled) return;
        setInvites(data.invites);
      }
    }
    loadAll();
    return () => {
      cancelled = true;
    };
  }, []);

  function inviteUrl(token: string) {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/invite/${token}`;
  }

  async function createInvite() {
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole, label: newLabel }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Nie udało się utworzyć linku.");
        return;
      }
      setInvites((prev) => [data.invite, ...prev]);
      setNewLabel("");
      copyLink(data.invite.token);
    } finally {
      setCreating(false);
    }
  }

  async function copyLink(token: string) {
    const url = inviteUrl(token);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 2000);
    } catch {
      // clipboard may be unavailable; user can still select the text field
    }
  }

  async function revokeInvite(id: string) {
    await fetch(`/api/invites/${id}`, { method: "DELETE" });
    setInvites((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, revoked: true } : inv))
    );
  }

  async function changeRole(id: string, role: Role) {
    setError(null);
    const res = await fetch(`/api/members/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Nie udało się zmienić roli.");
      return;
    }
    setMembers((prev) => prev.map((m) => (m.id === id ? data.member : m)));
  }

  async function removeMember(id: string) {
    setError(null);
    const res = await fetch(`/api/members/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Nie udało się usunąć użytkownika.");
      return;
    }
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 px-0 py-0 sm:items-center sm:px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:max-w-lg sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Zarządzanie dostępem
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <div className="flex border-b border-slate-100 px-5">
          <button
            onClick={() => setTab("invites")}
            className={`border-b-2 px-3 py-2 text-sm font-medium ${
              tab === "invites"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-400"
            }`}
          >
            Linki z zaproszeniem
          </button>
          <button
            onClick={() => setTab("members")}
            className={`border-b-2 px-3 py-2 text-sm font-medium ${
              tab === "members"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-400"
            }`}
          >
            Użytkownicy ({members.length})
          </button>
        </div>

        {error && (
          <div className="mx-5 mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {tab === "invites" ? (
            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="mb-2 text-xs font-medium text-slate-500">
                  Nowy link zaproszenia
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as Role)}
                    className="rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
                  >
                    <option value="EDITOR">Może edytować</option>
                    <option value="VIEWER">Tylko podgląd</option>
                  </select>
                  <input
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="Etykieta (opcjonalnie, np. imię)"
                    className="flex-1 rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
                  />
                  <button
                    onClick={createInvite}
                    disabled={creating}
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                  >
                    Utwórz
                  </button>
                </div>
              </div>

              <ul className="flex flex-col gap-2">
                {invites.length === 0 && (
                  <p className="text-sm text-slate-400">Brak utworzonych linków.</p>
                )}
                {invites.map((inv) => (
                  <li
                    key={inv.id}
                    className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 ${
                      inv.revoked
                        ? "border-slate-100 bg-slate-50 opacity-60"
                        : "border-slate-200"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {inv.label || "Bez etykiety"} ·{" "}
                        <span className="font-normal text-slate-500">
                          {ROLE_LABELS[inv.role]}
                        </span>
                      </p>
                      <p className="text-xs text-slate-400">
                        {inv.revoked
                          ? "Odwołany"
                          : `Użyto ${inv.usesCount} raz(y)`}
                      </p>
                    </div>
                    {!inv.revoked && (
                      <div className="flex shrink-0 items-center gap-1.5">
                        <button
                          onClick={() => copyLink(inv.token)}
                          className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
                        >
                          {copiedToken === inv.token ? "Skopiowano!" : "Kopiuj link"}
                        </button>
                        <button
                          onClick={() => revokeInvite(inv.id)}
                          className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Odwołaj
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {members.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {m.name} {m.id === currentId && "(Ty)"}
                    </p>
                    <p className="text-xs text-slate-400">
                      Dołączył {new Date(m.createdAt).toLocaleDateString("pl-PL")}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <select
                      value={m.role}
                      onChange={(e) => changeRole(m.id, e.target.value as Role)}
                      className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
                    >
                      <option value="OWNER">Właściciel</option>
                      <option value="EDITOR">Edytor</option>
                      <option value="VIEWER">Podgląd</option>
                    </select>
                    {m.id !== currentId && (
                      <button
                        onClick={() => removeMember(m.id)}
                        className="rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Usuń
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
