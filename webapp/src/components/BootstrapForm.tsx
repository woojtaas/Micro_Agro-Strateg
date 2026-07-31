"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BootstrapForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/bootstrap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Coś poszło nie tak.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Nie udało się połączyć z serwerem.");
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">
          Witaj! Zacznijmy listę
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Ta lista nie ma jeszcze właściciela. Podaj swoje imię, aby założyć
          listę — będziesz mieć pełne uprawnienia i będziesz mógł zapraszać
          kolejne osoby.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Twoje imię"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            maxLength={60}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Tworzenie…" : "Utwórz listę"}
          </button>
        </form>
      </div>
    </main>
  );
}
