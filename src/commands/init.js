const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");

module.exports = function initCmd() {
  const cwd = process.cwd();
  const configPath = path.join(cwd, "shipfast.config.json");

  if (fs.existsSync(configPath)) {
    console.log(chalk.yellow("  shipfast.config.json already exists"));
    return;
  }

  const config = {
    version: 1,
    project: path.basename(cwd),
    platform: "vercel",
    buildCommand: "npm run build",
    outputDirectory: ".next",
    installCommand: "npm install",
    framework: "auto",
  };

  fs.writeJsonSync(configPath, config, { spaces: 2 });
  console.log(chalk.green("  ✓ Created shipfast.config.json"));
  console.log("");
  console.log(chalk.gray("  Next step: shipfast deploy"));
};
