#!/usr/bin/env node
/**
 * Vitest coverage via @vitest/coverage-v8 is not usable with
 * @cloudflare/vitest-pool-workers: the coverage provider imports
 * node:inspector/promises, which the Workers test runtime cannot load
 * (tests fail before any suite runs; coverage stays at 0/0).
 *
 * Quality gate instead: `pnpm run lint` (type-aware Oxlint) + `pnpm test`.
 * Revisit when Cloudflare documents a supported coverage path for the pool.
 */
console.error(`test:coverage is unsupported under @cloudflare/vitest-pool-workers.

Reason: @vitest/coverage-v8 pulls in node:inspector/promises, which the
Workers Vitest pool cannot resolve. Instrumentation never runs.

Use:
  pnpm run lint
  pnpm test
`);
process.exit(1);
