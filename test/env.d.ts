import type { Env as WorkerEnv } from "../src/env";

declare global {
  namespace Cloudflare {
    // Cloudflare Workers ambient Env is merged via interface extension.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- required ambient merge shape
    interface Env extends WorkerEnv {}
  }
}

export {};
