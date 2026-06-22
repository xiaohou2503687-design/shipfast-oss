const { execSync } = require("child_process");
const chalk = require("chalk");

module.exports.deploy = async function({ project, cwd, opts, spinner }) {
  spinner.text = "Checking Vercel CLI...";
  try {
    execSync("vercel --version", { stdio: "pipe" });
  } catch {
    spinner.text = "Installing Vercel CLI...";
    execSync("npm install -g vercel", { stdio: "pipe" });
  }

  const envFile = opts.env || ".env";
  const fs = require("fs-extra");
  if (fs.existsSync(envFile)) {
    spinner.text = `Loading env vars from ${envFile}...`;
    const envContent = fs.readFileSync(envFile, "utf-8");
    const envVars = envContent
      .split("\n")
      .filter(l => l.trim() && !l.startsWith("#"))
      .map(l => `--env ${l.trim()}`)
      .join(" ");
    if (envVars) process.env.SHIPFAST_ENV_ARGS = envVars;
  }

  const args = [
    opts.preview ? "" : "--prod",
    opts.team ? `--scope ${opts.team}` : "",
    process.env.SHIPFAST_ENV_ARGS || "",
    "-y",
  ].filter(Boolean).join(" ");

  spinner.text = `Deploying ${project.framework} project to Vercel...`;
  const startTime = Date.now();

  execSync(`vercel ${args}`, {
    cwd,
    stdio: "pipe",
    env: { ...process.env, FORCE_COLOR: "0" },
  });

  const buildTime = `${((Date.now() - startTime) / 1000).toFixed(1)}s`;

  let url = "";
  let dashboardUrl = "";
  try {
    const projectName = project.name;
    const listOutput = execSync(`vercel list ${projectName} --limit 1`, {
      cwd, stdio: "pipe", env: { ...process.env, FORCE_COLOR: "0" },
    }).toString();
    const urlMatch = listOutput.match(/https?:\/\/[^\s]+/);
    if (urlMatch) url = urlMatch[0];
    dashboardUrl = `https://vercel.com/dashboard`;
  } catch {}

  return {
    url: url || `https://${project.name}.vercel.app`,
    dashboardUrl,
    buildTime,
    platform: "vercel",
  };
};
