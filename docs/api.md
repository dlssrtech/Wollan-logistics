# API Documentation

The backend exposes REST APIs for synchronous product and service marketplace workflows, Socket.IO for live tracking, and webhook endpoints for gateways and third-party integrations. The canonical OpenAPI contract is `docs/openapi.yaml`.

## Authentication

| Endpoint | Method | Description |
| --- | --- | --- |
| `/auth/register` | POST | Register customer, provider, vendor, influencer, franchise, or staff user |
| `/auth/login` | POST | Login with phone/email and password |
| `/auth/otp/request` | POST | Request OTP for login, registration, password reset, or transaction confirmation |
| `/auth/otp/verify` | POST | Verify OTP and issue JWT tokens |
| `/auth/oauth/:provider` | GET | OAuth login start for Google, Apple, Facebook, or other enabled provider |
| `/auth/refresh` | POST | Rotate refresh token and issue new access token |
| `/auth/2fa/enable` | POST | Enable 2FA for privileged accounts |

## Customer APIs

| Endpoint | Method | Description |
| --- | --- | --- |
| `/me/profile` | GET/PATCH | Profile management |
| `/me/addresses` | GET/POST | Address management |
| `/catalog/services` | GET | Browse services by city, category, keyword, price, rating, and availability |
| `/catalog/products` | GET | Search products with filters and Elasticsearch-backed relevance |
| `/bookings` | POST | Create service booking |
| `/bookings/:id` | GET/PATCH | View, cancel, reschedule, or update a booking |
| `/orders` | POST | Place product order |
| `/wallet` | GET | Wallet balance and ledger |
| `/memberships` | GET/POST | Available membership plans and purchase flow |
| `/reviews` | POST | Submit review for booking or order |
| `/recommendations/services` | GET | AI service recommendations |

## Provider APIs

| Endpoint | Method | Description |
| --- | --- | --- |
| `/provider/jobs` | GET | Assigned and available jobs |
| `/provider/jobs/:id/accept` | POST | Accept job |
| `/provider/jobs/:id/reject` | POST | Reject job |
| `/provider/jobs/:id/status` | PATCH | Start, pause, complete, or raise dispute |
| `/provider/location` | POST | Publish GPS location for tracking and route optimization |
| `/provider/availability` | PATCH | Manage availability and service areas |
| `/provider/earnings` | GET | Earnings dashboard and settlement reports |

## Vendor and Shop APIs

| Endpoint | Method | Description |
| --- | --- | --- |
| `/vendor/dashboard` | GET | Sales, bookings, leads, subscription, and performance summary |
| `/vendor/services` | CRUD | Service catalog, packages, staff assignment, AMC plans |
| `/vendor/products` | CRUD | Product catalog and inventory |
| `/vendor/orders` | GET/PATCH | Order management |
| `/vendor/leads` | GET/PATCH | Lead generation pipeline |
| `/vendor/subscriptions` | GET/POST | Vendor subscription and business software plans |

## Influencer APIs

| Endpoint | Method | Description |
| --- | --- | --- |
| `/influencer/kyc` | POST | Upload and verify KYC |
| `/influencer/campaigns` | GET | Available and joined campaigns |
| `/influencer/links` | POST | Generate affiliate links and referral codes |
| `/influencer/commissions` | GET | Commission tracking |
| `/influencer/withdrawals` | POST | Withdrawal request |
| `/influencer/reports` | GET | Performance reports and leaderboards |

## Franchise and City Manager APIs

| Endpoint | Method | Description |
| --- | --- | --- |
| `/franchise/territories` | GET | Assigned cities and territories |
| `/franchise/revenue` | GET | Franchise revenue tracking |
| `/franchise/vendors` | GET/PATCH | Vendor monitoring and onboarding |
| `/franchise/customers` | GET | Local customer monitoring |
| `/franchise/leads/distribute` | POST | Assign leads to vendors/providers |
| `/city-manager/dispatch` | GET/PATCH | Operational dispatch board |

## Admin APIs

| Endpoint | Method | Description |
| --- | --- | --- |
| `/admin/users` | CRUD | User management with RBAC |
| `/admin/vendors` | CRUD | Vendor management and verification |
| `/admin/franchises` | CRUD | Franchise management |
| `/admin/influencers` | CRUD | Influencer management and KYC |
| `/admin/products` | CRUD | Product management |
| `/admin/bookings` | CRUD | Booking oversight |
| `/admin/orders` | CRUD | Order oversight |
| `/admin/wallets` | GET/PATCH | Wallet management |
| `/admin/commission-rules` | CRUD | Configurable commission engine |
| `/admin/subscriptions` | CRUD | Membership, AMC, vendor, and software subscriptions |
| `/admin/coupons` | CRUD | Coupon engine |
| `/admin/taxes` | CRUD | Tax slabs and rules |
| `/admin/settlements` | GET/POST/PATCH | Settlement creation, approval, and payout |
| `/admin/reports` | GET | Reports and analytics |
| `/admin/cms` | CRUD | CMS pages, banners, categories |
| `/admin/notifications` | POST | Email, SMS, WhatsApp, push campaigns |
| `/admin/audit-logs` | GET | Audit logs and security monitoring |

## Socket.IO Events

| Event | Direction | Payload |
| --- | --- | --- |
| `tracking:join` | client -> server | `{ bookingId }` |
| `provider:location` | provider -> server | `{ bookingId, lat, lng, speed, heading }` |
| `tracking:update` | server -> customer/admin | `{ bookingId, lat, lng, etaMinutes }` |
| `booking:status` | server -> clients | `{ bookingId, status }` |
| `notification:new` | server -> user | `{ id, channel, templateKey, payload }` |

## Webhooks

| Endpoint | Description |
| --- | --- |
| `/webhooks/razorpay` | Razorpay payments, refunds, and transfer events |
| `/webhooks/cashfree` | Cashfree payment and payout events |
| `/webhooks/stripe` | Stripe payment, refund, and dispute events |
| `/webhooks/paypal` | PayPal payment capture and refund events |
| `/webhooks/whatsapp` | WhatsApp delivery and reply callbacks |
