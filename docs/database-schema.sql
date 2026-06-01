-- PostgreSQL schema for Homesphere Home Services & Business Network
-- Designed for multi-city, multi-franchise, multi-vendor marketplace operations.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

CREATE TYPE user_role AS ENUM ('CUSTOMER','PROVIDER','VENDOR','SHOP_OWNER','INFLUENCER','FRANCHISE','CITY_MANAGER','SUPPORT','ADMIN','SUPER_ADMIN');
CREATE TYPE verification_status AS ENUM ('PENDING','VERIFIED','REJECTED','SUSPENDED');
CREATE TYPE booking_status AS ENUM ('DRAFT','REQUESTED','ASSIGNED','ACCEPTED','IN_PROGRESS','COMPLETED','CANCELLED','REFUNDED','DISPUTED');
CREATE TYPE order_status AS ENUM ('DRAFT','PLACED','CONFIRMED','PACKED','SHIPPED','DELIVERED','RETURN_REQUESTED','RETURNED','CANCELLED','REFUNDED');
CREATE TYPE payment_status AS ENUM ('PENDING','AUTHORIZED','CAPTURED','FAILED','REFUNDED','PARTIALLY_REFUNDED');
CREATE TYPE commission_party AS ENUM ('PLATFORM','INFLUENCER','VENDOR','PROVIDER','FRANCHISE');
CREATE TYPE notification_channel AS ENUM ('EMAIL','SMS','WHATSAPP','PUSH','IN_APP');
CREATE TYPE subscription_plan AS ENUM ('SILVER','GOLD','PREMIUM','VENDOR_BASIC','VENDOR_PRO','BUSINESS_SOFTWARE');

CREATE TABLE countries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  iso_code TEXT UNIQUE NOT NULL,
  currency_code TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_id UUID REFERENCES countries(id),
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (name, state)
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role user_role NOT NULL,
  full_name TEXT NOT NULL,
  email CITEXT UNIQUE,
  phone TEXT UNIQUE,
  password_hash TEXT,
  avatar_url TEXT,
  language_code TEXT NOT NULL DEFAULT 'en',
  is_phone_verified BOOLEAN NOT NULL DEFAULT false,
  is_email_verified BOOLEAN NOT NULL DEFAULT false,
  two_factor_enabled BOOLEAN NOT NULL DEFAULT false,
  status verification_status NOT NULL DEFAULT 'PENDING',
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE oauth_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  provider TEXT NOT NULL,
  provider_user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (provider, provider_user_id)
);

CREATE TABLE otp_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  phone TEXT,
  email CITEXT,
  otp_hash TEXT NOT NULL,
  purpose TEXT NOT NULL,
  attempts INT NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  city_id UUID NOT NULL REFERENCES cities(id),
  label TEXT NOT NULL,
  line1 TEXT NOT NULL,
  line2 TEXT,
  landmark TEXT,
  postal_code TEXT NOT NULL,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id),
  referral_code TEXT UNIQUE NOT NULL,
  referred_by_user_id UUID REFERENCES users(id),
  loyalty_points INT NOT NULL DEFAULT 0,
  lifetime_value NUMERIC(14,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE franchises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_user_id UUID NOT NULL REFERENCES users(id),
  legal_name TEXT NOT NULL,
  territory_name TEXT NOT NULL,
  status verification_status NOT NULL DEFAULT 'PENDING',
  fee_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  revenue_share_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE franchise_cities (
  franchise_id UUID REFERENCES franchises(id),
  city_id UUID REFERENCES cities(id),
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (franchise_id, city_id)
);

CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_user_id UUID NOT NULL REFERENCES users(id),
  franchise_id UUID REFERENCES franchises(id),
  city_id UUID NOT NULL REFERENCES cities(id),
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  gst_number TEXT,
  pan_number TEXT,
  status verification_status NOT NULL DEFAULT 'PENDING',
  featured_until TIMESTAMPTZ,
  rating_avg NUMERIC(3,2) NOT NULL DEFAULT 0,
  rating_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE service_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id),
  vendor_id UUID REFERENCES vendors(id),
  city_id UUID NOT NULL REFERENCES cities(id),
  kyc_status verification_status NOT NULL DEFAULT 'PENDING',
  is_available BOOLEAN NOT NULL DEFAULT false,
  attendance_status TEXT,
  rating_avg NUMERIC(3,2) NOT NULL DEFAULT 0,
  rating_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE influencers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id),
  kyc_status verification_status NOT NULL DEFAULT 'PENDING',
  referral_code TEXT UNIQUE NOT NULL,
  default_commission_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  leaderboard_score NUMERIC(14,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES categories(id),
  type TEXT NOT NULL CHECK (type IN ('SERVICE','PRODUCT','LEAD')),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id),
  vendor_id UUID REFERENCES vendors(id),
  name TEXT NOT NULL,
  description TEXT,
  base_price NUMERIC(14,2) NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 60,
  is_emergency_enabled BOOLEAN NOT NULL DEFAULT false,
  is_amc_eligible BOOLEAN NOT NULL DEFAULT false,
  tax_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id),
  vendor_id UUID NOT NULL REFERENCES vendors(id),
  sku TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  mrp NUMERIC(14,2) NOT NULL,
  selling_price NUMERIC(14,2) NOT NULL,
  dealer_price NUMERIC(14,2),
  stock_qty INT NOT NULL DEFAULT 0,
  tax_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (vendor_id, sku)
);

CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  influencer_id UUID REFERENCES influencers(id),
  vendor_id UUID REFERENCES vendors(id),
  category_id UUID REFERENCES categories(id),
  name TEXT NOT NULL,
  referral_code TEXT UNIQUE,
  affiliate_url TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  commission_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  budget_amount NUMERIC(14,2),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('PERCENT','FIXED','CASHBACK')),
  discount_value NUMERIC(14,2) NOT NULL,
  max_discount_amount NUMERIC(14,2),
  city_id UUID REFERENCES cities(id),
  category_id UUID REFERENCES categories(id),
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  usage_limit INT,
  per_user_limit INT NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  plan subscription_plan NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  benefits JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  service_id UUID NOT NULL REFERENCES services(id),
  vendor_id UUID REFERENCES vendors(id),
  provider_id UUID REFERENCES service_providers(id),
  city_id UUID NOT NULL REFERENCES cities(id),
  address_id UUID NOT NULL REFERENCES addresses(id),
  campaign_id UUID REFERENCES campaigns(id),
  coupon_id UUID REFERENCES coupons(id),
  status booking_status NOT NULL DEFAULT 'REQUESTED',
  scheduled_start TIMESTAMPTZ NOT NULL,
  scheduled_end TIMESTAMPTZ,
  subtotal NUMERIC(14,2) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  emergency_fee NUMERIC(14,2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  vendor_id UUID NOT NULL REFERENCES vendors(id),
  city_id UUID NOT NULL REFERENCES cities(id),
  address_id UUID NOT NULL REFERENCES addresses(id),
  campaign_id UUID REFERENCES campaigns(id),
  coupon_id UUID REFERENCES coupons(id),
  status order_status NOT NULL DEFAULT 'PLACED',
  subtotal NUMERIC(14,2) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  delivery_fee NUMERIC(14,2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(14,2) NOT NULL,
  tax_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(14,2) NOT NULL
);

CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id),
  balance NUMERIC(14,2) NOT NULL DEFAULT 0,
  locked_balance NUMERIC(14,2) NOT NULL DEFAULT 0,
  currency_code TEXT NOT NULL DEFAULT 'INR',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  booking_id UUID REFERENCES bookings(id),
  order_id UUID REFERENCES orders(id),
  gateway TEXT NOT NULL,
  gateway_reference TEXT,
  payment_method TEXT NOT NULL,
  status payment_status NOT NULL DEFAULT 'PENDING',
  amount NUMERIC(14,2) NOT NULL,
  tax_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  currency_code TEXT NOT NULL DEFAULT 'INR',
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE commission_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city_id UUID REFERENCES cities(id),
  category_id UUID REFERENCES categories(id),
  vendor_id UUID REFERENCES vendors(id),
  campaign_id UUID REFERENCES campaigns(id),
  product_id UUID REFERENCES products(id),
  party commission_party NOT NULL,
  percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  fixed_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  priority INT NOT NULL DEFAULT 100,
  starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ends_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID NOT NULL REFERENCES transactions(id),
  booking_id UUID REFERENCES bookings(id),
  order_id UUID REFERENCES orders(id),
  party commission_party NOT NULL,
  beneficiary_user_id UUID REFERENCES users(id),
  rule_id UUID REFERENCES commission_rules(id),
  gross_amount NUMERIC(14,2) NOT NULL,
  commission_amount NUMERIC(14,2) NOT NULL,
  tax_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE settlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  beneficiary_user_id UUID NOT NULL REFERENCES users(id),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  gross_amount NUMERIC(14,2) NOT NULL,
  deductions NUMERIC(14,2) NOT NULL DEFAULT 0,
  net_amount NUMERIC(14,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  payout_gateway TEXT,
  payout_reference TEXT,
  approved_by UUID REFERENCES users(id),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  booking_id UUID REFERENCES bookings(id),
  order_id UUID REFERENCES orders(id),
  vendor_id UUID REFERENCES vendors(id),
  provider_id UUID REFERENCES service_providers(id),
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  channel notification_channel NOT NULL,
  template_key TEXT NOT NULL,
  subject TEXT,
  body TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'QUEUED',
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  before JSONB,
  after JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_role_status ON users(role, status);
CREATE INDEX idx_bookings_city_status_schedule ON bookings(city_id, status, scheduled_start);
CREATE INDEX idx_orders_city_status_created ON orders(city_id, status, created_at);
CREATE INDEX idx_products_vendor_category ON products(vendor_id, category_id);
CREATE INDEX idx_commissions_beneficiary_status ON commissions(beneficiary_user_id, status);
CREATE INDEX idx_transactions_refs ON transactions(booking_id, order_id, status);
CREATE INDEX idx_notifications_user_status ON notifications(user_id, status);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id, created_at);
