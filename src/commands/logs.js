const chalk = require("chalk");
const { execSync } = require("child_process");

module.exports = function logsCmd(opts) {
  const lines = opts.lines || "50";
  console.log(chalk.bold.cyan(`\n  📜 Production Logs (last ${lines} lines)\n`));
  try {
    execSync(`vercel logs --limit ${lines}`, {
      cwd: process.cwd(),
      stdio: "inherit",
    });
  } catch {
    console.log(chalk.yellow("  Could not fetch logs. Make sure Vercel CLI is installed and you\"re logged in."));
    console.log(chalk.gray("  Run: vercel login && shipfast logs"));
  }
};
