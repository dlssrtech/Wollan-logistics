# Homesphere Home Services & Business Network

Enterprise blueprint and source skeleton for a hyperlocal multi-service marketplace and commerce ecosystem that connects customers, service providers, shops, influencers, franchises, city managers, support teams, and administrators.

## Platform Scope

The platform combines Urban Company-style service booking, JustDial-style local discovery, IndiaMART-style B2B commerce, Uber-style dispatch/tracking, and affiliate marketing workflows.

### Revenue Streams

1. Service booking commissions
2. Product sales commissions
3. Influencer referral commissions
4. Vendor subscriptions
5. Franchise fees
6. Featured business listings
7. AMC subscriptions
8. Lead generation charges
9. Advertisement placements
10. Business management software subscriptions

### Service Verticals

- Salon & parlour services
- Electrician services
- Electronics repair services
- Hardware sales & services
- Home cleaning
- Plumbing
- Carpentry
- Painting
- AC repair
- RO service
- CCTV installation
- Solar installation
- Interior design
- Printing services
- Digital marketing services
- Website development services
- Mobile app development services
- Corporate office services

## Monorepo Layout

```text
apps/api      NestJS backend API and domain modules
apps/web      Next.js admin/customer/vendor/influencer/franchise web panels
apps/mobile   Flutter mobile app source skeleton
infra/k8s     Kubernetes production manifests
docs          Architecture, database, API, UI/UX, diagrams, deployment guide
```

## Key Deliverables

| Deliverable | Location |
| --- | --- |
| Complete system architecture | `docs/architecture.md` |
| PostgreSQL database schema | `docs/database-schema.sql` |
| API documentation | `docs/api.md`, `docs/openapi.yaml` |
| Admin, mobile, customer, influencer, vendor, franchise UI designs | `docs/ui-ux.md` |
| Backend/frontend/mobile folder structure | `apps/`, `docs/source-structure.md` |
| Docker configuration | `docker-compose.yml`, `apps/api/Dockerfile`, `apps/web/Dockerfile` |
| Kubernetes deployment | `infra/k8s/` |
| CI/CD pipeline | `.github/workflows/ci.yml` |
| Deployment guide | `docs/deployment-guide.md` |
| ER diagrams, flows, wireframes | `docs/diagrams.md`, `docs/ui-ux.md` |

## Production Principles

- Multi-city, multi-franchise, multi-vendor data model
- Role-based access control with JWT, OAuth, OTP, and 2FA readiness
- Event-driven booking, order, payment, notification, settlement, and audit flows
- Configurable commission engine by category, city, vendor, campaign, product, and franchise
- Horizontally scalable services with Redis, Socket.IO, Elasticsearch, PostgreSQL, S3, Docker, Kubernetes, and GitHub Actions
- Observability-ready architecture with structured logs, metrics, traces, and audit records

## Quick Start

```bash
cp .env.example .env
docker compose up --build
```


## Local Panel Access

After deployment, open the web app at `https://sphere.dlssr.in`. Separate panel URLs and demo credentials are listed in `docs/panel-access.md`.

The source skeleton is intentionally modular so each panel and service can evolve independently while sharing common contracts and platform policies.
