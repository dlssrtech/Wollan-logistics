import Link from 'next/link';
import { panels } from './panels-data';
const panels = [
  'Customer App',
  'Service Provider App',
  'Shop Owner Panel',
  'Influencer Panel',
  'Franchise Panel',
  'City Manager Panel',
  'Support Team Panel',
  'Super Admin Panel',
];
import Link from 'next/link';
import { getPanelUrl, panelAccessList } from './panel-directory';

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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {panels.map((panel) => (
            <article key={panel} className="rounded-2xl bg-slate-900 p-6 shadow-lg ring-1 ring-white/10">
              <h3 className="text-xl font-semibold">{panel}</h3>
              <p className="mt-3 text-sm text-slate-400">Role-aware workflows, analytics, wallet, notifications, and audit-ready operations.</p>
          {panelAccessList.map((panel) => (
            <article key={panel.slug} className="rounded-2xl bg-slate-900 p-6 shadow-lg ring-1 ring-white/10">
              <h3 className="text-xl font-semibold">{panel.name}</h3>
              <p className="mt-3 text-sm text-slate-400">{panel.description}</p>
              <dl className="mt-5 space-y-2 text-xs text-slate-300">
                <div>
                  <dt className="font-semibold uppercase tracking-wide text-slate-500">URL</dt>
                  <dd className="mt-1 break-all font-mono text-cyan-200">{getPanelUrl(panel.slug)}</dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase tracking-wide text-slate-500">Login</dt>
                  <dd className="mt-1 break-all font-mono text-cyan-200">{panel.email}</dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase tracking-wide text-slate-500">Password</dt>
                  <dd className="mt-1 font-mono text-cyan-200">{panel.password}</dd>
                </div>
              </dl>
              <Link
                href={`/panels/${panel.slug}`}
                className="mt-5 inline-flex rounded-full bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                Open panel
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
