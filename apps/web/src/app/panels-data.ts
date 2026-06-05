export type Panel = {
  slug: string;
  title: string;
  audience: string;
  status: 'Live' | 'Ready';
  summary: string;
  metrics: string[];
  workflows: string[];
  checks: string[];
};

export const panels: Panel[] = [
  {
    slug: 'customer',
    title: 'Customer App',
    audience: 'Customers',
    status: 'Live',
    summary: 'Service discovery, booking, commerce, wallet, loyalty, referrals, and live tracking in one customer journey.',
    metrics: ['12.8k active users', '4.8 avg rating', '93% booking completion'],
    workflows: ['Location-aware service search', 'Booking slot and checkout flow', 'Wallet, coupons, memberships, and invoices'],
    checks: ['Home tab content visible', 'Bookings and shop journeys mapped', 'Wallet/profile actions represented'],
  },
  {
    slug: 'provider',
    title: 'Service Provider App',
    audience: 'Field providers',
    status: 'Live',
    summary: 'Provider operations for job queue, attendance, routing, customer contact, status updates, and settlement visibility.',
    metrics: ['320 jobs today', '38 min avg ETA', '97% SLA adherence'],
    workflows: ['Accept/reject assigned jobs', 'Arrival, start, pause, and completion states', 'Earnings, reviews, and settlement reports'],
    checks: ['Assigned job queue visible', 'Route/tracking state represented', 'Earnings and availability panels present'],
  },
  {
    slug: 'shop-owner',
    title: 'Shop Owner Panel',
    audience: 'Vendors and shops',
    status: 'Live',
    summary: 'Vendor workspace for services, products, inventory, orders, bookings, leads, campaigns, subscriptions, and reports.',
    metrics: ['₹8.4L monthly revenue', '46 low-stock alerts', '18 pending leads'],
    workflows: ['Product and service catalog management', 'Inventory, order, and booking operations', 'Campaign and subscription performance'],
    checks: ['Catalog modules listed', 'Order/booking queues represented', 'Inventory and campaign alerts visible'],
  },
  {
    slug: 'influencer',
    title: 'Influencer Panel',
    audience: 'Influencers and affiliates',
    status: 'Live',
    summary: 'Affiliate dashboard for KYC, campaigns, referral codes, affiliate links, ledgers, withdrawals, and performance reports.',
    metrics: ['1.9k referrals', '₹2.6L commissions', '24 active campaigns'],
    workflows: ['KYC and onboarding review', 'Campaign marketplace and link generation', 'Commission ledger and withdrawal requests'],
    checks: ['Campaign cards visible', 'Referral tooling represented', 'Ledger/withdrawal states present'],
  },
  {
    slug: 'franchise',
    title: 'Franchise Panel',
    audience: 'Franchise partners',
    status: 'Live',
    summary: 'Territory management for franchise revenue, city allocation, vendor monitoring, lead distribution, and compliance.',
    metrics: ['14 territories', '₹31L franchise revenue', '89% compliance score'],
    workflows: ['Territory and city allocation', 'Vendor/customer monitoring', 'Lead distribution and local marketing'],
    checks: ['Territory modules listed', 'Revenue and compliance widgets visible', 'Lead distribution flow represented'],
  },
  {
    slug: 'city-manager',
    title: 'City Manager Panel',
    audience: 'City operations',
    status: 'Live',
    summary: 'City-level dispatch board for SLA breaches, live map operations, emergency bookings, campaigns, and support escalations.',
    metrics: ['7 SLA risks', '138 live jobs', '11 escalations'],
    workflows: ['Dispatch board triage', 'Live map and emergency booking handling', 'Vendor list, campaigns, and support escalations'],
    checks: ['Dispatch queues visible', 'SLA breach state represented', 'Live city operations modules present'],
  },
  {
    slug: 'support',
    title: 'Support Team Panel',
    audience: 'Support agents',
    status: 'Live',
    summary: 'Support console for ticket inbox, booking timeline, communications, cancellation/refund workflows, and knowledge base.',
    metrics: ['214 open tickets', '12 min first response', '96% CSAT'],
    workflows: ['Ticket inbox and escalation history', 'Booking timeline with customer/provider communication', 'Cancellation, refund, and internal-note workflow'],
    checks: ['Ticket inbox represented', 'Refund/cancellation path visible', 'Knowledge base and notes present'],
  },
  {
    slug: 'super-admin',
    title: 'Super Admin Panel',
    audience: 'Platform administrators',
    status: 'Live',
    summary: 'Global administration for users, vendors, franchises, products, bookings, orders, wallets, commissions, CMS, and audit logs.',
    metrics: ['42 cities', '₹1.2Cr revenue', '99.95% platform uptime'],
    workflows: ['Global filters and business KPIs', 'User, vendor, franchise, booking, order, and wallet oversight', 'Commission engine, reports, CMS, notifications, audit, and security'],
    checks: ['Global KPI cards visible', 'Admin modules represented', 'Audit/security status present'],
  },
];

export function getPanel(slug: string) {
  return panels.find((panel) => panel.slug === slug);
}
