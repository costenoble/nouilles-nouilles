export const metadata = { title: "Hors ligne — Nouilles Nouilles" };

export default function Offline() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-cream px-6 text-center">
      <div>
        <div className="text-5xl">🍜</div>
        <h1 className="mt-5 font-display text-3xl text-ink">Vous êtes hors ligne</h1>
        <p className="mt-3 text-ink-soft">
          Reconnectez-vous pour retrouver toute la carte et réserver votre table.
        </p>
        <a
          href="/"
          className="mt-7 inline-block rounded-full bg-chili px-6 py-3 text-sm font-semibold text-paper transition hover:bg-chili-deep"
        >
          Réessayer
        </a>
      </div>
    </main>
  );
}
