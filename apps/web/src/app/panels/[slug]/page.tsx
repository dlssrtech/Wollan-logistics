import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findPanelBySlug, getPanelUrl, panelAccessList } from '../../panel-directory';
import { getPanel } from '../../panels-data';

type PanelPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return panelAccessList.map((panel) => ({ slug: panel.slug }));
}

export async function generateMetadata({ params }: PanelPageProps) {
  const { slug } = await params;
  const panel = findPanelBySlug(slug);

  if (!panel) {
    return { title: 'Panel not found | Wollan Logistics' };
  }

  return {
    title: `${panel.name} | Wollan Logistics`,
    description: `${panel.name} access details and demo credentials`,
  };
}

export default async function PanelPage({ params }: PanelPageProps) {
  const { slug } = await params;
  const accessResult = findPanelBySlug(slug);
  const panelResult = getPanel(slug);

  if (!accessResult || !panelResult) {
    notFound();
  }

  const access = accessResult;
  const panel = panelResult;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl space-y-8">
        <Link className="inline-flex text-sm font-semibold text-cyan-300 hover:text-cyan-100" href="/">
          ← Back to all panels
        </Link>

        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-sky-600 to-cyan-500 p-8 shadow-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-cyan-50">
              {panel.status}
            </span>
            <span className="rounded-full bg-slate-950/30 px-3 py-1 text-sm text-cyan-50">{panel.audience}</span>
          </div>
          <h1 className="mt-5 text-4xl font-black md:text-6xl">{panel.title}</h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-cyan-50">{panel.summary}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {panel.metrics.map((metric) => (
            <article key={metric} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
              <p className="text-sm text-slate-400">Operational metric</p>
              <h2 className="mt-2 text-2xl font-bold">{metric}</h2>
            </article>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl bg-slate-900 p-6 ring-1 ring-white/10">
            <h2 className="text-2xl font-bold">Core workflows</h2>
            <div className="mt-5 space-y-4">
              {panel.workflows.map((workflow, index) => (
                <div key={workflow} className="flex gap-4 rounded-2xl bg-slate-950 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400 font-black text-slate-950">
                    {index + 1}
                  </span>
                  <p className="text-slate-200">{workflow}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-slate-900 p-6 ring-1 ring-white/10">
            <h2 className="text-2xl font-bold">Panel health checks</h2>
            <div className="mt-5 space-y-4">
              {panel.checks.map((check) => (
                <div key={check} className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
                  <p className="font-semibold text-emerald-200">✓ {check}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-3xl bg-slate-900 p-6 shadow-lg ring-1 ring-white/10">
          <h2 className="text-2xl font-bold">Working URL and demo credentials</h2>
          <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
            <div className="rounded-2xl bg-slate-950 p-4">
              <dt className="text-slate-400">URL</dt>
              <dd className="mt-2 break-all font-mono text-cyan-200">{getPanelUrl(access.slug)}</dd>
            </div>
            <div className="rounded-2xl bg-slate-950 p-4">
              <dt className="text-slate-400">Role</dt>
              <dd className="mt-2 font-mono text-cyan-200">{access.role}</dd>
            </div>
            <div className="rounded-2xl bg-slate-950 p-4">
              <dt className="text-slate-400">Email</dt>
              <dd className="mt-2 break-all font-mono text-cyan-200">{access.email}</dd>
            </div>
            <div className="rounded-2xl bg-slate-950 p-4">
              <dt className="text-slate-400">Password</dt>
              <dd className="mt-2 font-mono text-cyan-200">{access.password}</dd>
            </div>
          </dl>
          <a href={access.url} className="mt-6 inline-flex rounded-full bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
            Open live {access.name}
          </a>
        </section>
      </section>
    </main>
  );
}
