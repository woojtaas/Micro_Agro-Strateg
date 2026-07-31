"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Item, Role } from "@/lib/types";
import { ROLE_LABELS } from "@/lib/types";
import ItemRow from "./ItemRow";
import ManageUsersModal from "./ManageUsersModal";

type CurrentMember = { id: string; name: string; role: Role };

const POLL_INTERVAL_MS = 4000;

export default function ChecklistApp({
  initialMember,
}: {
  initialMember: CurrentMember;
}) {
  const [member] = useState(initialMember);
  const [items, setItems] = useState<Item[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [showManage, setShowManage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const editingItemIds = useRef<Set<string>>(new Set());

  const canEdit = member.role === "OWNER" || member.role === "EDITOR";
  const isOwner = member.role === "OWNER";

  async function fetchItems() {
    try {
      const res = await fetch("/api/items", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setItems((prev) => {
        if (editingItemIds.current.size === 0) return data.items;
        return (data.items as Item[]).map((incoming) =>
          editingItemIds.current.has(incoming.id)
            ? prev.find((p) => p.id === incoming.id) ?? incoming
            : incoming
        );
      });
      setLoaded(true);
    } catch {
      // ignore transient network errors on poll
    }
  }

  useEffect(() => {
    fetchItems();
    const interval = setInterval(fetchItems, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  async function toggleChecked(item: Item) {
    if (!canEdit) return;
    const nextChecked = !item.checked;
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, checked: nextChecked } : it))
    );
    try {
      const res = await fetch(`/api/items/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checked: nextChecked }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setItems((prev) => prev.map((it) => (it.id === item.id ? data.item : it)));
    } catch {
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, checked: item.checked } : it))
      );
      setError("Nie udało się zapisać zmiany. Spróbuj ponownie.");
    }
  }

  async function updateNotes(item: Item, notes: string) {
    if (!canEdit) return;
    editingItemIds.current.add(item.id);
    setItems((prev) => prev.map((it) => (it.id === item.id ? { ...it, notes } : it)));
    try {
      const res = await fetch(`/api/items/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setItems((prev) => prev.map((it) => (it.id === item.id ? data.item : it)));
    } catch {
      setError("Nie udało się zapisać notatki. Spróbuj ponownie.");
    } finally {
      editingItemIds.current.delete(item.id);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      [it.title, it.details, it.notes, it.category, it.subcategory]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [items, query]);

  const grouped = useMemo(() => {
    const categories = new Map<
      string,
      { subcats: Map<string, Item[]>; order: number }
    >();
    filtered.forEach((item, index) => {
      if (!categories.has(item.category)) {
        categories.set(item.category, { subcats: new Map(), order: index });
      }
      const cat = categories.get(item.category)!;
      if (!cat.subcats.has(item.subcategory)) {
        cat.subcats.set(item.subcategory, []);
      }
      cat.subcats.get(item.subcategory)!.push(item);
    });
    return Array.from(categories.entries());
  }, [filtered]);

  const totalChecked = items.filter((i) => i.checked).length;
  const total = items.length;
  const isFiltering = query.trim().length > 0;

  function toggleCollapsed(category: string) {
    setCollapsed((prev) => ({ ...prev, [category]: !prev[category] }));
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-3 pb-16 pt-6 sm:px-6">
      <header className="mb-5 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Lista przygotowań
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              {total > 0 ? `${totalChecked} z ${total} zaznaczone` : "Ładowanie…"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
              {member.name} · {ROLE_LABELS[member.role]}
            </span>
            {isOwner && (
              <button
                onClick={() => setShowManage(true)}
                className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-700"
              >
                Zarządzaj
              </button>
            )}
          </div>
        </div>

        {total > 0 && (
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${(totalChecked / total) * 100}%` }}
            />
          </div>
        )}

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Szukaj przedmiotu, kategorii lub notatki…"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        {error && (
          <div className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="font-medium">
              ✕
            </button>
          </div>
        )}
      </header>

      {loaded && grouped.length === 0 && (
        <p className="py-10 text-center text-sm text-slate-400">
          Brak wyników dla &quot;{query}&quot;.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {grouped.map(([category, { subcats }]) => {
          const catItems = Array.from(subcats.values()).flat();
          const catChecked = catItems.filter((i) => i.checked).length;
          const isCollapsed = !isFiltering && collapsed[category];
          return (
            <section
              key={category}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <button
                onClick={() => toggleCollapsed(category)}
                className="flex w-full items-center justify-between gap-3 bg-slate-900 px-4 py-3 text-left"
              >
                <span className="text-sm font-semibold text-white">
                  {category}
                </span>
                <span className="flex items-center gap-2">
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs font-medium text-white">
                    {catChecked}/{catItems.length}
                  </span>
                  <svg
                    viewBox="0 0 20 20"
                    className={`h-4 w-4 text-white/70 transition-transform ${
                      isCollapsed ? "-rotate-90" : ""
                    }`}
                    fill="none"
                  >
                    <path
                      d="M5 7.5l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              {!isCollapsed && (
                <div className="divide-y divide-slate-100 px-2 py-2">
                  {Array.from(subcats.entries()).map(([subcategory, subItems]) => (
                    <div key={subcategory} className="py-2">
                      <h3 className="px-1.5 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {subcategory}
                      </h3>
                      <ul className="flex flex-col gap-0.5">
                        {subItems.map((item) => (
                          <ItemRow
                            key={item.id}
                            item={item}
                            canEdit={canEdit}
                            onToggle={toggleChecked}
                            onNotesChange={updateNotes}
                          />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {showManage && (
        <ManageUsersModal onClose={() => setShowManage(false)} />
      )}
    </main>
  );
}
