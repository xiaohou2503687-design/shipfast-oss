const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");

module.exports = function envCmd(opts) {
  if (opts.set) {
    const [key, ...vals] = opts.set.split("=");
    const value = vals.join("=");
    const envPath = path.join(process.cwd(), ".env");
    let content = "";
    if (fs.existsSync(envPath)) content = fs.readFileSync(envPath, "utf-8");
    const lines = content.split("\n").filter(l => l.trim());
    const existing = lines.findIndex(l => l.startsWith(key + "="));
    if (existing >= 0) lines[existing] = `${key}=${value}`;
    else lines.push(`${key}=${value}`);
    fs.writeFileSync(envPath, lines.join("\n") + "\n");
    console.log(chalk.green(`  ✓ Set ${key}=${value}`));
  } else if (opts.get) {
    const envPath = path.join(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) return console.log(chalk.yellow("  No .env file found"));
    const content = fs.readFileSync(envPath, "utf-8");
    const line = content.split("\n").find(l => l.startsWith(opts.get + "="));
    if (line) console.log(chalk.cyan(`  ${line}`));
    else console.log(chalk.yellow(`  ${opts.get} not found`));
  } else if (opts.list) {
    const envPath = path.join(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) return console.log(chalk.yellow("  No .env file found"));
    const content = fs.readFileSync(envPath, "utf-8");
    console.log(chalk.bold("\n  Environment Variables:\n"));
    content.split("\n").filter(l => l.trim() && !l.startsWith("#")).forEach(l => {
      const [key] = l.split("=");
      console.log(chalk.gray(`  ${key} = ${chalk.dim("***")}`));
    });
    console.log("");
  } else if (opts.pull) {
    console.log(chalk.yellow("  Pull command requires Vercel team scope. Run:"));
    console.log(chalk.gray("  vercel env pull"));
  } else {
    console.log(chalk.yellow("  Usage: shipfast env --set KEY=value | --get KEY | --list | --pull"));
  }
};
