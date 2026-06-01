# Full Source Code Structure

```text
apps/
  api/
    src/
      auth/              JWT, OAuth, OTP, 2FA, sessions
      users/             Users, customers, providers, vendors, influencers, franchises
      marketplace/       Categories, services, products, inventory, search
      bookings/          Service booking lifecycle, dispatch, tracking
      orders/            Product order lifecycle, returns, bulk orders
      commissions/       Configurable rules, ledger, settlements
      payments/          Razorpay, Cashfree, Stripe, PayPal, UPI, wallet, COD
      notifications/     Email, SMS, WhatsApp, push, in-app
      ai/                Recommendations, chatbot, lead assignment, fraud, ranking
      analytics/         Revenue, LTV, CAC, retention, profitability dashboards
      admin/             Enterprise super admin and support APIs
      common/            Guards, decorators, filters, validation, config
  web/
    src/
      app/               Next.js routes for all panels
      components/        Shared UI components
      features/          Customer, vendor, influencer, franchise, admin features
      store/             Redux Toolkit slices and RTK Query APIs
      lib/               API clients, auth helpers, i18n, telemetry
  mobile/
    lib/
      customer/          Customer app screens
      provider/          Service provider app screens
      influencer/        Influencer app screens
      franchise/         Franchise/city manager screens
      shared/            Widgets, API clients, localization, routing
infra/
  k8s/                   Kubernetes deployments, services, config, ingress
.github/workflows/       CI/CD pipelines
```
