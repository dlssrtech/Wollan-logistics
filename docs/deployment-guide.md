# Production Deployment Guide

## 1. Infrastructure

- AWS VPC with public and private subnets across at least three availability zones.
- EKS for Kubernetes workloads.
- RDS PostgreSQL with Multi-AZ, automated backups, point-in-time restore, and read replicas.
- ElastiCache Redis for cache, queues, Socket.IO adapter, and rate limits.
- OpenSearch or Elasticsearch for catalog and admin search.
- S3 for media, KYC documents, invoices, and exports.
- CloudFront, WAF, ACM, Route53, Secrets Manager, CloudWatch, GuardDuty, and IAM least privilege policies.

## 2. Environments

| Environment | Purpose |
| --- | --- |
| `dev` | Developer integration and preview builds |
| `staging` | Production-like QA, UAT, load testing, payment sandbox |
| `prod` | Customer-facing production |

## 3. Deployment Steps

1. Provision infrastructure using Terraform or AWS CDK.
2. Configure secrets for JWT, database, Redis, S3, payment gateways, SMS, WhatsApp, email, OAuth, and push notifications.
3. Build and push Docker images for `apps/api` and `apps/web`.
4. Apply Kubernetes manifests from `infra/k8s`.
5. Run database migrations against PostgreSQL.
6. Seed countries, cities, categories, default roles, membership plans, and commission rules.
7. Configure DNS and TLS.
8. Enable monitoring dashboards, log retention, alerting, and backup tests.
9. Run smoke tests for registration, OTP, booking, payment, commission, settlement, notifications, and admin workflows.
10. Use blue/green or canary rollout for production releases.

## 4. Operational Checks

- API p95 latency below 300 ms for catalog reads and 700 ms for booking/order writes.
- Payment webhook processing within 30 seconds.
- Notification queue lag below 2 minutes.
- Settlement reconciliation daily.
- Database backups verified weekly.
- Audit logs immutable and retained according to compliance policy.
