import { Controller, Get, Header, NotFoundException, Param } from '@nestjs/common';

type DemoPanel = {
  slug: string;
  name: string;
  role: string;
  email: string;
  password: string;
  description: string;
};

const deploymentWebBaseUrl = process.env.NEXT_PUBLIC_WEB_BASE_URL ?? 'https://sphere.dlssr.in';
const deploymentApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://sphere.dlssr.in/v1';

const demoPanels: DemoPanel[] = [
  {
    slug: 'customer',
    name: 'Customer App',
    role: 'CUSTOMER',
    email: 'customer@homesphere.local',
    password: 'Demo@12345',
    description: 'Browse services, book appointments, shop products, track orders, pay invoices, and review completed work.',
  },
  {
    slug: 'service-provider',
    name: 'Service Provider App',
    role: 'PROVIDER',
    email: 'provider@homesphere.local',
    password: 'Demo@12345',
    description: 'Manage job requests, availability, service delivery, earnings, payouts, and customer communications.',
  },
  {
    slug: 'vendor',
    name: 'Vendor Panel',
    role: 'VENDOR',
    email: 'vendor@homesphere.local',
    password: 'Demo@12345',
    description: 'Manage B2B leads, quotations, fulfillment pipelines, subscriptions, and marketplace visibility.',
  },
  {
    slug: 'shop-owner',
    name: 'Shop Owner Panel',
    role: 'SHOP_OWNER',
    email: 'shop.owner@homesphere.local',
    password: 'Demo@12345',
    description: 'Operate local product catalogs, inventory, product orders, commissions, subscriptions, and promotions.',
  },
  {
    slug: 'influencer',
    name: 'Influencer Panel',
    role: 'INFLUENCER',
    email: 'influencer@homesphere.local',
    password: 'Demo@12345',
    description: 'Create campaigns, share referral links, monitor attribution, and review commission payouts.',
  },
  {
    slug: 'franchise',
    name: 'Franchise Panel',
    role: 'FRANCHISE',
    email: 'franchise@homesphere.local',
    password: 'Demo@12345',
    description: 'Control territory operations, onboard vendors, monitor revenue, and manage local settlement workflows.',
  },
  {
    slug: 'city-manager',
    name: 'City Manager Panel',
    role: 'CITY_MANAGER',
    email: 'city.manager@homesphere.local',
    password: 'Demo@12345',
    description: 'Track city-level demand, provider supply, SLA breaches, escalations, and local growth metrics.',
  },
  {
    slug: 'support-team',
    name: 'Support Team Panel',
    role: 'SUPPORT',
    email: 'support@homesphere.local',
    password: 'Demo@12345',
    description: 'Resolve customer tickets, booking disputes, refund requests, and provider or vendor escalations.',
  },
  {
    slug: 'admin',
    name: 'Admin Panel',
    role: 'ADMIN',
    email: 'admin@homesphere.local',
    password: 'Demo@12345',
    description: 'Manage platform operations, catalog governance, disputes, team queues, and regional compliance checks.',
  },
  {
    slug: 'super-admin',
    name: 'Super Admin Panel',
    role: 'SUPER_ADMIN',
    email: 'super.admin@homesphere.local',
    password: 'Demo@12345',
    description: 'Administer global platform settings, roles, commissions, cities, analytics, and audit-ready operations.',
  },
];

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function panelUrl(slug: string) {
  return `${deploymentWebBaseUrl}/panels/${slug}`;
}

