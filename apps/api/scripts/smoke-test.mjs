import { existsSync } from 'node:fs';

const modules = ['admin', 'ai', 'analytics', 'auth', 'bookings', 'commissions', 'marketplace', 'notifications', 'orders', 'payments', 'users'];
const missingFiles = modules.flatMap((moduleName) => {
  const basePath = new URL(`../src/${moduleName}/`, import.meta.url);
  return [`${moduleName}.module.ts`, `${moduleName}.controller.ts`, `${moduleName}.service.ts`]
    .map((fileName) => new URL(fileName, basePath))
    .filter((fileUrl) => !existsSync(fileUrl))
    .map((fileUrl) => fileUrl.pathname);
});

if (missingFiles.length > 0) {
  console.error('Missing API module files:');
  for (const filePath of missingFiles) {
    console.error(`- ${filePath}`);
  }
  process.exit(1);
}

const apiBaseUrl = process.env.API_BASE_URL;

if (apiBaseUrl) {
  const endpoints = modules.map((moduleName) => `/v1/${moduleName}/health`);
  const failures = [];

  for (const endpoint of endpoints) {
    const response = await fetch(new URL(endpoint, apiBaseUrl));
    if (!response.ok) {
      failures.push(`${endpoint} returned ${response.status}`);
    }
  }

  if (failures.length > 0) {
    console.error('API smoke-test failures:');
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }
}

console.log(`API smoke test passed for ${modules.length} modules${apiBaseUrl ? ` at ${apiBaseUrl}` : ''}.`);
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const requiredFiles = [
  'src/main.ts',
  'src/app.module.ts',
  'src/auth/auth.module.ts',
  'src/users/users.module.ts',
  'src/marketplace/marketplace.module.ts',
  'src/bookings/bookings.module.ts',
  'src/orders/orders.module.ts',
  'src/commissions/commissions.module.ts',
  'src/payments/payments.module.ts',
  'src/notifications/notifications.module.ts',
  'src/ai/ai.module.ts',
  'src/analytics/analytics.module.ts',
  'src/admin/admin.module.ts',
];

const missing = requiredFiles.filter((file) => !existsSync(join(process.cwd(), file)));
if (missing.length > 0) {
  throw new Error(`Missing required API skeleton files: ${missing.join(', ')}`);
}

const appModule = await readFile(join(process.cwd(), 'src/app.module.ts'), 'utf8');
const expectedModules = [
  'AuthModule',
  'UsersModule',
  'MarketplaceModule',
  'BookingsModule',
  'OrdersModule',
  'CommissionsModule',
  'PaymentsModule',
  'NotificationsModule',
  'AiModule',
  'AnalyticsModule',
  'AdminModule',
];

const missingImports = expectedModules.filter((moduleName) => !appModule.includes(moduleName));
if (missingImports.length > 0) {
  throw new Error(`AppModule is missing imports: ${missingImports.join(', ')}`);
}

console.log('API skeleton smoke test passed.');
