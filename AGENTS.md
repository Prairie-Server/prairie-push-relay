# Repository Guidelines

## Project Structure & Module Organization

This is the production Cloudflare Worker behind `push.prairie-server.org`. Code lives in `src/`: `index.ts` defines routes, `deployment-object.ts` owns per-deployment state and quotas, and `provider-token-object.ts` signs APNs provider tokens and mints Google OAuth access tokens for FCM. Supporting logic is split across `apns.ts`, `fcm.ts`, `crypto.ts`, and `validation.ts`. Worker configuration and Durable Object migrations are in `wrangler.jsonc`. Integration tests and fixtures live in `test/` and `vitest.config.mjs`. The retired Go service remains on `legacy/go-relay`.

## Build, Test, and Development Commands

- `pnpm install --frozen-lockfile` installs pinned dependencies.
- `pnpm run check` type-checks both `src/` and `test/` without emitting files.
- `pnpm run lint` runs type-aware Oxlint on `src/` and `test/`.
- `pnpm test` runs the Vitest Worker suite once; `pnpm run test:watch` reruns tests during development.
- `pnpm run test:coverage` documents why V8 coverage is unsupported under the Workers Vitest pool and exits non-zero.
- `pnpm dev` starts a local Wrangler session using values from `.dev.vars`.
- `pnpm exec wrangler deploy --dry-run` verifies the production bundle without publishing it.

Run `pnpm run check`, `pnpm run lint`, `pnpm test`, and the Wrangler dry run before opening a pull request. Use `pnpm run deploy` only when explicitly authorized to publish production.

## Coding Style & Naming Conventions

Use strict TypeScript and ES modules. Match the existing style: two-space indentation, double quotes, semicolons, trailing commas in multiline constructs, `camelCase` functions and variables, `PascalCase` classes and interfaces, and `UPPER_SNAKE_CASE` constants. File names use lowercase kebab case, such as `provider-token-object.ts`. Prefer `pnpm run lint` plus `tsc` for style and type safety. TypeScript 7 powers both `tsc` and Oxlint type-aware linting via `oxlint-tsgolint`.

## Testing Guidelines

Tests use Vitest with `@cloudflare/vitest-pool-workers`; name files `*.test.ts` under `test/`. Add regression coverage for changes to routes, validation, APNs response mapping, quotas, idempotency, or Durable Object alarms. Tests run sequentially because fixtures share Worker and Durable Object state. `@vitest/coverage-v8` cannot instrument this pool (`node:inspector/promises` fails to resolve), so CI uses Oxlint instead of a numeric coverage floor.

## Commit & Pull Request Guidelines

Recent commits use short, imperative subjects such as `Optimize Durable Object cleanup scheduling`; scoped prefixes such as `fix:` are also accepted. Keep each commit focused. Pull requests should explain the behavior change, privacy or delivery risks, configuration impact, and commands run. Link relevant issues when available. For this API-only project, include request/response examples instead of screenshots.

## Security & Configuration Tips

Never commit `.dev.vars`, `.env*`, PEM or `.p8` keys, device tokens, raw capabilities, notification content, user identities, or server URLs. Reject unknown request fields, hash device tokens before persistence or logging, and treat ambiguous APNs transport failures as delivery-unknown rather than safe to retry.
