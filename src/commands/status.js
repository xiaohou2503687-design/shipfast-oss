const chalk = require("chalk");
const { execSync } = require("child_process");

module.exports = function statusCmd() {
  console.log(chalk.bold.cyan("\n  📊 Deployment Status\n"));
  try {
    const output = execSync("vercel list --limit 5", {
      cwd: process.cwd(),
      stdio: "pipe",
    }).toString();
    console.log(chalk.gray(output));
    console.log(chalk.green("  ✓ Connected to Vercel"));
  } catch {
    console.log(chalk.yellow("  Not connected. Run: vercel login && shipfast deploy"));
  }
};
