# 🚀 ShipFast CLI

**One command to deploy any project. No DevOps required.**

[![npm version](https://img.shields.io/npm/v/shipfast-cli)](https://www.npmjs.com/package/shipfast-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

```bash
npx shipfast-cli deploy
# 🔍 Detected: Next.js 14
# 📦 Building...
# 🚀 Deployed to Vercel in 12s
# 🌐 https://your-app.vercel.app
```

Stop wrestling with Dockerfiles, CI/CD configs, and cloud dashboards. ShipFast auto-detects your project and deploys it instantly.

## ⚡ Why ShipFast?

| Without ShipFast | With ShipFast |
|---|---|
| Write Dockerfile | `npx shipfast-cli deploy` |
| Configure CI/CD YAML | Done automatically |
| Set up cloud dashboard | Done automatically |
| Debug deployment errors | Done automatically |
| **2+ hours** | **12 seconds** |

## ✨ Features

- 🔍 **Auto-detection** — Next.js, React, Vue, Go, Python, Node.js, and more
- 🚀 **One-command deploy** — `shipfast deploy` and you're live
- 🔐 **Env management** — `shipfast env` manages environment variables
- 📊 **Status** — `shipfast status` shows deployment info
- 📝 **Logs** — `shipfast logs` tails production logs
- 🎯 **Multi-platform** — Vercel, Railway, Netlify

## 📦 Quick Start

```bash
# Deploy instantly
npx shipfast-cli deploy

# Or pick a platform
npx shipfast-cli deploy --platform vercel

# Manage env vars
npx shipfast-cli env --set DATABASE_URL=postgres://...

# Check status
npx shipfast-cli status

# Tail logs
npx shipfast-cli logs --lines 100
```

## 🎯 Supported Platforms

| Platform | Best For |
|---|---|
| **Vercel** | Next.js, React, Vue, Static sites |
| **Railway** | Go, Python, Node.js, Databases |
| **Netlify** | Static sites, React, Vue |

## 🛠️ Auto-Detected Frameworks

| Framework | Default Platform | Detection |
|---|---|---|
| Next.js | Vercel | `next.config.js` |
| React | Vercel | `react-scripts` |
| Vue | Vercel/Netlify | `vue.config.js` |
| Go | Railway | `go.mod` |
| Python | Railway | `requirements.txt` |
| Node.js | Railway | `package.json` (no framework detected) |

## 📦 Installation

```bash
npm install -g shipfast-cli
# or use without installing:
npx shipfast-cli deploy
```

## 💎 Premium Templates

Need production-ready configs? Grab battle-tested deploy templates:

| Pack | Price | What You Get |
|---|---|---|
| **Next.js Pro** | ¥49 ($7) | Dockerfile, vercel.json, env, GH Actions CI/CD |
| **SaaS Starter** | ¥79 ($11) | Next.js 14 + Supabase + Stripe boilerplate |
| **Docker Pack** | ¥49 ($7) | Node/Python/Go Dockerfiles, Compose, Nginx+SSL |
| **CI/CD Pack** | ¥49 ($7) | GitHub Actions + GitLab CI full pipelines |
| **Complete Bundle** | **¥149 ($21)** | All 4 + CLI + lifetime updates |

👉 **[Get Premium Templates](https://shipfast.dev)** — 30% off at launch

## 🧑‍💻 Built By

An indie developer who spent way too many weekends debugging YAML configs and decided to fix it once and for all.

[shipfast.dev@proton.me](mailto:shipfast.dev@proton.me)

## 📄 License

MIT — free to use, modify, and distribute.

---

⭐ **Star this repo** if you also hate writing deployment configs!
