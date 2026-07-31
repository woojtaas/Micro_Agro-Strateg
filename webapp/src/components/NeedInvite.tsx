export default function NeedInvite() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">
          Ta lista jest prywatna
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Poproś osobę, która zarządza listą, o link z zaproszeniem, aby
          uzyskać dostęp.
        </p>
      </div>
    </main>
  );
}
