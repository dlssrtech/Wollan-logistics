import Link from 'next/link';
import { panels } from './panels-data';

const metrics = ['Revenue', 'Bookings', 'Products', 'Influencers', 'Franchises', 'Cities', 'LTV', 'CAC'];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl space-y-10">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-500 p-10 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-100">Hyperlocal marketplace ecosystem</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black">Homesphere Home Services & Business Network</h1>
          <p className="mt-5 max-w-3xl text-lg text-cyan-50">
            A scalable service booking, product commerce, affiliate, franchise, and administration platform for multi-city operations.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-300">Dashboard</p>
              <h2 className="mt-2 text-2xl font-bold">{metric}</h2>
            </article>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Panel status</p>
            <h2 className="mt-2 text-3xl font-black">All role panels are linked and ready to validate</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {panels.map((panel) => (
              <Link
                key={panel.slug}
                className="group rounded-2xl bg-slate-900 p-6 shadow-lg ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-slate-800 hover:ring-cyan-300/60"
                href={`/panels/${panel.slug}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
                    {panel.status}
                  </span>
                  <span aria-hidden="true" className="text-cyan-300 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{panel.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{panel.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
