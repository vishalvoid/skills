import type { ExternalSkill } from "../external-skills";

export const betterAuthSkills: ExternalSkill[] = [
  {
    slug: "better-auth-best-practices",
    name: "better-auth-best-practices",
    tagline: "Configure Better Auth server and client, set up database adapters, manage sessions, add plugins, and handle environment variables.",
    description: "Configure Better Auth server and client, set up database adapters, manage sessions, add plugins, and handle environment variables. Use when users mention Better Auth, betterauth, auth.ts, or need to set up TypeScript authentication with email/password, OAuth, or plugin configuration.",
    category: "Technical & Development",
    sourceUrl: "https://github.com/better-auth/skills/tree/main/better-auth/best-practices",
    tags: ["Better Auth", "Authentication", "TypeScript", "Security"],
    difficulty: "Intermediate",
    whatItDoes: "Provides best practices for installing and configuring the Better Auth server and client, including database adapter setups, environment variable configuration, CLI migrations, and session management.",
    whenToUse: [
      "Integrating a type-safe authentication library in Next.js, Nuxt, Astro, Hono, or other TypeScript frameworks.",
      "Connecting your authentication logic directly to your own database (Prisma, Drizzle, MongoDB, or raw SQLite/Postgres).",
      "Managing session state using Redis/KV storage or stateless compact/JWT cookie caches.",
      "Scaffolding custom social login providers alongside username/password authentication.",
      "Ensuring database adapter model names correctly map to ORM structures without table-name drift."
    ],
    skillMd: `---
name: better-auth-best-practices
description: Configure Better Auth server and client, set up database adapters, manage sessions, add plugins, and handle environment variables. Use when users mention Better Auth, betterauth, auth.ts, or need to set up TypeScript authentication with email/password, OAuth, or plugin configuration.
---

# Better Auth Integration Guide

**Always consult [better-auth.com/docs](https://better-auth.com/docs) for code examples and latest API.**

---

## Setup Workflow

1. Install: \`npm install better-auth\`
2. Set env vars: \`BETTER_AUTH_SECRET\` and \`BETTER_AUTH_URL\`
3. Create \`auth.ts\` with database + config
4. Create route handler for your framework
5. Run \`npx @better-auth/cli@latest migrate\`
6. Verify: call \`GET /api/auth/ok\` — should return \`{ status: "ok" }\`

---

## Quick Reference

### Environment Variables
- \`BETTER_AUTH_SECRET\` - Encryption secret (min 32 chars). Generate: \`openssl rand -base64 32\`
- \`BETTER_AUTH_URL\` - Base URL (e.g., \`https://example.com\`)

Only define \`baseURL\`/\`secret\` in config if env vars are NOT set.

### File Location
CLI looks for \`auth.ts\` in: \`./\`, \`./lib\`, \`./utils\`, or under \`./src\`. Use \`--config\` for custom path.

### CLI Commands
- \`npx @better-auth/cli@latest migrate\` - Apply schema (built-in adapter)
- \`npx @better-auth/cli@latest generate\` - Generate schema for Prisma/Drizzle
- \`npx @better-auth/cli mcp --cursor\` - Add MCP to AI tools

**Re-run after adding/changing plugins.**

---

## Core Config Options

| Option | Notes |
|--------|-------|
| \`appName\` | Optional display name |
| \`baseURL\` | Only if \`BETTER_AUTH_URL\` not set |
| \`basePath\` | Default \`/api/auth\`. Set \`/\` for root. |
| \`secret\` | Only if \`BETTER_AUTH_SECRET\` not set |
| \`database\` | Required for most features. See adapters docs. |
| \`secondaryStorage\` | Redis/KV for sessions & rate limits |
| \`emailAndPassword\` | \`{ enabled: true }\` to activate |
| \`socialProviders\` | \`{ google: { clientId, clientSecret }, ... }\` |
| \`plugins\` | Array of plugins |
| \`trustedOrigins\` | CSRF whitelist |

---

## Database

**Direct connections:** Pass \`pg.Pool\`, \`mysql2\` pool, \`better-sqlite3\`, or \`bun:sqlite\` instance.

**ORM adapters:** Import from \`better-auth/adapters/drizzle\`, \`better-auth/adapters/prisma\`, \`better-auth/adapters/mongodb\`.

**Critical:** Better Auth uses adapter model names, NOT underlying table names. If Prisma model is \`User\` mapping to table \`users\`, use \`modelName: "user"\` (Prisma reference), not \`\"users\"\`.

---

## Session Management

**Storage priority:**
1. If \`secondaryStorage\` defined → sessions go there (not DB)
2. Set \`session.storeSessionInDatabase: true\` to also persist to DB
3. No database + \`cookieCache\` → fully stateless mode

**Cookie cache strategies:**
- \`compact\` (default) - Base64url + HMAC. Smallest.
- \`jwt\` - Standard JWT. Readable but signed.
- \`jwe\` - Encrypted. Maximum`
  },
  {
    slug: "email-and-password-best-practices",
    name: "email-and-password-best-practices",
    tagline: "Configure email verification, implement password reset flows, set password policies, and customise hashing algorithms for Better Auth email/password authentication.",
    description: "Configure email verification, implement password reset flows, set password policies, and customise hashing algorithms for Better Auth email/password authentication. Use when users need to set up login, sign-in, sign-up, credential authentication, or password security with Better Auth.",
    category: "Technical & Development",
    sourceUrl: "https://github.com/better-auth/skills/tree/main/better-auth/emailAndPassword",
    tags: ["Better Auth", "Credentials", "Email & Password", "Security"],
    difficulty: "Intermediate",
    whatItDoes: "Handles credential-based authentication using email and passwords. Configures secure verification flows, password reset tokens, absolute callback URLs, and client-side validations.",
    whenToUse: [
      "Enabling native username/email and password credentials signup and signin without third-party redirection.",
      "Restricting sign-in permission to only users who have successfully completed email verification.",
      "Implementing a secure, token-based forgot-password and reset-password flow.",
      "Integrating transactional email services like Resend or custom SMTP relays for sending auth emails.",
      "Applying absolute URL constraints for authentication callback links to prevent cross-domain redirection errors."
    ],
    skillMd: `---
name: email-and-password-best-practices
description: Configure email verification, implement password reset flows, set password policies, and customise hashing algorithms for Better Auth email/password authentication. Use when users need to set up login, sign-in, sign-up, credential authentication, or password security with Better Auth.
---

# Better Auth Email and Password

## Quick Start

1. Enable email/password: \`emailAndPassword: { enabled: true }\`
2. Configure \`emailVerification.sendVerificationEmail\`
3. Add \`sendResetPassword\` for password reset flows
4. Run \`npx @better-auth/cli@latest migrate\`
5. Verify: attempt sign-up and confirm verification email triggers

---

## Email Verification Setup

Configure \`emailVerification.sendVerificationEmail\` to verify user email addresses.

\`\`\`ts
import { betterAuth } from "better-auth";
import { sendEmail } from "./email"; // your email sending function

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: \`Click the link to verify your email: \${url}\`,
      });
    },
  },
});
\`\`\`

**Note**: The \`url\` parameter contains the full verification link. The \`token\` is available if you need to build a custom verification URL.

### Requiring Email Verification

For stricter security, enable \`emailAndPassword.requireEmailVerification\` to block sign-in until the user verifies their email. When enabled, unverified users will receive a new verification email on each sign-in attempt.

\`\`\`ts
export const auth = betterAuth({
  emailAndPassword: {
    requireEmailVerification: true,
  },
});
\`\`\`

**Note**: This requires \`sendVerificationEmail\` to be configured and only applies to email/password sign-ins.

## Client Side Validation

Implement client-side validation for immediate user feedback and reduced server load.

## Callback URLs

Always use absolute URLs (including the origin) for callback URLs in sign-up and sign-in requests. This prevents Better Auth from needing to infer the origin, which can cause issues when your backend and frontend are on different domains.`
  },
  {
    slug: "organization-best-practices",
    name: "organization-best-practices",
    tagline: "Configure multi-tenant organizations, manage members and invitations, define custom roles and permissions, set up teams, and implement RBAC using Better Auth's organization plugin.",
    description: "Configure multi-tenant organizations, manage members and invitations, define custom roles and permissions, set up teams, and implement RBAC using Better Auth's organization plugin. Use when users need org setup, team management, member roles, access control, or the Better Auth organization plugin.",
    category: "Technical & Development",
    sourceUrl: "https://github.com/better-auth/skills/tree/main/better-auth/organization",
    tags: ["Better Auth", "Organizations", "Multi-tenancy", "RBAC"],
    difficulty: "Advanced",
    whatItDoes: "Implements multi-tenant teams and organizations, role-based access control (RBAC), user invitations, and active organization scoping for subsequent API requests.",
    whenToUse: [
      "Building a multi-tenant B2B SaaS application where users belong to teams or workspaces.",
      "Enforcing role-based access control (RBAC) with pre-defined roles like Owner, Admin, and Member.",
      "Creating custom organization limits and membership counts per user tier (e.g., free vs premium).",
      "Implementing a secure invitation system to add members to an organization via email.",
      "Scoping subsequent API calls to a specific organization by setting the active organization in the user session."
    ],
    skillMd: `---
name: organization-best-practices
description: Configure multi-tenant organizations, manage members and invitations, define custom roles and permissions, set up teams, and implement RBAC using Better Auth's organization plugin. Use when users need org setup, team management, member roles, access control, or the Better Auth organization plugin.
---

# Better Auth Organization Setup

## Setup

1. Add \`organization()\` plugin to server config
2. Add \`organizationClient()\` plugin to client config
3. Run \`npx @better-auth/cli migrate\`
4. Verify: check that organization, member, invitation tables exist in your database

\`\`\`ts
import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    organization({
      allowUserToCreateOrganization: true,
      organizationLimit: 5, // Max orgs per user
      membershipLimit: 100, // Max members per org
    }),
  ],
});
\`\`\`

### Client-Side Setup

\`\`\`ts
import { createAuthClient } from "better-auth/client";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [organizationClient()],
});
\`\`\`

## Creating Organizations

The creator is automatically assigned the \`owner\` role.

\`\`\`ts
const createOrg = async () => {
  const { data, error } = await authClient.organization.create({
    name: "My Company",
    slug: "my-company",
    logo: "https://example.com/logo.png",
    metadata: { plan: "pro" },
  });
};
\`\`\`

### Controlling Organization Creation

Restrict who can create organizations based on user attributes:

\`\`\`ts
organization({
  allowUserToCreateOrganization: async (user) => {
    return user.emailVerified === true;
  },
  organizationLimit: async (user) => {
    // Premium users get more organizations
    return user.plan === "premium" ? 20 : 3;
  },
});
\`\`\`

### Creating Organizations on Behalf of Users

Administrators can create organizations for other users (server-side only):

\`\`\`ts
await auth.api.createOrganization({
  body: {
    name: "Client Organization",
    slug: "client-org",
    userId: "user-id-who-will-be-owner", // \`userId\` is required
  },
});
\`\`\`

**Note**: The \`userId\` parameter cannot be used alongside session headers.


## Active Organizations

Stored in the session and scopes subsequent API calls. Set after user selects one.

\`\`\`ts
const setActive = async (organizationId: string) => {
  const { data, error } = await authClient.organization.setActive({
    organizationId,
  });
};
\`\`\`

Many endpoints use the active organization when \`organizationId\` is not provided (\`listMembers\`, \`listInvitations\`, \`inviteMember\`, etc.).

Use \`getFullOrganization()\` to retrieve the active org with all members, invitations, and teams.

## Members

### Adding Members (Server-Side)

\`\`\`ts
await auth.api.addMember({
  body: {
    userId: "user-id",
    role: "member",
    organizationId: "org-id",
  },
});
\`\`\`

For client-side member additions, use the invitation system instead.

### Assigning Multiple Roles

\`\`\`ts
await auth.api.addMember({
  body: {
    userId: "user-id",
    role: ["admin", "moderator"],
    organizationId: "org-id",
  },
});
\`\`\`

### Removing Members

Use \`removeMember({ memberIdOrEmail })\`. The last owner cannot be removed — assign ownership to another member first.

### Updating Member Roles

Use \`updateMemberRole({ memberId, role })\`.`
  },
  {
    slug: "two-factor-authentication-best-practices",
    name: "two-factor-authentication-best-practices",
    tagline: "Configure TOTP authenticator apps, send OTP codes via email/SMS, manage backup codes, handle trusted devices, and implement 2FA sign-in flows using Better Auth's twoFactor plugin.",
    description: "Configure TOTP authenticator apps, send OTP codes via email/SMS, manage backup codes, handle trusted devices, and implement 2FA sign-in flows using Better Auth's twoFactor plugin. Use when users need MFA, multi-factor authentication, authenticator setup, or login security with Better Auth.",
    category: "Technical & Development",
    sourceUrl: "https://github.com/better-auth/skills/tree/main/better-auth/twoFactor",
    tags: ["Better Auth", "MFA", "TOTP", "OTP", "Security"],
    difficulty: "Advanced",
    whatItDoes: "Integrates multi-factor authentication (MFA) using TOTP (authenticator apps like Google Authenticator or 1Password) or OTP (sent via email/SMS), along with backup codes and trusted device tracking.",
    whenToUse: [
      "Enforcing Multi-Factor Authentication (MFA) to satisfy compliance, audit, or corporate security requirements.",
      "Integrating authenticator apps (Google Authenticator, Microsoft Authenticator) via Time-based One-Time Passwords (TOTP) and QR codes.",
      "Sending one-time passwords (OTP) to user phones or email addresses dynamically.",
      "Generating secure, single-use backup recovery codes for users who lose access to their primary MFA device.",
      "Tracking trusted devices to let returning users bypass the MFA check for a specified duration."
    ],
    skillMd: `---
name: two-factor-authentication-best-practices
description: Configure TOTP authenticator apps, send OTP codes via email/SMS, manage backup codes, handle trusted devices, and implement 2FA sign-in flows using Better Auth's twoFactor plugin. Use when users need MFA, multi-factor authentication, authenticator setup, or login security with Better Auth.
---

# Better Auth Two-Factor Authentication

## Setup

1. Add \`twoFactor()\` plugin to server config with \`issuer\`
2. Add \`twoFactorClient()\` plugin to client config
3. Run \`npx @better-auth/cli migrate\`
4. Verify: check that \`twoFactorSecret\` column exists on user table

\`\`\`ts
import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";

export const auth = betterAuth({
  appName: "My App",
  plugins: [
    twoFactor({
      issuer: "My App",
    }),
  ],
});
\`\`\`

### Client-Side Setup

\`\`\`ts
import { createAuthClient } from "better-auth/client";
import { twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/2fa";
      },
    }),
  ],
});
\`\`\`

## Enabling 2FA for Users

Requires password verification. Returns TOTP URI (for QR code) and backup codes.

\`\`\`ts
const enable2FA = async (password: string) => {
  const { data, error } = await authClient.twoFactor.enable({
    password,
  });

  if (data) {
    // data.totpURI — generate a QR code from this
    // data.backupCodes — display to user
  }
};
\`\`\`

\`twoFactorEnabled\` is not set to \`true\` until first TOTP verification succeeds. Override with \`skipVerificationOnEnable: true\` (not recommended).

## TOTP (Authenticator App)

### Displaying the QR Code

\`\`\`tsx
import QRCode from "react-qr-code";

const TotpSetup = ({ totpURI }: { totpURI: string }) => {
  return <QRCode value={totpURI} />;
};
\`\`\`

### Verifying TOTP Codes

Accepts codes from one period before/after current time:

\`\`\`ts
const verifyTotp = async (code: string) => {
  const { data, error } = await authClient.twoFactor.verifyTotp({
    code,
    trustDevice: true,
  });
};
\`\`\`

### TOTP Configuration Options

\`\`\`ts
twoFactor({
  totpOptions: {
    digits: 6, // 6 or 8 digits (default: 6)
    period: 30, // Code validity period in seconds (default: 30)
  },
});
\`\`\`

## OTP (Email/SMS)

### Configuring OTP Delivery

Configure your email/SMS delivery in \`twoFactor\` config options.`
  },
  {
    slug: "create-auth-skill",
    name: "create-auth-skill",
    tagline: "Scaffold and implement authentication in TypeScript/JavaScript apps using Better Auth. Detect frameworks, configure database adapters, set up route handlers, add OAuth providers, and create auth UI pages.",
    description: "Scaffold and implement authentication in TypeScript/JavaScript apps using Better Auth. Detect frameworks, configure database adapters, set up route handlers, add OAuth providers, and create auth UI pages. Use when users want to add login, sign-up, or authentication to a new or existing project with Better Auth.",
    category: "Technical & Development",
    sourceUrl: "https://github.com/better-auth/skills/tree/main/better-auth/create-auth",
    tags: ["Better Auth", "CLI", "Scaffolding", "Authentication"],
    difficulty: "Intermediate",
    whatItDoes: "Guides the interactive scan and step-by-step scaffolding of Better Auth configurations, database setups, and UI pages tailored to your detected framework.",
    whenToUse: [
      "Bootstrapping authentication in a new TypeScript project using an interactive CLI guide.",
      "Scanning the codebase to auto-detect the project framework, database, ORM, and package manager.",
      "Creating structured planning checklists for auth requirements before writing implementation code.",
      "Scaffolding standard authentication UI pages (Sign in, Sign up, Forgot Password) with consistent styles.",
      "Ensuring database models and initial credentials configurations align with framework best practices."
    ],
    skillMd: `---
name: create-auth-skill
description: Scaffold and implement authentication in TypeScript/JavaScript apps using Better Auth. Detect frameworks, configure database adapters, set up route handlers, add OAuth providers, and create auth UI pages. Use when users want to add login, sign-up, or authentication to a new or existing project with Better Auth.
---

# Create Auth Skill

Guide for adding authentication to TypeScript/JavaScript applications using Better Auth.

**For code examples and syntax, see [better-auth.com/docs](https://better-auth.com/docs).**

---

## Phase 1: Planning (REQUIRED before implementation)

Before writing any code, gather requirements by scanning the project and asking the user structured questions. This ensures the implementation matches their needs.

### Step 1: Scan the project

Analyze the codebase to auto-detect:
- **Framework** — Look for \`next.config\`, \`svelte.config\`, \`nuxt.config\`, \`astro.config\`, \`vite.config\`, or Express/Hono entry files.
- **Database/ORM** — Look for \`prisma/schema.prisma\`, \`drizzle.config\`, \`package.json\` deps (\`pg\`, \`mysql2\`, \`better-sqlite3\`, \`mongoose\`, \`mongodb\`).
- **Existing auth** — Look for existing auth libraries (\`next-auth\`, \`lucia\`, \`clerk\`, \`supabase/auth\`, \`firebase/auth\`) in \`package.json\` or imports.
- **Package manager** — Check for \`pnpm-lock.yaml\`, \`yarn.lock\`, \`bun.lockb\`, or \`package-lock.json\`.

Use what you find to pre-fill defaults and skip questions you can already answer.

### Step 2: Ask planning questions

Use the \`AskQuestion\` tool to ask the user **all applicable questions in a single call**. Skip any question you already have a confident answer for from the scan. Group them under a title like "Auth Setup Planning".

**Questions to ask:**

1. **Project type** (skip if detected)
   - Prompt: "What type of project is this?"
   - Options: New project from scratch | Adding auth to existing project | Migrating from another auth library

2. **Framework** (skip if detected)
   - Prompt: "Which framework are you using?"
   - Options: Next.js (App Router) | Next.js (Pages Router) | SvelteKit | Nuxt | Astro | Express | Hono | SolidStart | Other

3. **Database & ORM** (skip if detected)
   - Prompt: "Which database setup will you use?"
   - Options: PostgreSQL (Prisma) | PostgreSQL (Drizzle) | PostgreSQL (pg driver) | MySQL (Prisma) | MySQL (Drizzle) | MySQL (mysql2 driver) | SQLite (Prisma) | SQLite (Drizzle) | SQLite (better-sqlite3 driver) | MongoDB (Mongoose) | MongoDB (native driver)

4. **Authentication methods** (always ask, allow multiple)
   - Prompt: "Which sign-in methods do you need?"
   - Options: Email & password | Social OAuth (Google, GitHub, etc.) | Magic link (passwordless email) | Passkey (WebAuthn) | Phone number
   - \`allow_multiple: true\`

5. **Social providers** (only if they selected Social OAuth above — ask in a follow-up call)
   - Prompt: "Which social providers do you need?"
   - Options: Google | GitHub | Apple | Microsoft | Discord | Twitter/X
   - \`allow_multiple: true\`

6. **Email verification** (only if Email & password was selected above — ask in a follow-up call)
   - Prompt: "Do you want to require email verification?"
   - Options: Yes | No

7. **Email provider** (only if email verification is Yes, or if Password reset is selected in features — ask in a follow-up call)
   - Prompt: "How do you want to send emails?"
   - Options: Resend | Mock it for now (console.log)

8. **Features & plugins** (always ask, allow multiple)
   - Prompt: "Which additional features do you need?"
   - Options: Two-factor authentication (2FA) | Organizations / teams | Admin dashboard | API bearer tokens | Password reset | None of these
   - \`allow_multiple: true\`

9. **Auth pages** (always ask, allow multiple — pre-select based on earlier answers)
   - Prompt: "Which auth pages do you need?"
   - Options vary based on previous answers:
     - Always available: Sign in | Sign up
     - If Email & password selected: Forgot password | Reset password
     - If email verification enabled: Email verification
   - \`allow_multiple: true\`

10. **Auth UI style** (always ask)
    - Prompt: "What style do you want for the auth pages? Pick one or describe your own."
    - Options: Minimal & clean | Centered card with background | Split layout (form + hero image) | Floating / glassmorphism | Other (I'll describe)

### Step 3: Summarize the plan

After collecting answers, present a concise implementation plan as a markdown checklist.`
  },
  {
    "slug": "best-practices",
    "name": "best-practices",
    "tagline": "Best practices for Better Auth integration",
    "description": "Best practices for Better Auth integration",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/better-auth/better-auth/tree/main/skills/best-practices",
    "tags": [
      "Better Auth",
      "Auth"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Best practices for Better Auth integration",
    "whenToUse": [
      "Integrating best practices into your development workflow.",
      "Following best practices for best practices for better auth integration.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: best-practices\ndescription: Best practices for Better Auth integration\n---\n\nBest practices for Better Auth integration"
  },
  {
    "slug": "explain-error",
    "name": "explain-error",
    "tagline": "Explain Better Auth error messages",
    "description": "Explain Better Auth error messages",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/better-auth/better-auth/tree/main/skills/explain-error",
    "tags": [
      "Better Auth",
      "Auth",
      "AI"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Explain Better Auth error messages",
    "whenToUse": [
      "Integrating explain error into your development workflow.",
      "Following best practices for explain better auth error messages.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: explain-error\ndescription: Explain Better Auth error messages\n---\n\nExplain Better Auth error messages"
  },
  {
    "slug": "providers",
    "name": "providers",
    "tagline": "Better Auth authentication providers",
    "description": "Better Auth authentication providers",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/better-auth/better-auth/tree/main/skills/providers",
    "tags": [
      "Better Auth",
      "Auth"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Better Auth authentication providers",
    "whenToUse": [
      "Integrating providers into your development workflow.",
      "Following best practices for better auth authentication providers.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: providers\ndescription: Better Auth authentication providers\n---\n\nBetter Auth authentication providers"
  },
  {
    "slug": "create-auth",
    "name": "create-auth",
    "tagline": "Create authentication setup with Better Auth",
    "description": "Create authentication setup with Better Auth",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/better-auth/better-auth/tree/main/skills/create-auth",
    "tags": [
      "Better Auth",
      "Auth"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Create authentication setup with Better Auth",
    "whenToUse": [
      "Integrating create auth into your development workflow.",
      "Following best practices for create authentication setup with better auth.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: create-auth\ndescription: Create authentication setup with Better Auth\n---\n\nCreate authentication setup with Better Auth"
  },
  {
    "slug": "emailAndPassword",
    "name": "emailAndPassword",
    "tagline": "Email and password authentication with Better Auth",
    "description": "Email and password authentication with Better Auth",
    "category": "Office & Documents",
    "sourceUrl": "https://github.com/better-auth/better-auth/tree/main/skills/emailAndPassword",
    "tags": [
      "Better Auth",
      "Auth",
      "AI"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Email and password authentication with Better Auth",
    "whenToUse": [
      "Integrating emailAndPassword into your development workflow.",
      "Following best practices for email and password authentication with better auth.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: emailAndPassword\ndescription: Email and password authentication with Better Auth\n---\n\nEmail and password authentication with Better Auth"
  },
  {
    "slug": "organization",
    "name": "organization",
    "tagline": "Organization management with Better Auth",
    "description": "Organization management with Better Auth",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/better-auth/better-auth/tree/main/skills/organization",
    "tags": [
      "Better Auth",
      "Auth"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Organization management with Better Auth",
    "whenToUse": [
      "Integrating organization into your development workflow.",
      "Following best practices for organization management with better auth.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: organization\ndescription: Organization management with Better Auth\n---\n\nOrganization management with Better Auth"
  },
  {
    "slug": "twoFactor",
    "name": "twoFactor",
    "tagline": "Two-factor authentication with Better Auth",
    "description": "Two-factor authentication with Better Auth",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/better-auth/better-auth/tree/main/skills/twoFactor",
    "tags": [
      "Better Auth",
      "Auth"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Two-factor authentication with Better Auth",
    "whenToUse": [
      "Integrating twoFactor into your development workflow.",
      "Following best practices for two-factor authentication with better auth.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: twoFactor\ndescription: Two-factor authentication with Better Auth\n---\n\nTwo-factor authentication with Better Auth"
  }
];
