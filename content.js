/* ==========================================================================
   Joytree Docs — content model
   NAV   = hierarchical sidebar (groups -> pages)
   PAGES = { key: { title, group, eyebrow, lede, md } }
   ========================================================================== */

const NAV = [
  {
    key: 'start', title: 'Getting Started',
    children: [
      { key: 'introduction', title: 'Introduction' },
      { key: 'quickstart', title: 'Quickstart' },
      { key: 'authentication', title: 'Authentication' },
    ]
  },
  {
    key: 'dashboard', title: 'Dashboard',
    children: [
      { key: 'dashboard-tour', title: 'Command Center tour' },
      { key: 'dashboard-appearance', title: 'Appearance & theme' },
    ]
  },
  {
    key: 'deploy', title: 'Deployments',
    children: [
      { key: 'deploy-overview', title: 'Overview' },
      { key: 'deploy-github', title: 'Deploy from GitHub' },
      { key: 'deploy-frameworks', title: 'Framework presets' },
      { key: 'deploy-static-vs-server', title: 'Static vs. server sites' },
      { key: 'deploy-upload', title: 'Deploy from a local folder' },
      { key: 'deploy-redeploy', title: 'Redeploy & rollbacks' },
      { key: 'deploy-autodeploy', title: 'Auto-deploy on push' },
      { key: 'deploy-logs-status', title: 'Build status & logs' },
      { key: 'deploy-stop', title: 'Stopping a deployment' },
    ]
  },
  {
    key: 'projects', title: 'Projects',
    children: [
      { key: 'projects-manage', title: 'Managing projects' },
      { key: 'projects-env', title: 'Environment variables' },
      { key: 'projects-runtime-logs', title: 'Runtime logs' },
      { key: 'projects-delete', title: 'Deleting a project' },
    ]
  },
  {
    key: 'databases', title: 'Databases',
    children: [
      { key: 'db-overview', title: 'Overview' },
      { key: 'db-postgres', title: 'PostgreSQL' },
      { key: 'db-mysql', title: 'MySQL & MariaDB' },
      { key: 'db-mongodb', title: 'MongoDB' },
      { key: 'db-redis', title: 'Redis' },
      { key: 'db-data-browser', title: 'Data Browser' },
      { key: 'db-query-studio', title: 'Query Studio' },
      { key: 'db-connecting', title: 'Connection strings' },
      { key: 'db-logs-metrics', title: 'Logs & metrics' },
      { key: 'db-migration', title: 'Data Migration' },
      { key: 'db-diff', title: 'Compare Databases' },
    ]
  },
  {
    key: 'domains', title: 'Domains & DNS',
    children: [
      { key: 'domains-custom', title: 'Custom domains' },
      { key: 'domains-dns', title: 'DNS records' },
      { key: 'domains-verify', title: 'Verification' },
      { key: 'domains-transfer', title: 'Domain transfer' },
      { key: 'domains-register', title: 'Registering a domain' },
      { key: 'domains-tlds', title: 'TLD pricing' },
    ]
  },
  {
    key: 'agent', title: 'AI Agent',
    children: [
      { key: 'agent-overview', title: 'Overview & providers' },
      { key: 'agent-dashboard', title: 'Using the agent in the dashboard' },
      { key: 'agent-start', title: 'Starting a session (CLI)' },
      { key: 'agent-manage', title: 'Status & follow-ups (CLI)' },
    ]
  },
  {
    key: 'developer', title: 'Developer API Builder',
    children: [
      { key: 'dev-flows-overview', title: 'Overview' },
      { key: 'dev-ai-versions', title: 'AI versions (v1–v4)' },
      { key: 'dev-flows-generate', title: 'Generate an API from text' },
      { key: 'dev-flows-dockerize', title: 'Dockerize & link a flow' },
    ]
  },
  {
    key: 'github', title: 'GitHub Integration',
    children: [
      { key: 'github-linking', title: 'Linking your account' },
      { key: 'github-repos', title: 'Repositories & branches' },
      { key: 'github-webhooks', title: 'Webhooks' },
    ]
  },
  {
    key: 'ssh', title: 'SSH Keys',
    children: [
      { key: 'ssh-keys', title: 'Managing SSH keys' },
    ]
  },
  {
    key: 'account', title: 'Account & Billing',
    children: [
      { key: 'account-apikey', title: 'API key management' },
      { key: 'account-billing', title: 'Billing' },
      { key: 'account-workspace', title: 'Workspace & activity' },
      { key: 'account-support', title: 'Support' },
    ]
  },
  {
    key: 'cli', title: 'CLI & Automation',
    children: [
      { key: 'cli-install', title: 'Installing the CLI' },
      { key: 'cli-reference', title: 'Full command reference' },
    ]
  },
  {
    key: 'mcp', title: 'MCP Server',
    children: [
      { key: 'mcp-overview', title: 'Overview & connecting' },
      { key: 'mcp-tools', title: 'Tool reference' },
    ]
  },
  {
    key: 'api', title: 'API Reference',
    children: [
      { key: 'api-overview', title: 'REST API overview' },
      { key: 'api-errors', title: 'Errors & rate limits' },
    ]
  },
];

