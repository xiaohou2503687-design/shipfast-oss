const { execSync, spawn } = require("child_process");
const chalk = require("chalk");
const ora = require("ora");
const path = require("path");
const fs = require("fs-extra");
const Conf = require("conf");
const detectProject = require("../utils/detect");

const config = new Conf({ projectName: "shipfast" });

module.exports = async function deploy(opts) {
  const cwd = process.cwd();
  const project = detectProject(cwd);

  console.log("");
  console.log(chalk.bold.cyan("  ⚡ ShipFast Deploy"));
  console.log(chalk.gray(`  Project: ${project.name}`));
  console.log(chalk.gray(`  Type: ${project.framework} (${project.type})`));
  console.log(chalk.gray(`  Package manager: ${project.packageManager}`));
  console.log("");

  const platform = opts.platform || config.get("defaultPlatform") || "vercel";

  const deployers = {
    vercel: "./platforms/vercel",
  };

  if (!deployers[platform]) {
    console.log(chalk.red(`  ✗ Unknown platform: ${platform}`));
    console.log(chalk.gray(`  Supported: vercel`));
    process.exit(1);
  }

  const spinner = ora("Deploying...").start();

  try {
    const deployer = require(deployers[platform]);
    const result = await deployer.deploy({ project, cwd, opts, spinner });
    spinner.succeed("Deployed!");
    console.log("");
    console.log(chalk.green.bold("  ✓ Live at: ") + chalk.cyan.underline(result.url));
    if (result.dashboardUrl) {
      console.log(chalk.gray(`  Dashboard: ${result.dashboardUrl}`));
    }
    console.log(chalk.gray(`  Build time: ${result.buildTime || "N/A"}`));
    console.log("");
    console.log(chalk.dim("  ⚡ Deployed by ShipFast CLI — shipfast.dev"));
    console.log("");
  } catch (err) {
    spinner.fail("Deploy failed");
    console.log(chalk.red(`  ${err.message}`));
    console.log("");
    console.log(chalk.yellow("  Tips:"));
    console.log(chalk.gray("  1. Make sure Vercel CLI is installed: npm i -g vercel"));
    console.log(chalk.gray("  2. Run `vercel login` first"));
    console.log(chalk.gray("  3. Try `shipfast deploy --platform vercel --preview` for preview"));
    process.exit(1);
  }
};
