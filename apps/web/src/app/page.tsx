import Link from 'next/link';
import { getPanelUrl, panelAccessList } from './panel-directory';
import { panels } from './panels-data';

const metrics = ['Separate URLs', 'Admin Access', 'Driver Access', 'Merchant Access'];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl space-y-10">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-500 p-10 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-100">Wollan logistics access directory</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black">All login portals cloned into separate role URLs</h1>
          <p className="mt-5 max-w-3xl text-lg text-cyan-50">
            Admin, driver, and merchant users each have a dedicated Wollan login URL with matching demo credentials for QA validation.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-300">Directory status</p>
              <h2 className="mt-2 text-2xl font-bold">{metric}</h2>
            </article>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Panel status</p>
            <h2 className="mt-2 text-3xl font-black">Separate access cards are ready to validate</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {panelAccessList.map((panel) => (
              <article key={panel.slug} className="rounded-2xl bg-slate-900 p-6 shadow-lg ring-1 ring-white/10">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
                    {panels.find((item) => item.slug === panel.slug)?.status ?? 'Ready'}
                  </span>
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-cyan-200">
                    {panel.role}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{panel.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{panel.description}</p>
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
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href={`/panels/${panel.slug}`} className="inline-flex rounded-full bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
                    View details
                  </Link>
                  <a href={panel.url} className="inline-flex rounded-full border border-cyan-300 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/10">
                    Open live URL
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
