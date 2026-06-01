# Complete System Architecture

## 1. Architecture Overview

Homesphere Home Services & Business Network is a multi-tenant, multi-city service marketplace with product commerce, lead generation, affiliate campaigns, franchise operations, and enterprise administration. The recommended production architecture is a modular monolith first, with strict NestJS domain boundaries and an event-driven internal architecture that can later split into microservices by bounded context.

## 2. Personas and Panels

| User type | Primary interface | Core capabilities |
| --- | --- | --- |
| Customer | Mobile app and web | Register, OTP login, social login, manage addresses, book services, buy products, track jobs, wallet, coupons, loyalty, memberships, invoices, reviews, referrals, multilingual UI, WhatsApp and push notifications, AI recommendations |
| Service provider | Provider app | Accept/reject jobs, attendance, route tracking, availability, wallet, settlements, reviews, service areas, earnings dashboard |
| Shop owner/vendor | Vendor web/app | Catalog, inventory, subscriptions, orders, service staff, pricing, leads, featured listings, reports |
| Influencer | Influencer panel | KYC, referral codes, affiliate links, campaigns, commissions, withdrawals, leaderboards, performance analytics |
| Franchise | Franchise panel | Territory management, city allocation, vendor/customer monitoring, lead distribution, staff, revenue tracking, local marketing |
| City manager | City operations panel | Dispatch oversight, SLA monitoring, vendor onboarding, escalations, local campaigns |
| Support team | Support console | Tickets, cancellations, refunds, customer/provider escalation, knowledge base, call notes |
| Super admin | Admin console | Users, vendors, franchises, influencers, products, bookings, orders, wallets, commissions, taxes, settlements, subscriptions, coupons, CMS, notifications, audit logs, security monitoring |

## 3. Service Domains

| Domain | Responsibilities |
| --- | --- |
| Identity & Access | JWT, OAuth, OTP, 2FA, RBAC, sessions, device tokens |
| Catalog | Service categories, product categories, packages, add-ons, AMC plans, bundles |
| Booking | Service scheduling, emergency booking, assignment, status lifecycle, cancellation, invoices |
| Commerce | Cart, product orders, inventory, bulk orders, dealer pricing, returns |
| Dispatch & Tracking | Provider matching, route optimization, Socket.IO location events, SLA timers |
| Commission Engine | Platform, influencer, vendor, franchise commissions; configurable rules and settlement ledger |
| Payments | Razorpay, Cashfree, Stripe, PayPal, UPI, wallet, COD, refunds, tax calculation, split settlement |
| Influencer/Affiliate | Campaigns, referral attribution, affiliate links, performance scoring, withdrawals |
| Franchise Ops | Territory, city, revenue share, local staff, lead distribution, monitoring |
| Notification | Email, SMS, WhatsApp, push templates and event triggers |
| AI Services | Recommendations, chatbot, lead assignment, fraud detection, influencer analysis, vendor ranking |
| Analytics | Revenue, bookings, products, services, influencers, franchises, cities, LTV, CAC, profitability |
| Audit & Compliance | Immutable audit logs, GDPR workflows, data exports, consent, security alerts |

## 4. High-Level Runtime Topology

```text
Customers / Providers / Vendors / Influencers / Franchise / Admin
        |
CloudFront + WAF + Route53
        |
Next.js Web Panels        Flutter Mobile Apps
        |                         |
        +----------- API Gateway / Load Balancer -----------+
                                                            |
                                                NestJS Marketplace API
                                                            |
               +----------------+----------------+----------+-----------+
               |                |                |                      |
          PostgreSQL          Redis        Elasticsearch              S3
      transactional DB   cache/queues    search/report indexes   media/invoices
               |
        Outbox events -> Workers -> Email/SMS/WhatsApp/Push/Payments/AI
               |
        Analytics warehouse / BI dashboards
```

## 5. Scalability Plan for 1M+ Users

- Partition large tables by city and month where appropriate: bookings, orders, transactions, audit logs, notifications, tracking events.
- Use read replicas for reporting, search indexing, and admin dashboards.
- Keep high-cardinality real-time location events in Redis streams or a time-series store, retaining only summarized records in PostgreSQL.
- Use the outbox pattern for reliable integration with payment gateways, notifications, search indexing, and analytics.
- Cache service catalog, city settings, commission rules, membership benefits, and feature flags in Redis.
- Route users to nearest region through CDN and deploy app pods across multiple availability zones.
- Separate worker deployments for payments, notifications, AI jobs, reports, and settlement batches.

## 6. Marketplace Modules

Every vertical follows the same base model: category, service/product, vendor/provider, pricing rule, availability, booking/order, payment, review, commission, settlement, and analytics event.

| Module | Special workflows |
| --- | --- |
| Salon & Parlour | Appointment booking, staff, bridal packages, beauty packages, memberships, product sales, loyalty, influencer campaigns, package promotions, scheduling, attendance, earnings |
| Electrician | Instant/emergency booking, wiring, installation, maintenance, spares, AMC, assignment, route optimization |
| Electronics Repair | Device diagnosis, pickup/drop, spare parts, warranty, repair estimates |
| Hardware Marketplace | Catalog, inventory, suppliers, search, categories, bulk orders, dealer pricing, delivery, returns |
| Cleaning/Plumbing/Carpentry/Painting/AC/RO/CCTV/Solar | Skills, area coverage, emergency slots, AMC, add-on products, warranty tracking |
| Interior/Printing/Digital/Website/Mobile/Corporate | Lead pipeline, quotations, milestones, B2B approvals, invoices, subscriptions |

## 7. Commission Flow

```text
Customer booking/order paid
  -> payment transaction captured
  -> commission rule selected by category + city + vendor + campaign + product
  -> platform commission ledger entry
  -> influencer commission ledger entry when referral attribution exists
  -> franchise commission ledger entry when territory belongs to franchise
  -> vendor/provider payable calculated
  -> tax and refund reserve applied
  -> settlement batch generated
  -> payout gateway transfer initiated
```

## 8. Security Architecture

- RBAC enforced at controller, service, and row-policy levels.
- JWT access tokens with refresh rotation, OAuth identities, OTP verification, and optional 2FA for privileged roles.
- Rate limiting per IP, user, device, endpoint, and OTP channel.
- Encryption at rest for sensitive KYC, payment references, and PII fields.
- Audit logs for privileged reads/writes, commission rule changes, settlement approvals, refunds, and support impersonation.
- GDPR workflows for consent, export, correction, retention, deletion, and anonymization.
