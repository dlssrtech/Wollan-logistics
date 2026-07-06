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
    slug: 'admin',
    title: 'Admin Login',
    audience: 'Operations administrators',
    status: 'Live',
    summary: 'Central operations access for Wollan logistics administrators to manage users, deliveries, merchants, and platform controls.',
    metrics: ['Admin access ready', 'Role: ADMIN', 'Dedicated login URL'],
    workflows: ['Review delivery and order operations', 'Manage users, drivers, and merchants', 'Configure platform settings and service controls'],
    checks: ['Admin URL is separated from driver and merchant access', 'Demo admin credentials are documented', 'Operations workflow details are visible'],
  },
  {
    slug: 'driver',
    title: 'Driver Login',
    audience: 'Delivery drivers',
    status: 'Live',
    summary: 'Driver access for delivery assignments, route status, pickup updates, completion steps, and proof-of-delivery workflows.',
    metrics: ['Driver access ready', 'Role: DRIVER', 'Dedicated login URL'],
    workflows: ['Open assigned delivery jobs', 'Update pickup, transit, and delivery status', 'Submit completion and delivery proof details'],
    checks: ['Driver URL is separated from admin and merchant access', 'Demo driver credentials are documented', 'Route workflow details are visible'],
  },
  {
    slug: 'merchant',
    title: 'Merchant Login',
    audience: 'Merchant partners',
    status: 'Live',
    summary: 'Merchant portal access for pickup requests, shipment monitoring, fulfillment visibility, invoices, and customer logistics coordination.',
    metrics: ['Merchant access ready', 'Role: MERCHANT', 'Dedicated login URL'],
    workflows: ['Create and monitor pickup requests', 'Track shipments and delivery exceptions', 'Review fulfillment and invoice visibility'],
    checks: ['Merchant URL is separated from admin and driver access', 'Demo merchant credentials are documented', 'Merchant workflow details are visible'],
  },
];

export function getPanel(slug: string) {
  return panels.find((panel) => panel.slug === slug);
}
