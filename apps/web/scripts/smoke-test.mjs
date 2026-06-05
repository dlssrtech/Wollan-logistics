const panelSlugs = ['customer', 'provider', 'shop-owner', 'influencer', 'franchise', 'city-manager', 'support', 'super-admin'];
const expectedRoutes = ['/', ...panelSlugs.map((slug) => `/panels/${slug}`)];
const webBaseUrl = process.env.WEB_BASE_URL;

if (webBaseUrl) {
  const failures = [];

  for (const route of expectedRoutes) {
    const response = await fetch(new URL(route, webBaseUrl));
    if (!response.ok) {
      failures.push(`${route} returned ${response.status}`);
    }
  }

  if (failures.length > 0) {
    console.error('Web panel smoke-test failures:');
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }
}

console.log(`Web panel smoke test passed for ${expectedRoutes.length} routes${webBaseUrl ? ` at ${webBaseUrl}` : ''}.`);
