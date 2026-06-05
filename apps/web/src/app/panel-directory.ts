export type PanelAccess = {
  slug: string;
  name: string;
  role: string;
  email: string;
  password: string;
  description: string;
  highlights: string[];
};

export const basePanelUrl = process.env.NEXT_PUBLIC_WEB_BASE_URL ?? 'https://sphere.dlssr.in';

export const panelAccessList: PanelAccess[] = [
  {
    slug: 'customer',
    name: 'Customer App',
    role: 'CUSTOMER',
    email: 'customer@homesphere.local',
    password: 'Demo@12345',
    description: 'Browse services, book appointments, shop products, track orders, pay invoices, and review completed work.',
    highlights: ['Service discovery', 'Booking tracking', 'Wallet and reviews'],
  },
  {
    slug: 'service-provider',
    name: 'Service Provider App',
    role: 'PROVIDER',
    email: 'provider@homesphere.local',
    password: 'Demo@12345',
    description: 'Manage job requests, availability, service delivery, earnings, payouts, and customer communications.',
    highlights: ['Job queue', 'Availability calendar', 'Earnings dashboard'],
  },
  {
    slug: 'vendor',
    name: 'Vendor Panel',
    role: 'VENDOR',
    email: 'vendor@homesphere.local',
    password: 'Demo@12345',
    description: 'Manage B2B leads, quotations, fulfillment pipelines, subscriptions, and marketplace visibility.',
    highlights: ['Lead inbox', 'Quote management', 'Subscription status'],
  },
  {
    slug: 'shop-owner',
    name: 'Shop Owner Panel',
    role: 'SHOP_OWNER',
    email: 'shop.owner@homesphere.local',
    password: 'Demo@12345',
    description: 'Operate local product catalogs, inventory, product orders, commissions, subscriptions, and promotions.',
    highlights: ['Catalog management', 'Inventory alerts', 'Order fulfillment'],
  },
  {
    slug: 'influencer',
    name: 'Influencer Panel',
    role: 'INFLUENCER',
    email: 'influencer@homesphere.local',
    password: 'Demo@12345',
    description: 'Create campaigns, share referral links, monitor attribution, and review commission payouts.',
    highlights: ['Referral links', 'Campaign analytics', 'Commission ledger'],
  },
  {
    slug: 'franchise',
    name: 'Franchise Panel',
    role: 'FRANCHISE',
    email: 'franchise@homesphere.local',
    password: 'Demo@12345',
    description: 'Control territory operations, onboard vendors, monitor revenue, and manage local settlement workflows.',
    highlights: ['Territory KPIs', 'Vendor onboarding', 'Settlement checks'],
  },
  {
    slug: 'city-manager',
    name: 'City Manager Panel',
    role: 'CITY_MANAGER',
    email: 'city.manager@homesphere.local',
    password: 'Demo@12345',
    description: 'Track city-level demand, provider supply, SLA breaches, escalations, and local growth metrics.',
    highlights: ['City operations', 'SLA monitoring', 'Escalation queue'],
  },
  {
    slug: 'support-team',
    name: 'Support Team Panel',
    role: 'SUPPORT',
    email: 'support@homesphere.local',
    password: 'Demo@12345',
    description: 'Resolve customer tickets, booking disputes, refund requests, and provider or vendor escalations.',
    highlights: ['Ticket inbox', 'Refund triage', 'Customer timeline'],
  },
  {
    slug: 'admin',
    name: 'Admin Panel',
    role: 'ADMIN',
    email: 'admin@homesphere.local',
    password: 'Demo@12345',
    description: 'Manage platform operations, catalog governance, disputes, team queues, and regional compliance checks.',
    highlights: ['Operations console', 'Catalog governance', 'Dispute oversight'],
  },
  {
    slug: 'super-admin',
    name: 'Super Admin Panel',
    role: 'SUPER_ADMIN',
    email: 'super.admin@homesphere.local',
    password: 'Demo@12345',
    description: 'Administer global platform settings, roles, commissions, cities, analytics, and audit-ready operations.',
    highlights: ['Global controls', 'Commission rules', 'Audit dashboard'],
  },
];

export function normalizePanelSlug(value: string) {
  return value.trim().toLowerCase().replaceAll('_', '-').replaceAll(' ', '-');
}

export function getPanelUrl(slug: string) {
  return `${basePanelUrl}/panels/${slug}`;
}

export function findPanelBySlug(slug: string) {
  const normalizedSlug = normalizePanelSlug(slug);

  return panelAccessList.find((panel) => {
    const normalizedRole = normalizePanelSlug(panel.role);
    const normalizedName = normalizePanelSlug(panel.name.replace(/ panel$/i, '').replace(/ app$/i, ''));

    return [panel.slug, normalizedRole, normalizedName].includes(normalizedSlug);
  });
  return panelAccessList.find((panel) => panel.slug === slug);
}
