const fs = require("fs-extra");
const path = require("path");

module.exports = function detectProject(cwd = process.cwd()) {
  const files = fs.readdirSync(cwd);
  const pkgPath = path.join(cwd, "package.json");
  let pkg = {};
  try { pkg = fs.readJsonSync(pkgPath); } catch(e) {}

  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const scripts = pkg.scripts || {};

  return {
    name: pkg.name || path.basename(cwd),
    type: classify(deps, scripts, files),
    packageManager: files.includes("yarn.lock") ? "yarn" :
                    files.includes("pnpm-lock.yaml") ? "pnpm" :
                    files.includes("bun.lockb") ? "bun" : "npm",
    hasEnvFile: files.includes(".env") || files.includes(".env.local") || files.includes(".env.production"),
    framework: detectFramework(deps, files),
  };
};

function classify(deps, scripts, files) {
  if (deps.next) return "nextjs";
  if (deps.react && !deps.next) return "react";
  if (deps.vue) return "vue";
  if (deps.svelte) return "svelte";
  if (deps.astro) return "astro";
  if (deps.nuxt) return "nuxt";
  if (deps.gatsby) return "gatsby";
  if (deps.express || deps.koa || deps.fastify) return "node-server";
  if (deps.django || files.includes("manage.py")) return "django";
  if (deps.flask || files.includes("app.py")) return "flask";
  if (files.includes("go.mod")) return "go";
  if (files.includes("Cargo.toml")) return "rust";
  if (files.includes("index.html")) return "static";
  return "node";
}

function detectFramework(deps, files) {
  if (deps.next) return "Next.js";
  if (deps.react && deps["react-router-dom"]) return "React SPA";
  if (deps.react) return "React";
  if (deps.vue && deps.nuxt) return "Nuxt";
  if (deps.vue) return "Vue";
  if (deps.svelte && deps["@sveltejs/kit"]) return "SvelteKit";
  if (deps.svelte) return "Svelte";
  if (deps.astro) return "Astro";
  if (deps.express) return "Express";
  if (files.includes("go.mod")) return "Go";
  return "Static";
}
