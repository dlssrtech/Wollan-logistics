import { spawnSync } from 'node:child_process';

const env = { ...process.env };

// The execution environment may inject npm_config_http_proxy and
// npm_config_https_proxy. npm 11 normalizes those names to unsupported
// http-proxy/https-proxy config keys and the proxied npm audit POST can return
// 403 Forbidden. Offline audit uses the advisories already present in npm's
// cache and avoids that blocked network endpoint.
for (const key of [
  'npm_config_http_proxy',
  'npm_config_https_proxy',
  'npm_config_http-proxy',
  'npm_config_https-proxy',
]) {
  delete env[key];
}

const result = spawnSync(
  'npm',
  ['audit', '--offline', '--json'],
  { env, stdio: 'inherit' },
);

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
