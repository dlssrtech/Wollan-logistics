import { existsSync } from 'node:fs';
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
