import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "friendscorner-website",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-01",
    compatibilityFlags: ["nodejs_compat"],
    assets: { htmlHandling: "none", notFoundHandling: "none" },
    env: {
      ASSETS: bindings.assets(),
    },
  }),
});