const PAGES = {

  // ───────────────────────── Getting started ─────────────────────────
  introduction: {
    title: 'Introduction', group: 'Getting Started', eyebrow: 'Overview',
    lede: 'Joytree deploys, hosts, and manages your apps, databases, and domains from one dashboard, one CLI, or one API.',
    md: `
Joytree is a hosting platform built for shipping fast. Point it at a GitHub repository, or upload a folder directly, and Joytree detects your framework, builds it, and gives every project a live URL at \`https://<your-project>.joytree.site\` within minutes.

This documentation covers everything the platform can do, and every way to control it:

- **Dashboard** — the web UI at \`joytree.site/dashboard\`.
- **CLI** — the \`joytree\` command, for scripting deploys and CI pipelines.
- **REST API** — the same endpoints the dashboard and CLI call, for building your own tools.

## What you can build

Joytree hosts **static sites** (built HTML/CSS/JS output with no running process) and **server sites** (a persistent process — Node, Python, Go, Rust, Java, .NET, PHP, Bun, Deno). Alongside your app you can provision **managed databases** (PostgreSQL, MySQL, MariaDB, MongoDB, Redis), attach **custom domains**, stream **runtime logs**, manage **environment variables**, and even hand a task to the built-in **AI agent** to fix or extend your code.

:::tip
Every feature in the dashboard has a CLI command and a REST endpoint behind it. If you can click it, you can script it.
:::

## Where to start

- New to Joytree? Read the **[Quickstart](#/quickstart)**.
- Want a guided walkthrough of the dashboard itself? See the **[Command Center tour](#/dashboard-tour)**.
- Already have a project? Jump to **[Deploy from GitHub](#/deploy-github)**.
- Automating deploys? See the **[CLI reference](#/cli-reference)** or the **[REST API overview](#/api-overview)**.
- Coding with Claude in a browser tab and want it to deploy for you directly? See the **[MCP Server](#/mcp-overview)**.
`
  },

  quickstart: {
    title: 'Quickstart', group: 'Getting Started', eyebrow: 'Getting Started',
    lede: 'Go from zero to a live URL in under five minutes — from the dashboard or the terminal.',
    md: `
Joytree has two front doors that do the same thing: the **dashboard** at \`joytree.site/dashboard\`, and the **CLI**. Pick whichever fits how you work — most people use the dashboard for day-to-day project management and reach for the CLI when scripting or wiring up CI.

## Option A — From the dashboard

1. Sign in at **[joytree.site/dashboard](https://joytree.site/dashboard)**. You'll land on the **Command Center** — a real-time overview of your projects, deployments, and traffic.
2. Click **+ New Deployment** in the top of the Command Center.
3. Choose **GitHub repo**, pick the repository and branch, and Joytree auto-detects your framework and fills in sensible build/start commands. Review them, then hit **Deploy**.
4. Watch the build stream live in the deployment's **Build status & logs** panel. When it finishes, the project card flips to **Live** and shows its URL.
5. From the project page you can open **Runtime logs**, add **environment variables**, attach a **custom domain**, or provision a **database** — all without leaving the browser.

:::tip
Prefer a local folder to a git repo? Use **Browse Repos → Upload folder** on the Command Center, or drag a \`.zip\` straight onto the New Deployment screen.
:::

## Option B — From the CLI

\`\`\`bash
npm install -g @joytreesite/joytree
joytree login --api-key jtk_your_key_here   # find this under Dashboard → Settings → API Key
joytree deploy --repo https://github.com/you/my-site --name my-site
joytree logs my-site --follow
\`\`\`

Running \`joytree deploy\` with no flags starts the same interactive wizard the dashboard uses — framework detection, build/start commands, static vs. server. See **[Installing the CLI](#/cli-install)** for the full setup.

## What's next

- Take the full **[Command Center tour](#/dashboard-tour)** to see everything on the overview screen.
- Attach a **[custom domain](#/domains-custom)** instead of the \`.joytree.site\` subdomain.
- Provision a **[database](#/db-overview)** and browse its data visually with the **[Data Browser](#/db-data-browser)**.
- Turn on **[auto-deploy](#/deploy-autodeploy)** so every push to \`main\` ships automatically.
`
  },

  'cli-install': {
    title: 'Installing the CLI', group: 'CLI & Automation', eyebrow: 'CLI & Automation',
    lede: 'The joytree command wraps the full REST API in a scriptable interface.',
    md: `
:::tip
Coding with Claude in a browser tab (claude.ai chat, Cowork) rather than Claude Code or your own terminal? The CLI won't be reachable from there — see the **[MCP Server](#/mcp-overview)** instead, which lets Claude deploy and manage JoyTree directly without a terminal at all.
:::

## Install globally

\`\`\`bash
npm install -g @joytreesite/joytree
\`\`\`

## Or run without installing

\`\`\`bash
npx @joytreesite/joytree login
\`\`\`

## Verify the install

\`\`\`bash
joytree
\`\`\`

Running \`joytree\` with **no arguments** is the only way to see the command list — it prints the full set of commands grouped by feature area (account, deploy, projects, logs, environment variables, GitHub, domains, databases, AI agent, webhooks, SSH keys, billing, and support).

:::warn
The CLI does **not** support \`--help\`, \`-h\`, or a \`help\` subcommand on any command — running \`joytree domains --help\` or \`joytree agent --help\` will error with \`unknown option '--help'\`. If you need a reminder of a command's flags, run bare \`joytree\` and scan the relevant section, or check the **[Full command reference](#/cli-reference)** here.
:::

## Credentials

Once you log in, your API key is stored at:

\`\`\`text
~/.joytree/credentials.json
\`\`\`

with file permissions locked to \`600\` (owner read/write only).

### Environment variables

You can skip the local credentials file entirely by exporting:

\`\`\`bash
export JOYTREE_API_KEY=jtk_your_key_here
export JOYTREE_BASE_URL=https://joytree.site
\`\`\`

This is the recommended approach for CI pipelines and containers, where writing a credentials file to disk isn't practical.

## Upgrading

\`\`\`bash
npm update -g @joytreesite/joytree
\`\`\`
`
  },

  authentication: {
    title: 'Authentication', group: 'Getting Started', eyebrow: 'Getting Started',
    lede: 'Every CLI command and API request is authenticated with a single bearer token.',
    md: `
Joytree uses **API keys** for the CLI and REST API, and a separate session-based login (email/password, GitHub, or Google) for the web dashboard.

## API keys

API keys are prefixed \`jtk_\` and are created automatically the first time you view **Settings → API Key** on the dashboard.

\`\`\`bash
joytree login --api-key jtk_xxxxxxxxxxxxxxxxxxxxxxxx
\`\`\`

The CLI validates the key against \`GET /api/v1/ping\` before saving it, and immediately fetches your account and project list so you know it worked.

### Using a key directly with the REST API

\`\`\`bash
curl https://joytree.site/api/v1/account \\
  -H "Authorization: Bearer jtk_xxxxxxxxxxxxxxxxxxxxxxxx"
\`\`\`

## Checking your session

\`\`\`bash
joytree whoami
\`\`\`

\`\`\`text
Email     you@example.com
API Key   jtk_ab12…f9k2
Host      https://joytree.site
Config    ~/.joytree/credentials.json
\`\`\`

## Rotating a key

If a key leaks, rotate it immediately — the old key is revoked the instant a new one is issued.

\`\`\`bash
joytree apikey rotate
\`\`\`

:::warn
Rotating a key invalidates the previous one everywhere, including any CI pipelines still using it. Update those pipelines with the new key right away.
:::

## Logging out

\`\`\`bash
joytree logout
\`\`\`

This deletes \`~/.joytree/credentials.json\`. It does not revoke the key server-side — use \`apikey rotate\` for that.
`
  },

  // ───────────────────────── Dashboard ─────────────────────────
  'dashboard-tour': {
    title: 'Command Center tour', group: 'Dashboard', eyebrow: 'Dashboard',
    lede: 'A tour of joytree.site/dashboard — the real-time overview for projects, deployments, traffic, and platform health.',
    md: `
Sign in and you land on the **Command Center**, which greets you by name and gives a live snapshot of the whole platform before you drill into any one project.

## Top bar

- **Search / command palette** — jump to any project, deployment, or settings page.
- **Notifications bell** — build completions, failed deploys, domain verification results, and billing alerts.
- **Device switcher** — pin the dashboard to a specific project's live preview.
- **Profile menu** — account, billing, API key, and the theme toggle live here.

## The overview

- **Platform status banner** — "Platform online · routing healthy" (or a specific incident message if something's degraded).
- **Browse Repos** and **+ New Deployment** — the two most common actions, always one tap away.
- **Global Request Radar** — a live world map showing where your traffic is coming from right now, with a pulse on your own country when you're an active visitor. Below it: current request country, and edge/routing protection status.
- **Projects grid** — every project as a card: status dot (live / building / failed / stopped), last deploy time, and a weekly deploy count badge.
- **Recent activity feed** — deploys, env var changes, domain attachments, and agent sessions, newest first.

## Project detail pages

Clicking into a project gives you tabs for:

| Tab | What it shows |
|---|---|
| **Overview** | Live URL, current deployment, quick redeploy/stop actions |
| **Deployments** | Full history with build logs per deploy |
| **Environment** | Env var editor with reveal/hide per key |
| **Logs** | Streaming runtime logs |
| **Domains** | Attached domains and DNS status |
| **Databases** | Linked databases and connection strings |
| **Settings** | Rename, transfer, auto-deploy toggle, delete |

:::tip
Everything you can do in the Command Center has a CLI command and a REST endpoint behind it — see the **[CLI reference](#/cli-reference)** if you want to script a workflow you first discovered in the dashboard.
:::

## Where things live

- Database browsing and querying: **[Data Browser](#/db-data-browser)** and **[Query Studio](#/db-query-studio)**.
- AI-assisted coding sessions: **[Using the agent in the dashboard](#/agent-dashboard)**.
- SSH keys for git-based deploys: **[Managing SSH keys](#/ssh-keys)**.
`
  },

  'dashboard-appearance': {
    title: 'Appearance & theme', group: 'Dashboard', eyebrow: 'Dashboard',
    lede: 'The dashboard — and these docs — default to a dark theme with a green accent, matching the Joytree brand.',
    md: `
The Joytree dashboard ships **dark by default**: a near-black background with a single green accent (\`#10B981\`) used consistently for primary actions like **+ New Deployment**, status indicators like "routing healthy," and active-state highlights in the sidebar. Cards and panels sit one step lighter than the page background rather than introducing new hues, so the accent green stays the only color doing visual work.

## Switching themes

Use the sun/moon toggle in the profile menu (dashboard) or the top bar (docs). Your choice is saved locally and respected on your next visit — the platform will not silently switch you back to light mode.

:::tip
If you're building an integration or a custom preview and want to match the brand, use the accent green (\`#10B981\` / \`#34D399\` for hover states) against a near-black background (\`#09090B\`) rather than a full green wash — that's what keeps status colors (red for failed, yellow for building) legible.
:::

## Light mode

Light mode is available for accessibility and preference — it swaps the palette to a soft off-white background while keeping the same green as the brand accent, so the platform still reads as unmistakably Joytree in either mode.
`
  },

  // ───────────────────────── Deployments ─────────────────────────
  'deploy-overview': {
    title: 'Deployments Overview', group: 'Deployments', eyebrow: 'Deployments',
    lede: 'A deployment turns a repository, or a local folder, into a running site with its own URL.',
    md: `
Every project on Joytree is backed by one or more **deployments**. A deployment records the source (repo + branch, or an uploaded archive), the build configuration, and the resulting status.

## Ways to deploy

| Method | How | Best for |
|---|---|---|
| Dashboard | **+ New Deployment** → a 3-step wizard (Repository → Build config → Launch) | First-time setup, visual config, teams |
| GitHub repo (CLI) | \`joytree deploy --repo <url>\` | Apps under version control, scripting |
| Local folder (CLI) | \`joytree upload --dir ./app\` | Quick one-off deploys, no git needed |
| REST API | \`POST /api/deploy\` | Custom tooling, CI/CD |

## Lifecycle

1. **Triggered** — a deploy is queued via the dashboard, CLI, API, or an incoming GitHub webhook.
2. **Building** — install → build commands run inside an isolated build environment. The dashboard streams this live.
3. **Success / Failed** — on success the project's live URL starts serving the new build; on failure the previous version stays live and the build log shows the failure reason.

Every project gets a subdomain automatically:

\`\`\`text
https://<project-name>.joytree.site
\`\`\`

You can replace it later with a **[custom domain](#/domains-custom)**.

Next: **[Deploy from GitHub](#/deploy-github)** for the full walkthrough of the dashboard wizard.
`
  },

  'deploy-github': {
    title: 'Deploy from GitHub', group: 'Deployments', eyebrow: 'Deployments',
    lede: 'Connect a repository and Joytree builds, deploys, and hosts it automatically.',
    md: `
## From the dashboard

Click **+ New Deployment** from the Command Center or the Projects page. It's a 3-step wizard: **Repository → Build config → Launch**.

**Step 1 — Project Details**

- **Project Name** — becomes part of your subdomain.
- **Subdomain** — auto-filled from the project name, with a live availability check and a preview of the final \`<subdomain>.joytree.site\` URL. Editable independently of the project name.
- **GitHub Repository URL** — paste any public or private repo URL, or use the dropdown to pick from your already-connected GitHub repositories.
- **Branch** — pulled from the repo once it's recognized; defaults to \`main\`.

:::tip
No git repo? The same form has an **"or upload your project"** section right below the repo field — drag a ZIP, \`.tar.gz\`, \`.tgz\`, or a plain \`.html\` file (up to 250 MB) instead. See **[Deploy from a local folder](#/deploy-upload)**.
:::

**Step 2 — Build Settings** (collapsed by default; expand if you want to override anything)

- **Runtime / Framework** — a long dropdown grouped by language (Node.js, Python, Go, PHP, Ruby, Java/Kotlin, Rust, .NET, Elixir) with framework-specific entries inside each (Next.js, NestJS, Django, FastAPI, Laravel, Spring Boot, Axum, Phoenix, and more). See **[Framework presets](#/deploy-frameworks)**.
- **Install / Build / Start Command** — pre-filled per framework, always editable. Start Command only appears for Server Apps.
- **Output Directory** — where your build command writes its output (e.g. \`dist\`, \`build\`, \`public\`).
- **Site Type** — Static, or a server type per language (Node/Python/Go/PHP/Ruby/Java/Rust/.NET/Elixir). See **[Static vs. server sites](#/deploy-static-vs-server)**.
- **Custom App Port** *(optional)* — only needed if your app hardcodes a port instead of reading \`process.env.PORT\`.
- **Language version** — a version picker appears for whichever runtime you chose (e.g. Node.js 18/20 LTS, Python 3.9–3.12, Go 1.20–1.22, PHP 8.0–8.3, Ruby versions).
- **Working Directory** — for monorepos, point the build at a subfolder.
- **Environment Variables** — a Name/Value grid with an **Add Variable** button, injected into the build environment.

**Step 3 — Launch**

The right-hand **Deployment Summary** panel shows the project name, final URL, branch, and runtime version at a glance. Click **Deploy Now** to start the build — a live status line ("Starting deployment pipeline…") appears immediately, followed by streaming build logs.

## From the CLI

\`\`\`bash
joytree deploy
\`\`\`

Without flags, this runs an equivalent interactive wizard in your terminal: repo URL, project name, branch, then framework detection.

Non-interactive, for CI:

\`\`\`bash
joytree deploy \\
  --repo https://github.com/you/my-site \\
  --branch main \\
  --name my-site \\
  --build "npm run build" \\
  --start "npm start"
\`\`\`

| Flag | Description |
|---|---|
| \`-r, --repo <url>\` | GitHub repository URL |
| \`-b, --branch <branch>\` | Branch to deploy (default \`main\`) |
| \`-n, --name <name>\` | Project name / subdomain |
| \`--build <cmd>\` | Build command, e.g. \`npm run build\` |
| \`--start <cmd>\` | Start command, e.g. \`node server.js\` |
| \`--static\` | Force a static site (no server process) |
| \`-m, --message <msg>\` | Optional deploy message |

## Via the REST API

\`\`\`bash
curl -X POST https://joytree.site/api/deploy \\
  -H "Authorization: Bearer $JOYTREE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "my-site",
    "subdomain": "my-site",
    "repoUrl": "https://github.com/you/my-site",
    "branch": "main",
    "buildCmd": "npm run build",
    "startCmd": "npm start",
    "outputDir": "dist",
    "siteType": "server",
    "nodeVer": "20"
  }'
\`\`\`

:::tip
Not sure what to pass for \`buildCmd\`, \`startCmd\`, or \`siteType\`? Leave them out — Joytree falls back to auto-detection based on your repo's contents, same as picking Auto-detect in the dashboard.
:::
`
  },

  'deploy-frameworks': {
    title: 'Framework presets', group: 'Deployments', eyebrow: 'Deployments',
    lede: 'The Runtime / Framework dropdown in the deployment wizard, grouped exactly as it appears in the dashboard.',
    md: `
Expand **Build Settings** during **[+ New Deployment](#/deploy-github)** and open the **Runtime / Framework** dropdown. It's grouped by language:

| Group | Options |
|---|---|
| JavaScript / TypeScript | Node.js — Generic (Express, Koa, Hapi…) · Node.js — Next.js · Node.js — NestJS · Bun · Deno |
| Python | Django · Flask · FastAPI · Generic / Other |
| Go | Generic (net/http, Chi, Fiber…) · Gin · Echo |
| PHP | Laravel · Symfony · Generic / Plain PHP |
| Ruby | Rails · Sinatra |
| Java / JVM | Spring Boot (Java) · Quarkus (Java) · Spring Boot (Kotlin) |
| Rust | Axum · Actix-web · Generic |
| .NET | ASP.NET Core (C#) |
| Elixir | Phoenix |

Picking one pre-fills the **Install Command**, **Build Command**, **Start Command** (if it's a server type), and **Output Directory** with sensible defaults for that framework — every field stays editable.

## Common presets

| Framework | Install | Build | Start | Output |
|---|---|---|---|---|
| Node.js — Generic | \`npm install\` | \`npm run build\` | \`npm start\` | \`dist\` |
| Next.js | \`npm install\` | \`npm run build\` | \`npm start\` | \`.next\` |
| NestJS | \`npm install\` | \`npm run build\` | \`node dist/main.js\` | \`dist\` |
| Django | \`pip install -r requirements.txt\` | — | \`python manage.py runserver 0.0.0.0:$PORT\` | \`.\` |
| FastAPI | \`pip install -r requirements.txt\` | — | \`uvicorn main:app --host 0.0.0.0 --port $PORT\` | \`.\` |
| Laravel | \`composer install --no-dev\` | — | \`php artisan serve --host 0.0.0.0 --port $PORT\` | \`public\` |
| Rails | \`bundle install\` | — | \`bin/rails server -b 0.0.0.0 -p $PORT\` | \`.\` |
| Spring Boot | Maven \`dependency:resolve\` | Maven \`package\` | \`java -jar target/*.jar\` | \`.\` |

## Language / runtime versions

Whichever runtime you pick, a matching version dropdown appears:

| Runtime | Versions offered | Default |
|---|---|---|
| Node.js | 14, 16, 18, 20 | **18 LTS** (recommended) |
| Python | 3.9, 3.10, 3.11, 3.12 | **3.11** (recommended) |
| Go | 1.20, 1.21, 1.22 | **1.22** (recommended) |
| PHP | 8.0, 8.1, 8.2, 8.3 | **8.2** (recommended) |
| Ruby | shown when Ruby is selected | **3.2** (recommended) |

## Site Type

The **Site Type** dropdown (also in Build Settings) determines how your app actually runs — see **[Static vs. server sites](#/deploy-static-vs-server)**.
`
  },

  'deploy-static-vs-server': {
    title: 'Static vs. server sites', group: 'Deployments', eyebrow: 'Deployments',
    lede: 'The Site Type field in the deployment wizard — every project is one of these.',
    md: `
In **Build Settings**, the **Site Type** dropdown offers:

- **Static Site** (React, Vite, Next.js export, plain HTML) — the default
- **Server App** (Node.js / Express — needs \`npm start\`)
- **Python Server** (Django / Flask / FastAPI)
- **Go Server**
- **PHP Server** (Laravel / Symfony)
- **Ruby Server** (Rails / Sinatra)
- **Java / Kotlin Server** (Spring Boot)
- **Rust Server**
- **.NET / ASP.NET Core**
- **Elixir / Phoenix**

## Static sites

A static site is a folder of built assets (HTML/CSS/JS, or any pre-rendered output) served directly, with no process running your code after the build finishes.

Good for: marketing sites, docs (like this one), SPAs built with Vite/CRA, prerendered content.

## Server sites

Anything other than Static runs a **persistent process** — the **Start Command** field (which only appears once you pick a server type) stays alive and handles requests directly. This is required for server-side rendering, a custom backend, WebSockets, or long-running connections.

Good for: Next.js/Nuxt with SSR, REST APIs, GraphQL servers, anything in Python/Go/Rust/Java/.NET/PHP/Ruby/Elixir.

:::tip
Picking a framework in **Runtime / Framework** often implies a Site Type automatically (Next.js → Server App, Vite → Static Site) — you won't need to touch this field unless you're overriding the default, and it's always overridable.
:::

## Custom port

If your server app hardcodes a port instead of reading \`process.env.PORT\`, set it explicitly in **Custom App Port** (Build Settings) — otherwise leave it blank for auto-assignment.
`
  },

  'deploy-upload': {
    title: 'Deploy from a local folder', group: 'Deployments', eyebrow: 'Deployments',
    lede: 'No git repository? Upload a ZIP, tarball, or a single HTML file directly.',
    md: `
## From the dashboard

The **+ New Deployment** form has an **"or upload your project"** section right under the GitHub repo field:

1. Drag a file onto the dropzone, or click it to browse.
2. Accepted types: \`.html\`, \`.zip\`, \`.tar.gz\`, \`.tgz\` — up to **250 MB**.
3. Once a file is selected, it shows as a ready-to-deploy card with its name and size (with a ✕ to remove and pick a different file).
4. Fill in **Build Settings** the same way as a GitHub deploy, then click **Deploy Now**.

## From the CLI

\`\`\`bash
joytree upload --dir ./my-app --name my-app
\`\`\`

| Flag | Description |
|---|---|
| \`--dir <path>\` | Directory to deploy (default: current directory) |
| \`-n, --name <name>\` | Project name / subdomain |

## What happens under the hood

1. Your folder or file is archived/uploaded and sent to \`POST /api/upload-project\`.
2. Joytree extracts it, then triggers a build via \`POST /api/upload-deploy\`.
3. The same build pipeline (install → build → start) runs as for a GitHub-sourced deploy.

:::warn
This path skips GitHub entirely, which means **auto-deploy on push** isn't available for uploaded projects — redeploying means uploading again from the dashboard, or running \`joytree upload\` / \`joytree redeploy\` from the CLI.
:::
`
  },

  'deploy-redeploy': {
    title: 'Redeploy & rollbacks', group: 'Deployments', eyebrow: 'Deployments',
    lede: 'Trigger a fresh build from a project\'s existing configuration, or check recent deploy history.',
    md: `
## Redeploy

Re-runs the build using the exact repo, branch, and build/start commands already saved on the project — nothing to re-type.

\`\`\`bash
joytree redeploy my-site
\`\`\`

This is the fastest way to pick up a new commit on the same branch without going through \`joytree deploy\` again, and it's also the standard way to retry after fixing a failed build.

## Viewing deployment history

\`\`\`bash
joytree deployments my-site
joytree deployments my-site --limit 20
\`\`\`

\`\`\`text
● success  my-site   6/28/2026, 4:12:09 PM
    branch: main  41s
● failed   my-site   6/27/2026, 11:03:44 AM
    branch: main  12s
\`\`\`

Each row shows status, timestamp, branch, and build duration. Pass a project name to filter, or omit it to see the most recent deployments across your whole workspace.

## Opening the live site

\`\`\`bash
joytree open my-site
\`\`\`

Opens \`https://my-site.joytree.site\` in your default browser.
`
  },

  'deploy-autodeploy': {
    title: 'Auto-deploy on push', group: 'Deployments', eyebrow: 'Deployments',
    lede: 'Ship automatically whenever you push to your connected branch.',
    md: `
Every GitHub-connected project can enable auto-deploy, which registers a webhook on your repository. A push to the tracked branch triggers a build with no manual step.

\`\`\`bash
joytree autodeploy my-site --enable
joytree autodeploy my-site --disable
\`\`\`

## How it works

1. Joytree registers a webhook against \`POST /api/github/webhook/:projectId\`.
2. GitHub calls that endpoint on every push.
3. If the pushed branch matches the project's tracked branch, a new deployment starts automatically using the saved build configuration.

## Checking status

The dashboard shows a toggle per project; the CLI mirrors it with the \`--enable\`/\`--disable\` flags. There isn't a separate "read" command — \`joytree inspect <project-id>\` includes the current auto-deploy state alongside the rest of the project's configuration.

:::tip
Auto-deploy only applies to GitHub-connected deployments. Projects deployed via \`joytree upload\` have no repository to watch, so redeploy manually with \`joytree redeploy\` or \`joytree upload\` again.
:::
`
  },

  'deploy-logs-status': {
    title: 'Build status & logs', group: 'Deployments', eyebrow: 'Deployments',
    lede: 'Watch a build in real time, and dig into failures without leaving the terminal.',
    md: `
## Live build status

When you run \`joytree deploy\` or \`joytree redeploy\`, the CLI polls automatically and renders a spinner until the build resolves:

\`\`\`text
⠼ Building... (Ctrl+C to detach)
\`\`\`

On success:

\`\`\`text
🎉 🎉 🎉  Congratulations! Your site is live!  🎉 🎉 🎉

Live URL   https://my-site.joytree.site
\`\`\`

On failure, the CLI prints the failure reason directly and points you to full logs:

\`\`\`text
✖ Build failed: exited with code 1
ℹ View full logs: joytree logs my-site
\`\`\`

## Detaching

Press **Ctrl+C** while a build is polling to detach without cancelling it — the build keeps running server-side. Reattach with:

\`\`\`bash
joytree deployments my-site
\`\`\`

## Runtime vs. build logs

Build logs cover the install/build phase only. For logs from your **running** app, see **[Runtime logs](#/projects-runtime-logs)**.
`
  },

  'deploy-stop': {
    title: 'Stopping a deployment', group: 'Deployments', eyebrow: 'Deployments',
    lede: 'Cancel a build that\'s currently in progress.',
    md: `
\`\`\`bash
joytree stop <deploy-id>
\`\`\`

This cancels an in-flight build via \`POST /api/deploy/:deployId/stop\`. The project's previously live version keeps serving traffic uninterrupted — stopping a deploy never takes your site offline.

Find a deploy's ID from its deployment history:

\`\`\`bash
joytree deployments my-site
\`\`\`

:::warn
Stopping only works on **in-progress** builds. A completed deployment (success or failed) can't be stopped — redeploy instead.
:::
`
  },

  // ───────────────────────── Projects ─────────────────────────
  'projects-manage': {
    title: 'Managing projects', group: 'Projects', eyebrow: 'Projects',
    lede: 'List, inspect, and clean up everything in your workspace.',
    md: `
## List your projects

\`\`\`bash
joytree projects
joytree projects --json
\`\`\`

\`\`\`text
my-site      →  https://my-site.joytree.site
  repo: https://github.com/you/my-site  branch: main
docs-site    →  https://docs-site.joytree.site
  repo: https://github.com/you/docs-site  branch: main
\`\`\`

## Inspect a project

\`\`\`bash
joytree inspect my-site
\`\`\`

Returns everything saved against the project: ID, subdomain, live URL, repo, branch, build/start commands, whether it's static, auto-deploy state, Node version, and creation date.

## Delete a project

\`\`\`bash
joytree delete my-site
joytree delete my-site --yes   # skip the confirmation prompt
\`\`\`

:::warn
Deleting a project is irreversible. It removes the deployment, its build history, and frees the subdomain — but does **not** delete any attached database. Databases are deleted separately from \`joytree db delete\`.
:::
`
  },

  'projects-env': {
    title: 'Environment variables', group: 'Projects', eyebrow: 'Projects',
    lede: 'Keep secrets and configuration out of your codebase, per project.',
    md: `
## From the dashboard

Open a project → **Environment** tab. Variables show as a **Name / Value** grid:

- Click **Add Variable** to append a new row, then fill in the name and value.
- Existing values can be revealed or hidden per-row, and edited or removed inline.
- The same **Environment Variables** panel also appears inside the **+ New Deployment** wizard under Build Settings, so you can set variables before the first deploy instead of adding them afterward.

## From the CLI

**Listing:**

\`\`\`bash
joytree env list my-site
\`\`\`

Values are masked in the terminal (\`DA**********\`) — the CLI never prints a secret in full once it's saved.

**Setting one or more variables:**

\`\`\`bash
joytree env set my-site DATABASE_URL=postgres://... SECRET_KEY=abc123
\`\`\`

You can set any number of \`KEY=VALUE\` pairs in a single call.

**Deleting a variable:**

\`\`\`bash
joytree env delete my-site SECRET_KEY
\`\`\`

**Pushing a local \`.env\` file:**

\`\`\`bash
joytree env push my-site
joytree env push my-site --file prod.env --force
\`\`\`

| Flag | Description |
|---|---|
| \`--file <path>\` | Path to the env file (default \`.env\`) |
| \`--force\` | Overwrite all existing variables instead of merging |

The parser skips blank lines and \`#\` comments, and strips surrounding quotes from values automatically.

:::tip
Env vars take effect on the **next deployment**, whether you changed them in the dashboard or the CLI. After changing them, redeploy (dashboard: project → **Redeploy**; CLI: \`joytree redeploy my-site\`) to apply them to the running site.
:::
`
  },

  'projects-runtime-logs': {
    title: 'Runtime logs', group: 'Projects', eyebrow: 'Projects',
    lede: 'Stream stdout/stderr from your live app in real time.',
    md: `
\`\`\`bash
joytree logs my-site
joytree logs my-site --follow
joytree logs my-site --lines 100
\`\`\`

| Flag | Description |
|---|---|
| \`-f, --follow\` | Keep the connection open and stream new lines as they arrive |
| \`--lines <n>\` | Number of historical lines to fetch (default \`50\`) |

## How it works

Runtime logs are delivered over **Server-Sent Events** from:

\`\`\`text
GET /api/projects/:id/runtime-logs
\`\`\`

The CLI connects, prints each event as a line, and color-codes by level — errors in red, warnings in yellow. Without \`--follow\`, the connection closes automatically a few seconds after the initial burst; with it, the stream stays open until you press **Ctrl+C**.

\`\`\`bash
curl -N https://joytree.site/api/projects/my-site/runtime-logs \\
  -H "Authorization: Bearer $JOYTREE_API_KEY" \\
  -H "Accept: text/event-stream"
\`\`\`

:::tip
Only server sites produce runtime logs continuously — static sites have no running process, so \`joytree logs\` on a static project shows nothing beyond the initial deploy output.
:::
`
  },

  'projects-delete': {
    title: 'Deleting a project', group: 'Projects', eyebrow: 'Projects',
    lede: 'Remove a project and free its subdomain.',
    md: `
\`\`\`bash
joytree delete my-site
\`\`\`

You'll be asked to type \`yes\` to confirm. Skip the prompt in scripts with:

\`\`\`bash
joytree delete my-site --yes
\`\`\`

## What gets removed

- The deployment and its build history
- The project's subdomain (\`my-site.joytree.site\` becomes available again)
- Runtime logs

## What's kept

- Attached databases (delete separately with \`joytree db delete\`)
- Custom domains (detach with \`joytree domains remove\` first)
- SSH keys and GitHub links, which are account-level, not project-level

:::warn
There's no recovery for a deleted project. If you need the code back, it still exists in your GitHub repository — only the Joytree deployment is gone.
:::
`
  },

  // ───────────────────────── Databases ─────────────────────────
  'db-overview': {
    title: 'Databases overview', group: 'Databases', eyebrow: 'Databases',
    lede: 'Provision a managed database in the same workspace as your app — no separate hosting account needed.',
    md: `
Joytree provisions and manages five database engines, each a real Docker-backed container with its own persistent volume: **MongoDB**, **PostgreSQL**, **MySQL**, **MariaDB**, and **Redis**.

## From the dashboard

1. Go to **Databases** in the sidebar, then click **Create Database**.
2. Open the **Database Type** dropdown and pick an engine — MongoDB, PostgreSQL, MySQL, Redis, or MariaDB.
3. Fill in **Configuration**:
   - **Database Name** *(required)* — lowercase letters, numbers, and hyphens only, max 40 characters.
   - **Database Username** — not shown for Redis, which has no user/database concept.
   - **Password** *(required)*.
   - **Initial Database / Schema Name** — also hidden for Redis.
4. Open **Advanced** if you want to change anything from the defaults:
   - **Memory Limit** — 256 MB (minimal) or 512 MB (max on the free tier).
   - **Link to Project** *(optional)* — auto-injects the connection string into that project as the \`DATABASE_URL\` env var, so you don't have to copy/paste it yourself.
5. Click **Create**. The instance provisions in under a minute.

:::tip
Linking a database to a project during creation saves a step later — the project gets \`DATABASE_URL\` immediately without a manual **[env push](#/projects-env)**.
:::

## From the CLI

\`\`\`bash
joytree db create --type postgres --name mydb
\`\`\`

Without \`--type\`/\`--name\`, this drops into the same interactive wizard as the dashboard form: pick an engine, name the database, set credentials, and choose a memory tier.

## Listing & lifecycle

\`\`\`bash
joytree db list
joytree db start <db-id>
joytree db stop <db-id>
joytree db restart <db-id>
joytree db delete <db-id>
\`\`\`

The same actions — start, stop, restart, delete — are available as buttons on each database's detail page in the dashboard.

Once provisioning finishes, you'll get both an internal and an external connection string — see **[Connection strings](#/db-connecting)**.
`
  },

  'db-postgres': {
    title: 'PostgreSQL', group: 'Databases', eyebrow: 'Databases · Engines',
    lede: 'A managed PostgreSQL instance (postgres:16), provisioned in under a minute.',
    md: `
## Creating one

**Dashboard:** Databases → Create Database → select **PostgreSQL** from the Database Type dropdown → fill in Database Name, Database Username, Password, and Initial Database / Schema Name → Create.

**CLI:**

\`\`\`bash
joytree db create --type postgres --name mydb
\`\`\`

## Connecting

\`\`\`js
const { Client } = require('pg');
const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
\`\`\`

\`\`\`python
import psycopg2
conn = psycopg2.connect(os.environ["DATABASE_URL"])
\`\`\`

## With Prisma

\`\`\`bash
DATABASE_URL="postgres://user:pass@host:port/db"
\`\`\`

Add that line to your project's \`.env\`, then push it with:

\`\`\`bash
joytree env push my-site
\`\`\`

Or skip the manual step entirely by setting **Link to Project** when you first create the database — see **[Databases overview](#/db-overview)**.

See **[Connection strings](#/db-connecting)** for the difference between internal and external URLs.
`
  },

  'db-mysql': {
    title: 'MySQL & MariaDB', group: 'Databases', eyebrow: 'Databases · Engines',
    lede: 'Two separate engines (mysql:8 and mariadb:11) that share the same wire protocol and connection interface.',
    md: `
## Creating one

**Dashboard:** Databases → Create Database → select **MySQL** or **MariaDB** from the Database Type dropdown → fill in Database Name, Database Username, Password, and Initial Database / Schema Name → Create.

**CLI:**

\`\`\`bash
joytree db create --type mysql --name mydb
joytree db create --type mariadb --name mydb
\`\`\`

## Connecting

\`\`\`js
const mysql = require('mysql2/promise');
const conn = await mysql.createConnection(process.env.DATABASE_URL);
\`\`\`

\`\`\`python
import pymysql
conn = pymysql.connect(host="HOST", user="USER", password="PASS", database="DB")
\`\`\`

## With Prisma

\`\`\`bash
DATABASE_URL="mysql://user:pass@host:port/db"
\`\`\`

:::tip
MariaDB is wire-compatible with MySQL, so any MySQL client library works against either engine unchanged.
:::
`
  },

  'db-mongodb': {
    title: 'MongoDB', group: 'Databases', eyebrow: 'Databases · Engines',
    lede: 'A managed MongoDB instance (mongo:7) for document-oriented workloads.',
    md: `
## Creating one

**Dashboard:** Databases → Create Database → select **MongoDB** from the Database Type dropdown → fill in Database Name, Database Username, Password, and Initial Database / Schema Name → Create.

**CLI:**

\`\`\`bash
joytree db create --type mongodb --name mydb
\`\`\`

## Connecting

\`\`\`js
const mongoose = require('mongoose');
await mongoose.connect(process.env.DATABASE_URL);
\`\`\`

\`\`\`js
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DATABASE_URL);
await client.connect();
\`\`\`

\`\`\`python
from pymongo import MongoClient
client = MongoClient(os.environ["DATABASE_URL"])
\`\`\`
`
  },

  'db-redis': {
    title: 'Redis', group: 'Databases', eyebrow: 'Databases · Engines',
    lede: 'An in-memory store (redis:7) for caching, queues, and session data.',
    md: `
## Creating one

**Dashboard:** Databases → Create Database → select **Redis** from the Database Type dropdown. Redis has no user/database concept, so the form only asks for a **Database Name** and **Password** — the username and initial database fields are hidden automatically → Create.

**CLI:**

\`\`\`bash
joytree db create --type redis --name mycache
\`\`\`

## Connecting

\`\`\`js
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);
\`\`\`

\`\`\`js
const { createClient } = require('redis');
const client = createClient({ url: process.env.REDIS_URL });
await client.connect();
\`\`\`

\`\`\`python
import redis
r = redis.from_url(os.environ["REDIS_URL"])
\`\`\`
`
  },

  'db-data-browser': {
    title: 'Data Browser', group: 'Databases', eyebrow: 'Databases · Dashboard',
    lede: 'A Firebase-style collection viewer for your databases, with inline editing — no query language required.',
    md: `
The **Data Browser** is a dashboard-only tool for looking at and editing your data visually. Open it from a project's **Databases** tab, or directly from a database's own page.

## What it does

- Lists every table / collection in the connected database down the left side.
- Shows rows as a spreadsheet-style grid for relational databases (PostgreSQL, MySQL, MariaDB), or as nested documents for MongoDB, with expand/collapse for nested objects and arrays.
- **Inline editing** — double-click a cell to edit it in place. Changes save on blur, with a brief undo toast in case you edited the wrong row.
- Add or delete rows/documents directly from the grid, without writing INSERT/DELETE statements.
- Filter and sort by clicking column headers, for quick lookups without opening Query Studio.

:::tip
The Data Browser is meant for quick inspection and small edits. For anything involving joins, aggregations, or bulk updates, switch to **[Query Studio](#/db-query-studio)** — the two share the same connection and you can jump between them without reconnecting.
:::

## Redis and key-value data

For Redis databases, the Data Browser lists keys with their type (string, hash, list, set, sorted set) and lets you inspect and edit values per key, including TTL.

:::warn
Inline edits write directly to the live database — there's no separate staging step. Double-check the row before saving, especially in production databases.
:::
`
  },

  'db-query-studio': {
    title: 'Query Studio', group: 'Databases', eyebrow: 'Databases · Dashboard',
    lede: 'Run real queries against any linked database, right from the dashboard, on desktop or mobile.',
    md: `
**Query Studio** is a full query editor built into the dashboard, with syntax highlighting and a results grid. It supports every database engine Joytree can provision:

| Engine | Query language |
|---|---|
| PostgreSQL | SQL |
| MySQL & MariaDB | SQL |
| MongoDB | MongoDB query syntax / aggregation pipeline |
| Redis | Redis commands |

## Using it

1. Open a database from the **Databases** tab and click **Query Studio**.
2. Pick the target table/collection from the schema sidebar, or write a query from scratch.
3. Run with the ▶ button or \`Ctrl/Cmd + Enter\`. Results render in a sortable, paginated grid below the editor.
4. Save frequently-used queries as snippets for quick reuse.

\`\`\`sql
select id, email, created_at
from users
where created_at > now() - interval '7 days'
order by created_at desc;
\`\`\`

## Multiple result tabs

Each query you run opens in its own results tab, so you can compare output from a few different queries side by side without losing earlier results.

## Mobile

Query Studio works on the mobile dashboard too. The editor keeps a monospace, syntax-highlighted view with a compact toolbar for running queries and switching result tabs — line-by-line diffing and very large multi-thousand-row grids are easier on a larger screen, but day-to-day querying, edits, and checks all work from a phone.

:::tip
Long-running or destructive queries (large deletes, table alterations) are best run from a desktop session where you can watch the full execution log.
:::
`
  },

  'db-connecting': {
    title: 'Connection strings', group: 'Databases', eyebrow: 'Databases',
    lede: 'Every database exposes two connection strings — pick the right one for where your code runs.',
    md: `
| | Use from | Speed |
|---|---|---|
| **Internal** | Other projects hosted on Joytree | Fastest — same network |
| **External** | Your laptop, CI, or any host outside Joytree | Slightly slower, works anywhere |

Both strings are visible any time on the database's detail page in the dashboard (**Databases → your database**), and are printed once by the CLI right after creation:

\`\`\`text
Connection Strings
──────────────────────────────
Internal   postgres://user:••••@internal-host:5432/db
  Use this from other projects deployed on Joytree (same host).

External   postgres://user:••••@external-host:5432/db
  Use this to connect from outside Joytree (your laptop, another server).
\`\`\`

:::tip
Since you set the password yourself in the **Create Database** form, you already have it — but treat it the same as any production credential and store it in a password manager rather than relying on the dashboard as your only copy.
:::

## Wiring it into a project

If you set **Link to Project** when creating the database, this is already done — the project has \`DATABASE_URL\` set automatically. Otherwise:

\`\`\`bash
joytree env set my-site DATABASE_URL="postgres://user:pass@internal-host:5432/db"
joytree redeploy my-site
\`\`\`

Or add it from the dashboard: open the project → **Environment** tab → **Add Variable**.

Use the **internal** URL whenever the consuming app is also hosted on Joytree — it avoids a hop over the public internet.
`
  },

  'db-logs-metrics': {
    title: 'Logs & metrics', group: 'Databases', eyebrow: 'Databases',
    lede: 'Check on a database\'s health without leaving the terminal.',
    md: `
## Streaming logs

\`\`\`bash
joytree db logs <db-id>
\`\`\`

Like project runtime logs, database logs stream over Server-Sent Events and are color-coded by level (\`error\`, \`warn\`, everything else).

## Status at a glance

\`\`\`bash
joytree db list
\`\`\`

\`\`\`text
● running  mydb      [postgres]  id: db_8x2n1q
   postgres://user:••••@internal-host:5432/db
● stopped  mycache   [redis]     id: db_9k0p3z
\`\`\`

## Programmatic access

Metrics and health checks are also exposed directly on the REST API for building your own dashboards:

\`\`\`text
GET  /api/databases/:id/metrics
GET  /api/databases/:id/ping
POST /api/databases/:id/query
\`\`\`

\`/api/databases/:id/query\` lets trusted tooling run a query against the database directly through the API — useful for one-off admin scripts without opening a client shell.
`
  },

  'db-migration': {
    title: 'Data Migration', group: 'Databases', eyebrow: 'Databases',
    lede: 'Move data into a Joytree database from anywhere — another Joytree database, a real MongoDB Atlas cluster, a Firebase Realtime Database, or an external MySQL/PostgreSQL/MariaDB/Redis instance — regardless of engine.',
    md: `
Data Migration copies everything from a **source** into a **destination**, translating between data models automatically where needed (document ↔ relational ↔ key/value). The destination is always one of your own Joytree databases. The source can be:

- **Another Joytree database** — copy data between two of your own instances.
- **MongoDB Atlas** (or any external Mongo cluster) — not Docker-provisioned.
- **Firebase Realtime Database** — pulls the whole tree in one pass.
- **External MySQL, PostgreSQL, or MariaDB** — any server reachable by connection string.
- **External Redis** — any instance reachable by connection string.

Cross-engine moves are fully supported — Mongo to MySQL, Firebase to Postgres, Redis to MariaDB, and so on. Each table/collection/key becomes a collection on the read side; the writer for whatever engine you're migrating into decides how to represent that data natively (rows for SQL, documents for Mongo, hash keys for Redis).

:::warn
A MongoDB connection string **must include a database name** — the part after the last \`/\` before any \`?\`. Atlas's default "Copy connection string" button gives you something like \`mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true\`, with **no database name at all**. Without one, MongoDB silently falls back to its own default database named \`test\` — meaning a migration could run "successfully" while reading from the wrong (probably empty) database, with no error at all. Add the name explicitly: \`mongodb+srv://user:pass@cluster.mongodb.net/YOUR_DB_NAME?retryWrites=true\`. The dashboard, CLI, and MCP tool all check for this and refuse to proceed without it.
:::

## From the dashboard

1. Go to **Databases** in the sidebar, then open **Data Migration**.
2. Pick a **source**: JoyTree Database, MongoDB Atlas, Firebase Realtime DB, MySQL, PostgreSQL, MariaDB, or Redis. External sources ask for a connection string (and Firebase asks for its database URL plus an optional legacy database secret, only needed if your RTDB security rules require auth).
3. Pick a **destination** — always one of your own provisioned Joytree databases.
4. Click **Start Migration**. It runs in the background; **Migration History** below shows live progress and, once finished, the full result (collections/rows moved) or error with logs.

Each history entry can be deleted individually, or cleared all at once with **Clear All** — migrations still in progress are always left running untouched by either action.

## From the CLI

\`\`\`bash
joytree migrate start
\`\`\`

With no flags, this drops into the same interactive wizard as the dashboard: pick a source kind, fill in its fields, then pick a destination database.

For scripting or CI, pass everything as flags instead:

\`\`\`bash
# From another Joytree database
joytree migrate start --source-kind joytree --source-database-id <id> --destination-id <id>

# From MongoDB Atlas — note the database name in the connection string
joytree migrate start --source-kind mongo \\
  --connection-string "mongodb+srv://user:pass@cluster.mongodb.net/mydb" \\
  --destination-id <id>

# From Firebase Realtime Database
joytree migrate start --source-kind firebase --firebase-url https://your-project-default-rtdb.firebaseio.com --destination-id <id>

# From an external MySQL/PostgreSQL/MariaDB server
joytree migrate start --source-kind sql --sql-engine mysql \\
  --connection-string "mysql://user:pass@host:3306/mydb" \\
  --destination-id <id>

# From an external Redis instance
joytree migrate start --source-kind redis --connection-string "redis://:password@host:6379" --destination-id <id>
\`\`\`

Add \`--wait\` to any of the above to block and poll until the migration finishes, instead of returning immediately with just a job id.

\`\`\`bash
joytree migrate list                 # every migration, most recent first
joytree migrate status <job-id>      # progress, result, and logs for one migration
joytree migrate delete <job-id>      # remove one history entry
joytree migrate clear                # remove ALL history (running migrations untouched)
\`\`\`

## From the MCP Server

The MCP server exposes the same feature as five tools: \`joytree_start_migration\`, \`joytree_list_migrations\`, \`joytree_get_migration\`, \`joytree_delete_migration\`, and \`joytree_clear_migration_history\` — see the **[Tool reference](#/mcp-tools)** for full parameters.

## Notes & limits

- Each table/collection/key is capped at 50,000 rows per migration — designed for moving working datasets and test/staging data, not multi-million-row production tables.
- External connection strings are used once, for the duration of that migration, and are never stored.
- A migration that's still running can't be deleted from history — wait for it to finish first.
`
  },

  'db-diff': {
    title: 'Compare Databases', group: 'Databases', eyebrow: 'Databases',
    lede: 'Compare any two databases — even across completely different engines — and see exactly what\'s added, removed, and changed.',
    md: `
Compare Databases reports exactly what differs between two databases, collection by collection and row by row — even when the two sides are completely different engines (a MongoDB collection vs. a PostgreSQL table vs. a Redis keyspace). This works because every source is already normalized to the same shape for migrations (a collection is just a name plus a list of rows); the comparison never needs to know which engine either side actually is.

Both sides use the exact same source types as [Data Migration](#/db-migration): **another Joytree database**, **MongoDB Atlas**, **Firebase Realtime Database**, **external MySQL/PostgreSQL/MariaDB**, or **external Redis**.

Rows are matched by identity, not position, so reordered or reinserted data still compares correctly:

- If a common id-like field exists (\`_id\`, \`id\`, \`uuid\`, etc.), rows are matched by that field.
- Otherwise (schemaless/keyless data), rows are matched by a content hash — so even a Redis keyspace with no id concept at all still compares meaningfully, rather than being reported as 100% added and 100% removed.

For each collection, the report gives you:

- **Added** — present in Database B, not in Database A.
- **Removed** — present in Database A, not in Database B.
- **Changed** — present in both, with field-level before/after values for exactly what's different.
- **Unchanged** — present in both, identical.

## From the dashboard

1. Go to **Databases** in the sidebar, then open **Compare Databases**.
2. Pick a source for **Database A** and **Database B** — either one of your own Joytree databases, or an external connection.
3. Click **Compare**. Results appear below: summary counts at the top, then a collapsible breakdown per collection — click any collection with differences to expand the changed/added/removed rows.

## From the CLI

\`\`\`bash
joytree diff
\`\`\`

With no flags, this drops into the same interactive wizard used for each side (pick a source kind, fill in its fields) — once for Database A, once for Database B.

For scripting, pass everything as flags instead, prefixed \`--a-\` and \`--b-\`:

\`\`\`bash
joytree diff \\
  --a-source-kind joytree --a-database-id <id> \\
  --b-source-kind joytree --b-database-id <id>

# Compare a Joytree database against an external Postgres server
joytree diff \\
  --a-source-kind joytree --a-database-id <id> \\
  --b-source-kind sql --b-sql-engine postgres --b-connection-string "postgresql://user:pass@host:5432/mydb"
\`\`\`

Add \`--json\` to print the raw report instead of the formatted summary — useful for piping into other tooling or CI checks.

## From the MCP Server

The MCP server exposes this as \`joytree_compare_databases\` — see the **[Tool reference](#/mcp-tools)** for full parameters. Both \`databaseA\` and \`databaseB\` use the same source shape as \`joytree_start_migration\`.

## Notes & limits

- Like Data Migration, each collection reads up to 50,000 rows per side — designed for comparing working datasets and staging/production snapshots, not multi-million-row tables.
- The response includes exact counts always, but caps example rows shown per added/removed/changed bucket at 200 per collection.
- External connection strings are used once, for the duration of the comparison, and are never stored.
`
  },

  // ───────────────────────── Domains ─────────────────────────
  'domains-custom': {
    title: 'Custom domains', group: 'Domains & DNS', eyebrow: 'Domains',
    lede: 'Replace the .joytree.site subdomain with your own domain.',
    md: `
## Attach a domain

\`\`\`bash
joytree domains attach example.com my-site
\`\`\`

This points \`example.com\` at your project. DNS propagation can take a few minutes depending on your registrar's TTL settings.

## List your domains

\`\`\`bash
joytree domains list
\`\`\`

\`\`\`text
example.com   ✓ verified
   → project: my-site
staging.example.com   ⚠ unverified
   → project: staging-site
\`\`\`

## Remove a domain

\`\`\`bash
joytree domains remove example.com
\`\`\`

See **[DNS records](#/domains-dns)** for the records you need at your registrar, and **[Verification](#/domains-verify)** for confirming it worked.
`
  },

  'domains-dns': {
    title: 'DNS records', group: 'Domains & DNS', eyebrow: 'Domains',
    lede: 'View and manage the DNS records backing a domain.',
    md: `
## Viewing records

\`\`\`bash
joytree domains dns example.com
\`\`\`

\`\`\`text
A       @                     →  76.223.10.14   ttl:3600
CNAME   www                   →  example.com    ttl:3600
TXT     _joytree-verify       →  jtv=8f2a1c9e    ttl:3600
\`\`\`

## Adding a record

\`\`\`bash
joytree domains dns-add example.com \\
  --type CNAME --host www --value example.com --ttl 3600
\`\`\`

Without flags, this prompts interactively for record type, host, and value.

| Flag | Description |
|---|---|
| \`--type <type>\` | \`A\`, \`CNAME\`, \`MX\`, or \`TXT\` |
| \`--host <host>\` | Subdomain/host, use \`@\` for the root |
| \`--value <value>\` | Record target |
| \`--ttl <ttl>\` | Time-to-live in seconds (default \`3600\`) |

:::tip
If you registered your domain **through Joytree** (see [Registering a domain](#/domains-register)), DNS records are managed automatically and you rarely need to touch this directly.
:::
`
  },

  'domains-verify': {
    title: 'Verification', group: 'Domains & DNS', eyebrow: 'Domains',
    lede: 'Confirm ownership so Joytree can issue a certificate and start routing traffic.',
    md: `
\`\`\`bash
joytree domains verify example.com
\`\`\`

Joytree checks that the required DNS records exist at your registrar. If they've propagated, verification completes immediately:

\`\`\`text
✔ example.com is verified!
\`\`\`

If not, you'll see:

\`\`\`text
⚠ Verification pending. Check your DNS records.
\`\`\`

## Availability check

Before attaching a domain you don't own yet, confirm it's actually free:

\`\`\`bash
joytree domains check example.com
\`\`\`

\`\`\`text
✔ example.com is available!
  Price   $12.00/yr
\`\`\`

:::tip
DNS propagation is outside Joytree's control and can take anywhere from a few minutes to 48 hours depending on your registrar and previous TTL values. If verification keeps failing after that window, re-check the exact record values with \`joytree domains dns example.com\`.
:::
`
  },

  'domains-transfer': {
    title: 'Domain transfer', group: 'Domains & DNS', eyebrow: 'Domains',
    lede: 'Move a domain onto a project and watch every step happen live.',
    md: `
\`\`\`bash
joytree domains transfer example.com my-site
\`\`\`

Unlike \`domains attach\`, transfer streams progress in real time over Server-Sent Events so you can see exactly what's happening — nameserver checks, record creation, propagation polling — as it runs.

\`\`\`text
Domain Transfer — example.com → my-site
──────────────────────────────────────
  → Checking current nameservers [1s]
  → Creating DNS records [3s]
  → Waiting for propagation [22s]
✔ Transfer complete!
  Live URL   https://example.com
\`\`\`

Press **Ctrl+C** at any point to disconnect from the stream — the transfer keeps running server-side regardless.

## When to use transfer vs. attach

| | Use for |
|---|---|
| \`domains attach\` | Domains already pointed correctly, or where you'll manage DNS yourself |
| \`domains transfer\` | Moving a domain fully under Joytree's management, with live progress |
`
  },

  'domains-register': {
    title: 'Registering a domain', group: 'Domains & DNS', eyebrow: 'Domains · Registrar',
    lede: 'Buy a brand-new domain without leaving the CLI.',
    md: `
\`\`\`bash
joytree domains register example.com --years 1
\`\`\`

If you omit \`--domain\`, you'll be prompted for one interactively.

| Flag | Description |
|---|---|
| \`--project-id <id>\` | Attach the domain to a project immediately after registration |
| \`--years <n>\` | Registration length (default \`1\`) |

\`\`\`text
Domain registration started for example.com!
Status     pending
Order ID   ord_7fq2n9
\`\`\`

Registration is asynchronous — check back with \`joytree domains list\` once the order clears, or via \`joytree domains check example.com\` to see it flip from available to registered.

See **[TLD pricing](#/domains-tlds)** to compare costs before you commit to a specific extension.
`
  },

  'domains-tlds': {
    title: 'TLD pricing', group: 'Domains & DNS', eyebrow: 'Domains · Registrar',
    lede: 'Browse available top-level domains and their registration price.',
    md: `
\`\`\`bash
joytree domains tlds
\`\`\`

\`\`\`text
Available TLDs (146)
──────────────────────────────
.com    $12.00
.dev    $14.99
.app    $16.00
.io     $34.99
.site   $2.99
…
\`\`\`

The list is pulled live from \`GET /api/domains/tlds\` and reflects current registrar pricing — always check here rather than assuming a price, since TLD costs change independently of Joytree.

Once you've picked one, move on to **[Registering a domain](#/domains-register)**.
`
  },

  // ───────────────────────── AI Agent ─────────────────────────
  'agent-overview': {
    title: 'Overview & providers', group: 'AI Agent', eyebrow: 'AI Agent',
    lede: 'Hand a coding task to an AI agent that can read, edit, and fix your project directly.',
    md: `
The Joytree AI agent runs against your project's codebase to fix bugs, add features, or refactor code — kicked off from the dashboard, the CLI, or the API, and followed up on asynchronously either way.

## Providers

The CLI and dashboard both list four models. \`joytree agent providers\` prints exactly this:

\`\`\`text
AI Agent Providers
──────────────────────────────
Llama 3.3       [available]  ★ recommended
   Groq · open-source. Free · Fast.
GPT             [available]
   OpenAI. All-round coding.
Claude          [needs key]
   Anthropic. Best for code.
Grok            [needs key]
   xAI. Strong reasoning.

Recommended: llama-3.3 (Groq)
\`\`\`

From the CLI:

\`\`\`bash
joytree agent providers
\`\`\`

## What "needs key" actually means

- **Llama 3.3 (Groq)** is the default and is free to use on Joytree's shared key — this is what you get with no setup.
- **GPT (OpenAI)** and **Grok (xAI)** are also usable on the shared key when one is configured for your workspace.
- **Claude (Anthropic)** is the odd one out: on the shared key it's gated to Joytree's **Scale Max** plan. Bring your own Anthropic API key and it unlocks immediately regardless of plan — same as any other BYOK provider.

## Bringing your own key (BYOK)

| Provider | Key format | Get one at |
|---|---|---|
| Groq | \`gsk_...\` | console.groq.com/keys |
| OpenAI | \`sk-...\` | platform.openai.com/api-keys |
| Anthropic | \`sk-ant-...\` | console.anthropic.com |
| xAI | \`xai-...\` | console.x.ai |

Your own key gets higher rate limits, uses your own billing, and unlocks Claude without needing Scale Max. Manage keys from the dashboard's agent screen, or via the API at \`GET/POST /api/ai/keys\`.

Next: try it from the **[dashboard](#/agent-dashboard)**, or **[start a session from the CLI](#/agent-start)**.
`
  },

  'agent-dashboard': {
    title: 'Using the agent in the dashboard', group: 'AI Agent', eyebrow: 'AI Agent · Dashboard',
    lede: 'A chat-style coding assistant built into the dashboard, with persistent session history.',
    md: `
The dashboard's AI agent screen looks and feels like a chat-based coding assistant: describe what you want, watch the agent work through your project in real time, and keep the conversation going with follow-ups instead of restarting from scratch.

## Starting a session

1. Open a project and go to its **Agent** tab.
2. Pick a model from the picker — **Llama 3.3** (Groq) is the default and free. Switch to GPT, Claude, or Grok from the dropdown; Claude shows a lock icon and an upsell prompt unless you've added your own Anthropic key or you're on the Scale Max plan.
3. Describe the task in the chat box: what's broken, what to add, or what to refactor. Be as specific as you would with a teammate.
4. The agent streams its progress inline — files it's reading, edits it's making, and a running summary — rather than a single opaque "please wait."

:::tip
For real-time build-error diagnosis specifically (the auto-fix loop that reads a failed build's logs, root-causes it, and opens a PR), Claude is the model doing the analysis — that's the "Claude real-time AI fixing" capability referenced elsewhere in the dashboard, and it follows the same Scale Max / BYOK rule as above.
:::

## Session history

Every session is saved and reappears the next time you open the Agent tab, so you can:

- Pick up a session exactly where it left off, days later.
- Scroll back through everything a session did, with each file change visible.
- Branch a new follow-up off an old session instead of re-explaining context you already gave it.

## Follow-ups

Once a session finishes (or while it's still running), keep typing in the same chat thread — the agent keeps the full history of the session as context, so "also add a test for that" or "actually use the other approach" work the way they would in a normal conversation.

:::tip
Sessions started in the dashboard, the CLI, and the API are the same underlying sessions — start one in the dashboard and follow up on it from the CLI with \`joytree agent followup <session-id>\` if you'd rather script the next step.
:::
`
  },

  'agent-start': {
    title: 'Starting a session (CLI)', group: 'AI Agent', eyebrow: 'AI Agent',
    lede: 'Describe what you want fixed or built, in plain language.',
    md: `
\`\`\`bash
joytree agent start --prompt "Fix the failing build — TypeError in src/utils/date.js" --project-id my-site
\`\`\`

| Flag | Description |
|---|---|
| \`-p, --prompt <text>\` | The task, in plain language |
| \`--provider <id>\` | Which AI provider to use (defaults to the recommended one — see **[Overview & providers](#/agent-overview)**) |
| \`--project-id <id>\` | The project the agent should work against |

Without \`--prompt\`, the CLI asks for it interactively.

\`\`\`text
Session ID   sess_4h91kd

Watch progress: joytree agent status sess_4h91kd
\`\`\`

:::warn
\`--project-id\` must point to a project that's connected to a **GitHub repository** — the agent needs a resolvable repo (in \`username/repo\` form) to actually read and edit code. If you see \`Failed: repoSlug is required (e.g. username/my-app)\`, the project either doesn't exist under that ID, or it was deployed by upload/ZIP rather than from GitHub and has no repo for the agent to attach to. Check the ID with \`joytree projects\`, and reach for a GitHub-connected project — see **[Deploy from GitHub](#/deploy-github)**.
:::

## Good prompts are specific

- ❌ "make it better"
- ✔ "The \`/checkout\` route throws a 500 when the cart is empty — add a guard and return a 400 with a clear message instead"

The more concrete the failure or the desired change, the more targeted the agent's edits will be. Continue in **[Status & follow-ups](#/agent-manage)**.
`
  },

  'agent-manage': {
    title: 'Status & follow-ups (CLI)', group: 'AI Agent', eyebrow: 'AI Agent',
    lede: 'Check progress on a running session, and steer it without starting over.',
    md: `
## Checking status

\`\`\`bash
joytree agent status sess_4h91kd
\`\`\`

\`\`\`text
Agent Session
──────────────────────────────
Status    in_progress
Summary   Located the date parsing bug in src/utils/date.js and 2 call sites; writing a fix now.
\`\`\`

## Sending a follow-up

Rather than starting a new session, steer an in-progress or completed one with more context:

\`\`\`bash
joytree agent followup sess_4h91kd --message "Also add a unit test for the empty-cart case"
\`\`\`

\`\`\`text
Follow-up sent!
\`\`\`

## Streaming and resuming

For long-running sessions, the underlying API also exposes:

\`\`\`text
GET /api/ai/agent/stream/:sessionId    Live token stream
GET /api/ai/agent/resume/:sessionId    Resume a paused session
GET /api/ai/agent/download/:sessionId  Download the resulting diff/patch
\`\`\`

The CLI currently wraps \`start\`, \`status\`, and \`followup\` — use these endpoints directly if you're building a custom integration.
`
  },

  // ───────────────────────── Developer API builder ─────────────────────────
  'dev-flows-overview': {
    title: 'Developer API Builder — overview', group: 'Developer API Builder', eyebrow: 'Developer Tools',
    lede: 'Describe an API in plain English and get a working, live endpoint — no code written by hand.',
    md: `
The **Realtime API Builder** (labeled "Realtime API" in the sidebar) turns a prompt into a real backend service — Joytree's AI generates the routes and content, hosts it on a live URL immediately, and can package the result into a persistent container alongside your other projects.

## From the dashboard

Open **Realtime API** from the sidebar. The page is one prompt canvas plus a few controls:

1. **Prompt** — describe the API in the textarea, e.g. *"Generate 1000 unique riddles with answers and difficulty tags"* or *"A todo list API: create, list, complete, delete."*
2. **Upload context** *(optional)* — attach a \`.txt\`, \`.md\`, \`.csv\`, \`.json\`, \`.pdf\`, \`.doc\`, \`.docx\`, \`.ppt\`, or \`.pptx\` file. Text files are read directly as context; other formats are sent for the AI to extract content from.
3. **AI Version** — pick which generation engine to use. See **[AI versions (v1–v4)](#/dev-ai-versions)** for what each one does and who can use it.
4. Click **Deploy API from Prompt**. Large batch requests (e.g. "1000 riddles") are automatically split into chunks with a live progress bar — you can **Cancel** mid-generation if needed.

Once deployed, you get a live endpoint immediately at \`https://<your-domain>/api/live/<flow-id>\`, shown in the result panel along with an **Execution Logs** stream and an **API Management** list of everything you've generated so far.

## Two states: flow vs. dockerized

A freshly generated API is a lightweight **flow** — fast to create, served from the platform's shared runtime. Click **Dockerize Last Flow** (or **[Dockerize & link a flow](#/dev-flows-dockerize)**) to package it into a real, persistent Docker container with its own subdomain — the same way any other Joytree project is hosted.

## Plan limits

Each plan caps how many APIs you can have at once:

| Plan | Max APIs |
|---|---|
| Free | 5 |
| Starter | 20 |
| Pro | 60 |
| Growth | 150 |
| Scale | 500 |

## Managing flows

**Dashboard:** every generated API appears as a card in **API Management** on the Realtime API page — click one to open its detail page (prompt, endpoint, dockerized status, linked project, recent logs).

**CLI:**

\`\`\`bash
joytree api list
joytree api inspect <flow-id>
joytree api followup <flow-id> -m "Add pagination to the list endpoint"
joytree api delete <flow-id>
\`\`\`

**REST:**

\`\`\`text
GET    /api/developer/apis                    List your generated APIs
GET    /api/developer/apis/:flowId            Inspect a single API
PATCH  /api/developer/apis/:flowId            Update prompt/status metadata
POST   /api/developer/apis/:flowId/followup   Refine an API with more instructions
DELETE /api/developer/apis/:flowId            Delete an API
GET    /api/developer/logs                    Recent generation/execution logs
\`\`\`

Continue to **[Generate an API from text](#/dev-flows-generate)**.
`
  },

  'dev-ai-versions': {
    title: 'AI versions (v1–v4)', group: 'Developer API Builder', eyebrow: 'Developer Tools',
    lede: 'The AI Version picker on the Realtime API Builder page — what each one does, and who can use it.',
    md: `
| Version | Description | Availability |
|---|---|---|
| **Joytree AI v1** | Fast, reliable single-model generation. Best for most requests. | Default — free for everyone |
| **Joytree AI v2** | Dual-engine with automatic failover — seamlessly switches models if one is unavailable. Ideal for large generations. | Requires an active paid plan |
| **Joytree AI v3** | High-reasoning AI for structured APIs and large batch generation, with automatic web-search context pulled in before generating. | Currently admin-only |
| **Joytree AI v4** | Multi-provider cascade with automatic failover for maximum reliability on large generations, always with web-search context. | Currently admin-only |

:::tip
v1 is a safe default for almost everything. Reach for v2 once you're on a paid plan and generating large or complex batches. v3 and v4 exist in the picker but currently return an upgrade/admin-only message if selected on a non-admin account — don't build a workflow that depends on them yet.
:::

## Picking a version

**Dashboard:** the **AI Version** dropdown on the Realtime API Builder page. Selecting a version you don't have access to redirects you to the pricing page with an explanatory toast instead of submitting the request.

**CLI:**

\`\`\`bash
joytree api providers
joytree api create --prompt "..." --ai-version v1
\`\`\`

**REST:** pass \`"aiVersion": "v1"\` (or \`v2\`/\`v3\`/\`v4\`) in the body of \`POST /api/developer/flows/from-text\`.
`
  },

  'dev-flows-generate': {
    title: 'Generate an API from text', group: 'Developer API Builder', eyebrow: 'Developer Tools',
    lede: 'Turn a prompt into a running, live-hosted backend.',
    md: `
## From the dashboard

See **[Overview](#/dev-flows-overview)** for the full walkthrough — in short: **Realtime API** in the sidebar → describe the API in the prompt box → optionally attach a context file → pick an **[AI version](#/dev-ai-versions)** → **Deploy API from Prompt**.

## From the CLI

\`\`\`bash
joytree api create --prompt "A todo list API: create, list, complete, and delete todos"
\`\`\`

| Flag | Description |
|---|---|
| \`-p, --prompt <text>\` | The API description, in plain language |
| \`--file <path>\` | Attach a context file — text files are read directly; PDFs/Office docs are uploaded for the AI to extract from |
| \`--ai-version <v1\|v2\|v3\|v4>\` | Which generation engine to use (default \`v1\`) |

Without \`--prompt\`, the CLI asks for it interactively.

\`\`\`text
✓ Flow flow_1735689123456
Endpoint   https://my-workspace.joytree.site/api/live/flow_1735689123456

Dockerize it:   joytree api dockerize flow_1735689123456
Link a project: joytree api link flow_1735689123456 --project-id <id>
Refine it:      joytree api followup flow_1735689123456 -m "..."
\`\`\`

## From the REST API

\`\`\`bash
curl -X POST https://joytree.site/api/developer/flows/from-text \\
  -H "Authorization: Bearer $JOYTREE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A todo list API: create, list, complete, and delete todos",
    "aiVersion": "v1"
  }'
\`\`\`

The response includes the live \`endpoint\` and a \`flowId\` you use for everything else — refining, dockerizing, or linking to a project.

## Refining with follow-ups

\`\`\`bash
joytree api followup flow_1735689123456 -m "Add pagination to the list endpoint"
\`\`\`

\`\`\`bash
curl -X POST https://joytree.site/api/developer/apis/flow_1735689123456/followup \\
  -H "Authorization: Bearer $JOYTREE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "followup": "Add pagination to the list endpoint" }'
\`\`\`

:::tip
Large batch prompts (e.g. "generate 500 riddles") are automatically split into chunks server-side — expect these to take noticeably longer than a simple CRUD API, and don't shrink the client-side timeout if you're scripting this.
:::

Once you're happy with the result, move to **[Dockerize & link a flow](#/dev-flows-dockerize)** to turn it into a persistent deployment.
`
  },

  'dev-flows-dockerize': {
    title: 'Dockerize & link a flow', group: 'Developer API Builder', eyebrow: 'Developer Tools',
    lede: 'Package a generated flow into a persistent container, or attach it to a project you already have.',
    md: `
## Dockerize

A freshly generated API is a lightweight flow. Dockerizing it builds a real standalone container with its own subdomain — the same hosting path as any other Joytree project — so it survives independently of the API Builder's in-memory state.

**Dashboard:** click **Dockerize Last Flow** on the Realtime API Builder page (dockerizes whichever flow you generated most recently), or open a specific API's detail page.

**CLI:**

\`\`\`bash
joytree api dockerize flow_1735689123456
\`\`\`

**REST:**

\`\`\`bash
curl -X POST https://joytree.site/api/developer/flows/flow_1735689123456/dockerize \\
  -H "Authorization: Bearer $JOYTREE_API_KEY"
\`\`\`

All three return a \`liveUrl\` once the container is built and started.

## Link to an existing project

Rather than a standalone container, you can attach a generated API's endpoint to a project you already have — this injects \`API_ENDPOINT\` and a generated \`API_KEY\` into that project's environment variables automatically.

**CLI:**

\`\`\`bash
joytree api link flow_1735689123456 --project-id my-site
\`\`\`

**REST:**

\`\`\`bash
curl -X POST https://joytree.site/api/developer/apis/flow_1735689123456/link-project \\
  -H "Authorization: Bearer $JOYTREE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "projectId": "my-site" }'
\`\`\`

:::tip
Linking doesn't dockerize the flow — it just points a project's env vars at the flow's existing endpoint. Do both if you want a project wired up to a fully persistent, standalone API.
:::
`
  },
  // ───────────────────────── GitHub ─────────────────────────
  'github-linking': {
    title: 'Linking your account', group: 'GitHub Integration', eyebrow: 'GitHub',
    lede: 'Connect GitHub once and every repository you can access becomes deployable.',
    md: `
Link your GitHub account from **Dashboard → Settings → Integrations**. Joytree uses OAuth, exchanging a code for an access token via:

\`\`\`text
GET  /api/auth/github/url        Get the OAuth authorize URL
POST /api/auth/github/exchange   Exchange the OAuth code for a session
POST /api/auth/github/link-account   Link GitHub to an existing account
\`\`\`

Once linked, any repo you have access to — personal or organization — is available to deploy without re-authenticating per repo.

:::tip
Google sign-in follows the identical pattern at \`/api/auth/google/*\`, if you'd rather link that instead of, or alongside, GitHub.
:::

Continue to **[Repositories & branches](#/github-repos)** to see what's now available to deploy.
`
  },

  'github-repos': {
    title: 'Repositories & branches', group: 'GitHub Integration', eyebrow: 'GitHub',
    lede: 'Browse what\'s deployable straight from the CLI.',
    md: `
## Listing repositories

\`\`\`bash
joytree pull repos
\`\`\`

\`\`\`text
GitHub Repositories (14)
──────────────────────────────
you/my-site  [public]
   A personal blog built with Astro.
   default branch: main
you/api      [private]
   default branch: main

Run: joytree deploy --repo <url> to deploy any repo above.
\`\`\`

## Listing branches

\`\`\`bash
joytree pull branches https://github.com/you/my-site
\`\`\`

\`\`\`text
Branches — https://github.com/you/my-site
──────────────────────────────
main  (default)
staging
feature/redesign
\`\`\`

Use either output to fill in \`--repo\` and \`--branch\` on \`joytree deploy\`, or just let the interactive wizard prompt you.
`
  },

  'github-webhooks': {
    title: 'Webhooks', group: 'GitHub Integration', eyebrow: 'GitHub',
    lede: 'Two kinds of webhook exist on Joytree: GitHub push events, and a global outbound webhook secret.',
    md: `
## Per-project GitHub webhooks

These are created automatically when you enable **[auto-deploy](#/deploy-autodeploy)** on a project — you don't manage them by hand. GitHub calls:

\`\`\`text
POST /api/github/webhook/:projectId
\`\`\`

on every push, and Joytree triggers a build if the branch matches.

## Global webhook secret

Separately, Joytree issues one account-wide secret you can use to verify any incoming payloads Joytree sends you (for example, deploy status notifications configured on your side).

\`\`\`bash
joytree webhook secret
\`\`\`

\`\`\`text
Global Webhook Secret
──────────────────────────────
Secret        whsec_8f2a91cd3e...
Webhook URL   https://joytree.site/api/github/webhook

Use this secret to verify incoming webhook payloads from GitHub.
\`\`\`

## Rotating the secret

\`\`\`bash
joytree webhook rotate
\`\`\`

:::warn
Rotating invalidates the previous secret immediately. If you verify incoming payloads with it anywhere, update that code first, then rotate.
:::
`
  },

  // ───────────────────────── SSH ─────────────────────────
  'ssh-keys': {
    title: 'Managing SSH keys', group: 'SSH Keys', eyebrow: 'SSH Keys',
    lede: 'Generate and manage SSH keys for accessing private resources from your deployments.',
    md: `
## Listing keys

\`\`\`bash
joytree ssh list
\`\`\`

\`\`\`text
SSH Keys (2)
──────────────────────────────
deploy-key   key_8x2n
   fingerprint: SHA256:aG3k9...
   created: 6/12/2026, 9:04:00 AM
\`\`\`

## Generating a new key

\`\`\`bash
joytree ssh generate --name deploy-key
\`\`\`

\`\`\`text
SSH key generated!
Name         deploy-key
ID           key_8x2n

Public Key

ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... deploy-key

Add this public key to your GitHub/GitLab account.
\`\`\`

The private key is stored securely on Joytree and used on your behalf — only the public key is ever shown, so you can add it to GitHub, GitLab, or any other service that needs to trust your deployments.

## Deleting a key

\`\`\`bash
joytree ssh delete key_8x2n
joytree ssh delete key_8x2n --yes
\`\`\`
`
  },

  // ───────────────────────── Account & billing ─────────────────────────
  'account-apikey': {
    title: 'API key management', group: 'Account & Billing', eyebrow: 'Account',
    lede: 'View usage and rotate the key that authenticates the CLI and REST API.',
    md: `
\`\`\`bash
joytree apikey show
\`\`\`

\`\`\`text
API Key
──────────────────────────────
Email        you@example.com
Key          jtk_ab12cd34…
Created      3/02/2026, 10:14:02 AM
Last used    6/30/2026, 8:41:19 PM
Status       active
Projects     6

To rotate: joytree apikey rotate
\`\`\`

\`\`\`bash
joytree apikey rotate
\`\`\`

Rotating immediately revokes the old key. Update \`joytree login --api-key <new-key>\` (and any CI secrets) right after.

See also **[Authentication](#/authentication)** for how keys are used across the CLI and API.
`
  },

  'account-billing': {
    title: 'Billing', group: 'Account & Billing', eyebrow: 'Account',
    lede: 'Joytree bills through Paystack; manage plans from the dashboard.',
    md: `
\`\`\`bash
joytree billing
\`\`\`

\`\`\`text
Billing
──────────────────────────────
Configured   yes

Manage billing and plans from the dashboard: https://joytree.site/dashboard/billing
\`\`\`

The CLI can only report whether billing is configured on your account — plan changes, invoices, and payment methods are managed on the dashboard's **Billing** page, backed by:

\`\`\`text
GET  /api/billing/paystack/config
POST /api/billing/paystack/initialize
GET  /api/billing/paystack/verify
\`\`\`

## Free plan limits

Every new account starts on the **free** plan. Check your current plan and usage anytime with:

\`\`\`bash
joytree status
\`\`\`
`
  },

  'account-workspace': {
    title: 'Workspace & activity', group: 'Account & Billing', eyebrow: 'Account',
    lede: 'See your plan, storage, and a live feed of everything happening across your projects.',
    md: `
## Workspace summary

\`\`\`bash
joytree workspace
\`\`\`

\`\`\`text
Workspace
──────────────────────────────
Plan        free
Projects    6
Storage     412 MB
\`\`\`

## Account status

\`\`\`bash
joytree status
\`\`\`

Combines account info (email, plan) with a quick list of up to 10 projects and their live URLs — a fast way to see everything at a glance without listing projects separately.

## Activity feed

\`\`\`bash
joytree activity
joytree activity --limit 50
\`\`\`

\`\`\`text
Recent Activity
──────────────────────────────
● success  my-site   6/30/2026, 8:41:00 PM
   commit: a1b2c3d  branch: main
● success  docs-site 6/30/2026, 6:02:11 PM
   commit: 9f8e7d6  branch: main
\`\`\`

Shows recent deploys across every project in the workspace, most recent first.
`
  },

  'account-support': {
    title: 'Support', group: 'Account & Billing', eyebrow: 'Account',
    lede: 'Reach the Joytree team directly from the CLI.',
    md: `
\`\`\`bash
joytree support --message "Deploys for my-site have been stuck in 'building' for 20 minutes."
\`\`\`

Without \`-m\`, the CLI prompts for a message interactively.

\`\`\`text
Message sent! We will get back to you by email.
\`\`\`

Messages are delivered to \`POST /api/support/message\` and routed to the team, replying to the email on your account.

:::tip
Include a project name and, if relevant, a deployment or session ID in your message — it's the fastest way for support to look up exactly what you're seeing.
:::
`
  },

  // ───────────────────────── CLI reference ─────────────────────────
  'cli-reference': {
    title: 'Full command reference', group: 'CLI & Automation', eyebrow: 'Reference',
    lede: 'Every joytree command, grouped exactly as the CLI\'s own help output groups them. This is a reference for scripting and CI — for everyday use, the dashboard covers the same ground visually.',
    md: `
Run \`joytree\` with **no arguments** to print this same list in your terminal — the CLI has no \`--help\`/\`-h\` flag and no \`help\` subcommand on any command, so this page (or the bare command) is the reference.

## Account

\`\`\`text
joytree login --api-key <key>       Validate and save a Joytree API key
joytree logout                      Remove local credentials
joytree whoami                      Show active account and API key scope
joytree status                      Account status and project overview
joytree workspace                   Workspace plan and storage usage
\`\`\`

## API key

\`\`\`text
joytree apikey show                 View current API key and usage stats
joytree apikey rotate               Revoke old key and generate a new one
\`\`\`

## Deploy

\`\`\`text
joytree deploy -r <repo>            Deploy a GitHub repo — interactive wizard
joytree deploy --static             Skip wizard, force static site
joytree redeploy <project-id>       Trigger a fresh redeployment
joytree stop <deploy-id>            Cancel a currently running deployment
joytree autodeploy <id> --enable    Enable GitHub push auto-deploy
joytree autodeploy <id> --disable   Disable GitHub push auto-deploy
joytree deployments [project-id]    Show recent deployments
joytree open <project-id>           Open live URL in your browser
joytree upload --dir ./myapp        Deploy from a local folder (no git)
\`\`\`

## Projects

\`\`\`text
joytree projects                    List all your projects (--json for machine-readable output)
joytree inspect <project-id>        Show full project details
joytree delete <project-id>         Delete a project — irreversible (-y, --yes to skip confirmation)
\`\`\`

## Logs

\`\`\`text
joytree logs <project-id>           Fetch recent runtime logs
joytree logs <id> --follow          Stream live project logs in real time
joytree logs <id> --lines 100       Fetch logs by line count
\`\`\`

## Environment variables

\`\`\`text
joytree env list <project-id>       List project env var keys
joytree env set <id> KEY=VALUE      Set one or more env vars
joytree env delete <id> <KEY>       Delete an env var
joytree env push <project-id>       Push a local .env file to a project (--file <path>, default .env)
joytree env push <id> --force       Replace all existing env vars instead of merging
\`\`\`

## GitHub

\`\`\`text
joytree pull repos                  List your linked GitHub repositories
joytree pull branches <repo-url>    List branches for a repository
\`\`\`

## Domains

\`\`\`text
joytree domains list                     List all custom domains
joytree domains attach <domain> <id>     Attach a custom domain to a project
joytree domains transfer <domain> <id>   Transfer a domain — stream DNS progress live
joytree domains verify <domain>          Trigger DNS verification
joytree domains remove <domain>          Remove a custom domain
joytree domains check <domain>           Check domain availability
\`\`\`

## DNS management

\`\`\`text
joytree domains dns <domain>             View all DNS records for a domain
joytree domains dns-add <domain>         Add a DNS record (--type, --host, --value, --ttl)
joytree domains dns-delete <domain>      Delete a DNS record (--record-id <id>)
joytree domains nameservers <domain>     Update nameservers (--ns <comma,separated,list>)
\`\`\`

## External URL proxy

\`\`\`text
joytree domains proxy-list               List all external URL proxies
joytree domains proxy-set <subdomain>    Point a subdomain to an external URL (--url <url>)
joytree domains proxy-remove <subdomain> Remove an external URL proxy
\`\`\`

## Domain registration

\`\`\`text
joytree domains tlds                          List available TLDs and pricing
joytree domains register <domain>             Register a brand new domain (--project-id <id>, --years <n>)
\`\`\`

## Databases

\`\`\`text
joytree db list                     List all databases
joytree db create                   Create a database (--type <type>, default postgres · --name <name>)
joytree db start <db-id>            Start a stopped database
joytree db stop <db-id>             Stop a running database
joytree db restart <db-id>          Restart a database
joytree db logs <db-id>             Fetch recent database logs
joytree db delete <db-id>           Delete a database — irreversible (-y, --yes to skip confirmation)
\`\`\`

## Data Migration

\`\`\`text
joytree migrate start                     Start a migration — interactive wizard if no flags given
joytree migrate start --source-kind ...   Non-interactive: joytree | mongo | firebase | sql | redis
joytree migrate start ... --wait          Block and poll until the migration finishes
joytree migrate list                      List all migrations, most recent first
joytree migrate status <job-id>           Check progress, result, and logs for one migration
joytree migrate delete <job-id>           Delete one migration from history
joytree migrate clear                     Delete ALL migration history — running migrations untouched
\`\`\`

## Compare Databases

\`\`\`text
joytree diff                              Compare two databases — interactive wizard if no flags given
joytree diff --a-source-kind ... --b-source-kind ...   Non-interactive, prefixed --a-/--b- for each side
joytree diff --json                       Print the raw JSON report instead of a formatted summary
\`\`\`

\`joytree migrate start\` accepts different flags depending on \`--source-kind\`:

\`\`\`text
--source-kind joytree      --source-database-id <id>
--source-kind mongo        --connection-string <uri>          (must include a database name — see below)
--source-kind firebase     --firebase-url <url> [--firebase-secret <secret>]
--source-kind sql          --sql-engine <mysql|postgres|mariadb> --connection-string <uri>
--source-kind redis        --connection-string <uri>
\`\`\`

Every \`start\` invocation also needs \`--destination-id <id>\` — always one of your own Joytree databases. See **[Data Migration](#/db-migration)** for the full walkthrough, including the MongoDB connection-string gotcha that this command validates before ever hitting the network.

## AI agent

\`\`\`text
joytree agent providers                    List AI providers (Llama, GPT, Claude, Grok)
joytree agent start --prompt "..."         Start an AI agent session (--provider <id>, --project-id <id>)
joytree agent status <session-id>          Check on a running agent session
joytree agent followup <id> -m "..."       Send a follow-up to an agent session
\`\`\`

:::warn
\`agent start --project-id\` must reference a project that's connected to a GitHub repo — see the note in **[Starting a session](#/agent-start)**.
:::

## API Builder

\`\`\`text
joytree api providers                      List Joytree AI versions (v1–v4)
joytree api create --prompt "..."          Generate a REST API from a text prompt (--file <path>, --ai-version <v>)
joytree api list                           List your generated APIs
joytree api inspect <flow-id>              Show details for a generated API
joytree api followup <id> -m "..."         Refine a generated API with more instructions
joytree api dockerize <flow-id>            Package a flow into a persistent container
joytree api link <id> --project-id <id>    Link a generated API to a project
joytree api delete <flow-id>               Delete a generated API (-y, --yes to skip confirmation)
\`\`\`

See **[Developer API Builder](#/dev-flows-overview)** for the full walkthrough.

## Webhooks

\`\`\`text
joytree webhook secret              Show your global webhook secret
joytree webhook rotate              Regenerate your webhook secret
\`\`\`

## SSH keys

\`\`\`text
joytree ssh list                    List all SSH keys
joytree ssh generate --name <n>     Generate a new SSH key pair
joytree ssh delete <key-id>         Delete an SSH key (-y, --yes to skip confirmation)
\`\`\`

## Billing & support

\`\`\`text
joytree billing                     Show billing configuration status
joytree support -m "..."            Send a message to Joytree support
\`\`\`

## Activity

\`\`\`text
joytree activity                    Show recent platform activity feed
joytree activity --limit <n>        Limit number of events shown
\`\`\`
`
  },

  // ───────────────────────── MCP Server ─────────────────────────
  'mcp-overview': {
    title: 'Overview & connecting', group: 'MCP Server', eyebrow: 'MCP Server',
    lede: 'Deploy, manage databases, and generate APIs on JoyTree by just asking Claude \u2014 no CLI, no copy-pasting commands.',
    md: `
The JoyTree MCP server lets any MCP-compatible AI client \u2014 Claude chat, Claude Cowork, or others \u2014 deploy and manage JoyTree resources directly, by calling JoyTree's real API on your behalf. You describe what you want; the tool calls happen for you.

## Why this exists

**Claude Code** (the version of Claude that runs on your own machine) can already run the [\`joytree\` CLI](#/cli-install) directly, since it has the same unrestricted network access your terminal does \u2014 no extra setup needed there.

**Claude in a browser tab** (claude.ai chat, Cowork) runs in a sandboxed environment that can't reach \`joytree.site\` directly \u2014 by design, for security. The MCP server closes that gap: it's infrastructure JoyTree hosts, so Claude talks to *it*, and it talks to the real JoyTree API with no restrictions. This is the same pattern other platforms (Vercel, GitHub, Google Compute Engine) use to make themselves usable from AI chat clients.

## Connecting

1. Get your API key from **joytree.site/dashboard/account** (or \`joytree apikey show\` from the CLI).
2. In Claude, add a custom connector pointing at \`https://mcp.joytree.site/mcp\`.
3. Authenticate with your API key (\`jtk_...\`) when prompted.
4. Try asking Claude something like *"list my JoyTree projects"* or *"what's in my JoyTree account?"* to confirm the connection.

:::tip
Each request is scoped to your own API key \u2014 there's no shared credential, and no session state that could mix your projects up with anyone else's. Anything the tools can do, your API key could already do through the dashboard or CLI; connecting MCP doesn't grant any new permissions.
:::

## What it can do

Once connected, Claude can:

- **Deploy** a project straight from a GitHub repo
- **Check** deployment history and live runtime logs
- **Manage environment variables** on a project
- **Provision and manage databases** (PostgreSQL, MySQL, MariaDB, MongoDB, Redis)
- **Migrate data** into a JoyTree database from another JoyTree database, MongoDB Atlas, Firebase Realtime Database, or an external MySQL/PostgreSQL/MariaDB/Redis instance, regardless of engine
- **Generate a REST API from a prompt** using the [Realtime API Builder](#/dev-flows-overview), and turn it into a persistent container

See the full list with exact inputs on the **[Tool reference](#/mcp-tools)** page.

## What it can't do (yet)

A few things are intentionally out of scope for v1: registering new domains, billing/plan changes, and SSH key management aren't exposed as tools \u2014 those stay dashboard/CLI-only for now, since they're either rarely needed mid-coding-session or carry enough weight (money, DNS) to want a deliberate click rather than "Claude, do this."
`
  },

  'mcp-tools': {
    title: 'Tool reference', group: 'MCP Server', eyebrow: 'MCP Server',
    lede: 'Every tool the JoyTree MCP server exposes, with what it actually calls under the hood.',
    md: `
Every tool below is a thin, direct wrapper around a real JoyTree REST endpoint \u2014 nothing happens through MCP that couldn't also happen through the [API](#/api-overview) or [CLI](#/cli-reference) directly.

## Identity & projects

| Tool | What it does |
|---|---|
| \`joytree_whoami\` | Confirm the connected account and API key scope |
| \`joytree_list_projects\` | List all projects, with status, live URL, last deploy time |
| \`joytree_get_project\` | Full details for one project by ID |
| \`joytree_delete_project\` | Permanently delete a project \u2014 irreversible |

## Deploy

| Tool | What it does |
|---|---|
| \`joytree_deploy_from_github\` | Deploy a project from a GitHub repo URL; framework/build settings auto-detect if omitted |
| \`joytree_list_deployments\` | Recent deployment history, optionally scoped to one project |
| \`joytree_runtime_logs\` | Fetch recent runtime logs for a project |
| \`joytree_list_github_repos\` | List repos available through your connected GitHub account, to find the right \`repoUrl\` |

## Environment variables

| Tool | What it does |
|---|---|
| \`joytree_env_list\` | List env var keys set on a project |
| \`joytree_env_set\` | Set one or more key/value pairs |
| \`joytree_env_delete\` | Remove a single env var |

## Databases

| Tool | What it does |
|---|---|
| \`joytree_list_databases\` | List all managed databases in the account |
| \`joytree_create_database\` | Provision a new database (postgres / mysql / mariadb / mongodb / redis), optionally linked to a project |
| \`joytree_get_database\` | Connection strings and status for one database |
| \`joytree_database_lifecycle\` | Start, stop, restart, or delete a database |

## Data Migration

| Tool | What it does |
|---|---|
| \`joytree_start_migration\` | Start a migration into one of your JoyTree databases from another JoyTree database, MongoDB Atlas, Firebase Realtime Database, or an external MySQL/PostgreSQL/MariaDB/Redis instance. Takes \`sourceKind\` plus whichever fields that kind needs (\`sourceDatabaseId\`, \`connectionString\`, \`sqlEngine\`, \`firebaseDatabaseUrl\`, \`firebaseAuthSecret\`) and \`destinationDatabaseId\`. Runs in the background \u2014 returns a \`migrationId\` to poll |
| \`joytree_list_migrations\` | List every migration (in-progress and history), most recent first |
| \`joytree_get_migration\` | Full status, result, and logs for one migration by ID |
| \`joytree_delete_migration\` | Remove one migration from history \u2014 refuses if it's still running |
| \`joytree_clear_migration_history\` | Delete ALL finished migration history at once; running migrations are left untouched |

## Compare Databases

| Tool | What it does |
|---|---|
| \`joytree_compare_databases\` | Compare two databases and see exactly what's added, removed, and changed \u2014 even across completely different engines. Takes \`databaseA\` and \`databaseB\`, each using the same shape as \`joytree_start_migration\`'s source (\`sourceKind\` plus whichever fields that kind needs). Rows are matched by id where one exists, or by content otherwise. Returns per-collection counts plus example rows and field-level before/after values for changed rows |

:::warn
When \`sourceKind\` is \`"mongo"\`, \`connectionString\` **must include a database name** (the part after the last \`/\` before any \`?\`). Atlas's default "Copy connection string" button omits it \u2014 without one, MongoDB silently falls back to its own default database named \`test\` instead of erroring, so a migration could "succeed" while reading the wrong data entirely.
:::

## Realtime API Builder

| Tool | What it does |
|---|---|
| \`joytree_create_api_from_prompt\` | Generate a live REST API from a plain-language description |
| \`joytree_list_generated_apis\` | List every API generated this way |
| \`joytree_dockerize_api\` | Turn a generated API into a persistent, standalone container |

:::tip
If you're not sure what a tool needs, just describe the goal \u2014 "deploy my-app from github.com/me/my-app" gives Claude enough to call \`joytree_deploy_from_github\` correctly without you needing to know the tool names or their exact parameters.
:::

## Self-hosting or extending it

The server is open in **[github.com/Joy-tree/joytree-mcp-server](https://github.com/Joy-tree/joytree-mcp-server)**. It's a small Node/Express service built on the official MCP SDK \u2014 each tool is a short function that calls one REST endpoint and returns the result. Adding a new tool means adding one function, not touching JoyTree's core API at all.
`
  },

  // ───────────────────────── API reference ─────────────────────────
  'api-overview': {
    title: 'REST API overview', group: 'API Reference', eyebrow: 'API',
    lede: 'Every CLI command and dashboard action is backed by a plain REST endpoint over HTTPS.',
    md: `
## Base URL

\`\`\`text
https://joytree.site
\`\`\`

## Authentication

Send your API key as a bearer token on every request:

\`\`\`bash
curl https://joytree.site/api/v1/projects \\
  -H "Authorization: Bearer $JOYTREE_API_KEY"
\`\`\`

See **[Authentication](#/authentication)** for how to obtain a key.

## Endpoint groups

| Area | Base path |
|---|---|
| Account | \`/api/v1/account\`, \`/api/account/api-key\` |
| Projects | \`/api/v1/projects\`, \`/api/projects\` |
| Deployments | \`/api/deploy\`, \`/api/deployments\` |
| Environment variables | \`/api/v1/projects/:id/env\` |
| Runtime logs (SSE) | \`/api/projects/:id/runtime-logs\` |
| Databases | \`/api/databases\` |
| Domains | \`/api/domains\` |
| GitHub | \`/api/github\` |
| SSH keys | \`/api/ssh-keys\` |
| AI agent | \`/api/ai/agent\` |
| Developer flows | \`/api/developer\` |
| Webhooks | \`/api/webhook\` |
| Billing | \`/api/billing/paystack\` |

## Response format

Successful responses return JSON. List endpoints either return a bare array or an object with the collection under a named key (\`{ "projects": [...] }\`, \`{ "databases": [...] }\`) — the CLI normalizes both shapes, and your own client should handle either.

## Streaming endpoints

Runtime logs, database logs, and domain transfer all stream over **Server-Sent Events** rather than returning a single JSON payload. Connect with \`Accept: text/event-stream\` and read \`data:\` lines as newline-delimited JSON events.

Continue to **[Errors & rate limits](#/api-errors)**.
`
  },

  'api-errors': {
    title: 'Errors & rate limits', group: 'API Reference', eyebrow: 'API',
    lede: 'How Joytree reports failures, and how to handle them in your own tooling.',
    md: `
## Error shape

Failed requests return a non-2xx status code with a JSON body:

\`\`\`json
{ "error": "Project not found" }
\`\`\`

The CLI surfaces this \`error\` field directly, prefixed with \`Failed:\`, on every command.

## Common status codes

| Status | Meaning |
|---|---|
| \`400\` | Malformed request — check required fields |
| \`401\` | Missing or invalid API key |
| \`404\` | Project, database, domain, or session not found |
| \`409\` | Conflict — e.g. a subdomain that's already taken |
| \`5xx\` | Something failed on Joytree's side — safe to retry with backoff |

## Health checks

\`\`\`text
GET /api/health           Overall platform status
GET /api/health/storage   Object storage subsystem status
\`\`\`

Useful for a quick check before assuming an error is on your end.

## Retrying safely

All **read** endpoints (\`GET\`) are safe to retry freely. For **write** endpoints, prefer idempotent identifiers where the API accepts them (e.g. a fixed project \`name\`) so a retried request doesn't create a duplicate resource.

:::tip
Streaming endpoints (runtime logs, db logs, domain transfer) will end the connection on the server side after long idle periods — for \`--follow\`-style behavior in your own tooling, reconnect automatically on \`res.on('end')\`.
:::
`
  },

};
