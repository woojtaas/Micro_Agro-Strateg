"use client";

import { useEffect, useRef, useState } from "react";
import type { Item } from "@/lib/types";

export default function ItemRow({
  item,
  canEdit,
  onToggle,
  onNotesChange,
}: {
  item: Item;
  canEdit: boolean;
  onToggle: (item: Item) => void;
  onNotesChange: (item: Item, notes: string) => void;
}) {
  const [notes, setNotes] = useState(item.notes);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isEditingRef = useRef(false);

  useEffect(() => {
    if (!isEditingRef.current) {
      setNotes(item.notes);
    }
  }, [item.notes]);

  function handleNotesInput(value: string) {
    isEditingRef.current = true;
    setNotes(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      isEditingRef.current = false;
      onNotesChange(item, value);
    }, 600);
  }

  return (
    <li
      className={`flex flex-col gap-1.5 rounded-lg px-3 py-2.5 transition sm:flex-row sm:items-start sm:gap-3 ${
        item.checked ? "bg-emerald-50/60" : "hover:bg-slate-50"
      }`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={item.checked}
        disabled={!canEdit}
        onClick={() => onToggle(item)}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
          item.checked
            ? "border-emerald-600 bg-emerald-600 text-white"
            : "border-slate-300 bg-white"
        } ${canEdit ? "cursor-pointer" : "cursor-not-allowed opacity-70"}`}
      >
        {item.checked && (
          <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
            <path
              d="M4 10.5l3.5 3.5L16 6"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium leading-snug ${
            item.checked ? "text-slate-400 line-through" : "text-slate-800"
          }`}
        >
          {item.title}
        </p>
        {item.details && (
          <p className="mt-0.5 text-xs text-slate-400">{item.details}</p>
        )}

        {canEdit ? (
          <input
            value={notes}
            onChange={(e) => handleNotesInput(e.target.value)}
            placeholder="Dodaj notatkę…"
            className="mt-1.5 w-full max-w-md rounded-md border border-transparent bg-slate-100/70 px-2 py-1 text-xs text-slate-600 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />
        ) : (
          notes && (
            <p className="mt-1.5 rounded-md bg-slate-100/70 px-2 py-1 text-xs text-slate-600">
              {notes}
            </p>
          )
        )}
      </div>

      {item.checked && item.updatedByName && (
        <span className="shrink-0 self-start rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-700 sm:mt-0.5">
          ✓ {item.updatedByName}
        </span>
      )}
    </li>
  );
}
