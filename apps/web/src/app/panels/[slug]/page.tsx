import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findPanelBySlug, getPanelUrl, panelAccessList } from '../../panel-directory';

type PanelPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return panelAccessList.map((panel) => ({ slug: panel.slug }));
}

export function generateMetadata({ params }: PanelPageProps) {
  const panel = findPanelBySlug(params.slug);

  if (!panel) {
    return { title: 'Panel not found | Homesphere' };
  }

  return {
    title: `${panel.name} | Homesphere`,
    description: `${panel.name} access details and demo credentials`,
  };
}

export default function PanelPage({ params }: PanelPageProps) {
  const panel = findPanelBySlug(params.slug);

  if (!panel) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-4xl space-y-8">
        <Link href="/" className="text-sm font-semibold text-cyan-300 hover:text-cyan-100">
          ← Back to all panels
        </Link>

        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-500 p-10 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-100">{panel.role}</p>
          <h1 className="mt-4 text-4xl font-black">{panel.name}</h1>
          <p className="mt-5 text-lg text-cyan-50">{panel.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {panel.highlights.map((highlight) => (
            <article key={highlight} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-300">Workflow</p>
              <h2 className="mt-2 text-xl font-bold">{highlight}</h2>
            </article>
          ))}
        </div>

        <section className="rounded-3xl bg-slate-900 p-6 shadow-lg ring-1 ring-white/10">
          <h2 className="text-2xl font-bold">Working URL and demo credentials</h2>
          <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
            <div className="rounded-2xl bg-slate-950 p-4">
              <dt className="text-slate-400">URL</dt>
              <dd className="mt-2 break-all font-mono text-cyan-200">{getPanelUrl(panel.slug)}</dd>
            </div>
            <div className="rounded-2xl bg-slate-950 p-4">
              <dt className="text-slate-400">Role</dt>
              <dd className="mt-2 font-mono text-cyan-200">{panel.role}</dd>
            </div>
            <div className="rounded-2xl bg-slate-950 p-4">
              <dt className="text-slate-400">Email</dt>
              <dd className="mt-2 break-all font-mono text-cyan-200">{panel.email}</dd>
            </div>
            <div className="rounded-2xl bg-slate-950 p-4">
              <dt className="text-slate-400">Password</dt>
              <dd className="mt-2 font-mono text-cyan-200">{panel.password}</dd>
            </div>
          </dl>
          <p className="mt-5 text-sm text-slate-400">
            These are demo access details for local preview and QA environments. Replace them with secure seeded users before production launch.
          </p>
        </section>
      </section>
    </main>
  );
}
