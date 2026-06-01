# Panel URLs and Demo Credentials

Use these local URLs after starting the platform with `docker compose up --build` from the repository root. The web app is published on `http://localhost:3001` and the API is published on `http://localhost:3000/v1`.

For deployed preview environments, set `NEXT_PUBLIC_WEB_BASE_URL` so the in-app panel links render with the correct public host instead of the local default.

> These credentials are demo QA credentials for preview environments only. Replace them with secure seeded users and a real authentication flow before production.

| Panel | URL | Email | Password | Role |
| --- | --- | --- | --- | --- |
| Customer App | `http://localhost:3001/panels/customer` | `customer@homesphere.local` | `Demo@12345` | `CUSTOMER` |
| Service Provider App | `http://localhost:3001/panels/service-provider` | `provider@homesphere.local` | `Demo@12345` | `PROVIDER` |
| Vendor Panel | `http://localhost:3001/panels/vendor` | `vendor@homesphere.local` | `Demo@12345` | `VENDOR` |
| Shop Owner Panel | `http://localhost:3001/panels/shop-owner` | `shop.owner@homesphere.local` | `Demo@12345` | `SHOP_OWNER` |
| Influencer Panel | `http://localhost:3001/panels/influencer` | `influencer@homesphere.local` | `Demo@12345` | `INFLUENCER` |
| Franchise Panel | `http://localhost:3001/panels/franchise` | `franchise@homesphere.local` | `Demo@12345` | `FRANCHISE` |
| City Manager Panel | `http://localhost:3001/panels/city-manager` | `city.manager@homesphere.local` | `Demo@12345` | `CITY_MANAGER` |
| Support Team Panel | `http://localhost:3001/panels/support-team` | `support@homesphere.local` | `Demo@12345` | `SUPPORT` |
| Admin Panel | `http://localhost:3001/panels/admin` | `admin@homesphere.local` | `Demo@12345` | `ADMIN` |
| Super Admin Panel | `http://localhost:3001/panels/super-admin` | `super.admin@homesphere.local` | `Demo@12345` | `SUPER_ADMIN` |

## Health Check URLs

| Service | URL |
| --- | --- |
| API auth health | `http://localhost:3000/v1/auth/health` |
| API users health | `http://localhost:3000/v1/users/health` |
| API marketplace health | `http://localhost:3000/v1/marketplace/health` |
| API bookings health | `http://localhost:3000/v1/bookings/health` |
| API orders health | `http://localhost:3000/v1/orders/health` |
| API payments health | `http://localhost:3000/v1/payments/health` |
| API admin health | `http://localhost:3000/v1/admin/health` |
