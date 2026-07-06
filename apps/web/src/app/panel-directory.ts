export type PanelAccess = {
  slug: string;
  name: string;
  role: string;
  url: string;
  email: string;
  password: string;
  description: string;
  highlights: string[];
};

export const panelAccessList: PanelAccess[] = [
  {
    slug: 'admin',
    name: 'Admin Login',
    role: 'ADMIN',
    url: 'https://wolan.softechinc.ai/login',
    email: 'admin@wolan.com',
    password: '12345678',
    description: 'Administrative operations login for managing Wollan logistics users, jobs, orders, and platform settings.',
    highlights: ['Operations dashboard', 'User and fleet controls', 'Platform settings'],
  },
  {
    slug: 'driver',
    name: 'Driver Login',
    role: 'DRIVER',
    url: 'https://wolan.softechinc.ai/driver-login',
    email: 'driver@wolan.test',
    password: '12345678',
    description: 'Driver workspace login for assigned deliveries, route updates, job status, and proof-of-delivery workflows.',
    highlights: ['Assigned jobs', 'Route status updates', 'Delivery proof'],
  },
  {
    slug: 'merchant',
    name: 'Merchant Login',
    role: 'MERCHANT',
    url: 'https://wolan.softechinc.ai/merchant-login',
    email: 'merchant@wolan.test',
    password: '12345678',
    description: 'Merchant portal login for managing pickup requests, shipment visibility, invoices, and customer fulfillment.',
    highlights: ['Pickup requests', 'Shipment tracking', 'Invoice visibility'],
  },
];

export function getPanelUrl(slug: string) {
  return panelAccessList.find((panel) => panel.slug === slug)?.url ?? 'https://wolan.softechinc.ai';
}

export function findPanelBySlug(slug: string) {
  return panelAccessList.find((panel) => panel.slug === slug);
}
