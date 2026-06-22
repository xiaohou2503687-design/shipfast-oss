#!/usr/bin/env node
const { program } = require("commander");
const pkg = require("../package.json");

program
  .name("shipfast")
  .description("🚀 Deploy any project to production with one command")
  .version(pkg.version);

program
  .command("deploy")
  .description("Deploy current project to production")
  .option("-p, --platform <platform>", "Target platform: vercel, railway, netlify")
  .option("-e, --env <file>", "Environment file to use", ".env")
  .option("--preview", "Deploy as preview, not production")
  .option("--team <team>", "Team scope for Vercel")
  .action((opts) => {
    const deploy = require("./commands/deploy");
    deploy(opts);
  });

program
  .command("env")
  .description("Manage environment variables")
  .option("--set <key=value>", "Set an environment variable")
  .option("--get <key>", "Get an environment variable")
  .option("--list", "List all environment variables")
  .option("--pull", "Pull env vars from current deployment")
  .action((opts) => {
    const envCmd = require("./commands/env");
    envCmd(opts);
  });

program
  .command("init")
  .description("Initialize shipfast in current project")
  .action(() => {
    const initCmd = require("./commands/init");
    initCmd();
  });

program
  .command("logs")
  .description("Tail production logs")
  .option("-n, --lines <n>", "Number of log lines", "50")
  .action((opts) => {
    const logsCmd = require("./commands/logs");
    logsCmd(opts);
  });

program
  .command("status")
  .description("Show deployment status")
  .action(() => {
    const statusCmd = require("./commands/status");
    statusCmd();
  });

program.parse(process.argv);