function renderPage(title: string, body: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      body { margin: 0; background: #020617; color: #f8fafc; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      main { max-width: 1180px; margin: 0 auto; padding: 40px 24px; }
      .hero { border-radius: 28px; padding: 40px; background: linear-gradient(135deg, #4f46e5, #06b6d4); box-shadow: 0 24px 80px rgba(8, 47, 73, 0.35); }
      .eyebrow { color: #cffafe; font-size: 12px; font-weight: 800; letter-spacing: 0.32em; text-transform: uppercase; }
      h1 { margin: 14px 0 0; font-size: clamp(34px, 6vw, 60px); line-height: 1; }
      h2 { margin: 0 0 18px; font-size: 26px; }
      p { color: #cbd5e1; line-height: 1.7; }
      .hero p { color: #ecfeff; max-width: 760px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; margin-top: 28px; }
      .card { border: 1px solid rgba(255,255,255,0.12); border-radius: 22px; background: rgba(15, 23, 42, 0.96); padding: 22px; }
      .card h3 { margin: 0; font-size: 22px; }
      dl { display: grid; gap: 10px; margin: 18px 0 0; }
      dt { color: #94a3b8; font-size: 11px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; }
      dd { margin: 3px 0 0; color: #67e8f9; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; overflow-wrap: anywhere; }
      a { color: #67e8f9; text-decoration: none; }
      a.button { display: inline-flex; margin-top: 18px; border-radius: 999px; background: #22d3ee; color: #020617; font-weight: 800; padding: 10px 16px; }
      .notice { margin-top: 24px; border-left: 4px solid #22d3ee; border-radius: 14px; background: rgba(8, 47, 73, 0.38); padding: 16px 18px; }
    </style>
  </head>
  <body>${body}</body>
</html>`;
}

function renderPanelCard(panel: DemoPanel) {
  return `<article class="card">
    <h3>${escapeHtml(panel.name)}</h3>
    <p>${escapeHtml(panel.description)}</p>
    <dl>
      <div><dt>URL</dt><dd>${escapeHtml(panelUrl(panel.slug))}</dd></div>
      <div><dt>Email</dt><dd>${escapeHtml(panel.email)}</dd></div>
      <div><dt>Password</dt><dd>${escapeHtml(panel.password)}</dd></div>
      <div><dt>Role</dt><dd>${escapeHtml(panel.role)}</dd></div>
    </dl>
    <a class="button" href="/panels/${escapeHtml(panel.slug)}">Open panel</a>
  </article>`;
}

function renderHomePage() {
  return renderPage(
    'Homesphere Panel Directory',
    `<main>
      <section class="hero">
        <div class="eyebrow">Homesphere deployment</div>
        <h1>Homesphere Home Services & Business Network</h1>
        <p>This root deployment page prevents the production domain from returning the NestJS "Cannot GET /" response and shares every demo panel URL and credential from the main domain.</p>
      </section>
      <section class="notice">
        <strong>API base URL:</strong> <a href="${escapeHtml(deploymentApiBaseUrl)}/auth/health">${escapeHtml(deploymentApiBaseUrl)}</a>
      </section>
      <section class="grid">${demoPanels.map(renderPanelCard).join('')}</section>
    </main>`,
  );
}

function renderPanelPage(panel: DemoPanel) {
  return renderPage(
    `${panel.name} | Homesphere`,
    `<main>
      <p><a href="/">← Back to all panels</a></p>
      <section class="hero">
        <div class="eyebrow">${escapeHtml(panel.role)}</div>
        <h1>${escapeHtml(panel.name)}</h1>
        <p>${escapeHtml(panel.description)}</p>
      </section>
      <article class="card" style="margin-top: 28px;">
        <h2>Working URL and demo credentials</h2>
        <dl>
          <div><dt>URL</dt><dd>${escapeHtml(panelUrl(panel.slug))}</dd></div>
          <div><dt>Email</dt><dd>${escapeHtml(panel.email)}</dd></div>
          <div><dt>Password</dt><dd>${escapeHtml(panel.password)}</dd></div>
          <div><dt>Role</dt><dd>${escapeHtml(panel.role)}</dd></div>
        </dl>
      </article>
    </main>`,
  );
}

@Controller()
export class AppController {
  @Get()
  @Header('Content-Type', 'text/html; charset=utf-8')
  getDeploymentHome() {
    return renderHomePage();
  }

  @Get('panels')
  @Header('Content-Type', 'text/html; charset=utf-8')
  getPanels() {
    return renderHomePage();
  }

  @Get('panels/:slug')
  @Header('Content-Type', 'text/html; charset=utf-8')
  getPanel(@Param('slug') slug: string) {
    const panel = demoPanels.find((item) => item.slug === slug);

    if (!panel) {
      throw new NotFoundException(`Unknown panel: ${slug}`);
    }

    return renderPanelPage(panel);
  }
}
