# Panel URLs and Demo Credentials

Use these deployment URLs after publishing the platform. The web app is published on `https://sphere.dlssr.in` and the API is published on `https://sphere.dlssr.in/v1`.

Set `NEXT_PUBLIC_WEB_BASE_URL=https://sphere.dlssr.in` and `NEXT_PUBLIC_API_BASE_URL=https://sphere.dlssr.in/v1` in deployment environments so web and API links use the main domain.

> These credentials are demo QA credentials for preview environments only. Replace them with secure seeded users and a real authentication flow before production.

The API serves `/`, `/panels`, and `/panels/:slug` as an HTML fallback as well, so `https://sphere.dlssr.in/` will show the panel directory instead of the NestJS `Cannot GET /` JSON response even when the domain points at the API service. Panel routes accept both canonical slugs and role-style aliases, so `/panels/super-admin` and `/panels/SUPER_ADMIN` both open the Super Admin panel.

| Panel | URL | Email | Password | Role |
| --- | --- | --- | --- | --- |
| Customer App | `https://sphere.dlssr.in/panels/customer` | `customer@homesphere.local` | `Demo@12345` | `CUSTOMER` |
| Service Provider App | `https://sphere.dlssr.in/panels/service-provider` | `provider@homesphere.local` | `Demo@12345` | `PROVIDER` |
| Vendor Panel | `https://sphere.dlssr.in/panels/vendor` | `vendor@homesphere.local` | `Demo@12345` | `VENDOR` |
| Shop Owner Panel | `https://sphere.dlssr.in/panels/shop-owner` | `shop.owner@homesphere.local` | `Demo@12345` | `SHOP_OWNER` |
| Influencer Panel | `https://sphere.dlssr.in/panels/influencer` | `influencer@homesphere.local` | `Demo@12345` | `INFLUENCER` |
| Franchise Panel | `https://sphere.dlssr.in/panels/franchise` | `franchise@homesphere.local` | `Demo@12345` | `FRANCHISE` |
| City Manager Panel | `https://sphere.dlssr.in/panels/city-manager` | `city.manager@homesphere.local` | `Demo@12345` | `CITY_MANAGER` |
| Support Team Panel | `https://sphere.dlssr.in/panels/support-team` | `support@homesphere.local` | `Demo@12345` | `SUPPORT` |
| Admin Panel | `https://sphere.dlssr.in/panels/admin` | `admin@homesphere.local` | `Demo@12345` | `ADMIN` |
| Super Admin Panel | `https://sphere.dlssr.in/panels/super-admin` | `super.admin@homesphere.local` | `Demo@12345` | `SUPER_ADMIN` |

## Health Check URLs

| Service | URL |
| --- | --- |
| API auth health | `https://sphere.dlssr.in/v1/auth/health` |
| API users health | `https://sphere.dlssr.in/v1/users/health` |
| API marketplace health | `https://sphere.dlssr.in/v1/marketplace/health` |
| API bookings health | `https://sphere.dlssr.in/v1/bookings/health` |
| API orders health | `https://sphere.dlssr.in/v1/orders/health` |
| API payments health | `https://sphere.dlssr.in/v1/payments/health` |
| API admin health | `https://sphere.dlssr.in/v1/admin/health` |
