---
name: grid-layout-system
description: A structured CSS Grid design system for building polished, production-quality app shells and marketing pages. Implements the layout patterns found in Linear, Vercel, and Resend — sidebar rails, content panels, responsive sidebars — using Tailwind CSS v4. Zero layout drift across breakpoints. Apply when building any multi-column app layout, dashboard, or landing page that needs professional structure.
---

# Grid Layout System

**Technique:** Two Primitives, Infinite Layouts

Every complex layout is composed of exactly two primitives: a **stack** (vertical) and a **grid** (two-dimensional). Master those two with CSS Grid and you never need a layout library again.

## The Two Primitives

```css
/* Primitive 1: Stack — vertical flow, no columns */
.stack {
  display: grid;
  gap: var(--space);
}

/* Primitive 2: Grid — explicit rows AND columns */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--min), 1fr));
  gap: var(--space);
}
```

Compose these two. Nest them. That's the whole system.

## App Shell — The 3-Zone Layout

The standard app shell used by Linear, Vercel dashboard, Resend, and Supabase:

```
┌──────────┬────────────────────────────┐
│          │  Top bar (fixed height)    │
│  Sidebar │────────────────────────────│
│  (rail)  │  Content area             │
│          │  (scrollable)             │
└──────────┴────────────────────────────┘
```

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh grid grid-cols-[240px_1fr] grid-rows-[56px_1fr] overflow-hidden">
      {/* Top bar — spans both columns */}
      <header className="col-span-2 border-b border-black/10 dark:border-white/8 flex items-center px-6">
        <TopBar />
      </header>

      {/* Sidebar — fixed, scrollable independently */}
      <aside className="border-r border-black/10 dark:border-white/8 overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Content — scrollable independently */}
      <main className="overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
```

**Key properties:**
- `h-dvh` — full viewport height (dynamic, accounts for mobile browser chrome)
- `grid-rows-[56px_1fr]` — fixed header, flexible content
- `overflow-hidden` on root — prevents double scrollbars
- `overflow-y-auto` only on sidebar and main — each scrolls independently

## Responsive Sidebar Collapse

```tsx
// components/Sidebar.tsx
"use client";
import { useState } from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-dvh grid grid-rows-[56px_1fr] overflow-hidden">
      <header className="border-b border-black/10 dark:border-white/8 flex items-center justify-between px-4">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle sidebar"
        >
          <MenuIcon />
        </button>
        <Logo />
      </header>

      <div className="grid lg:grid-cols-[240px_1fr] overflow-hidden relative">
        {/* Sidebar — drawer on mobile, static on desktop */}
        <aside
          className={`
            absolute inset-y-0 left-0 z-20 w-64 bg-white dark:bg-black
            border-r border-black/10 dark:border-white/8
            transform transition-transform duration-200 overflow-y-auto
            lg:relative lg:translate-x-0 lg:w-auto
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <Sidebar />
        </aside>

        {/* Overlay for mobile */}
        {open && (
          <div
            className="absolute inset-0 z-10 bg-black/30 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <main className="overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
```

## Content Area Grid

Inside the main content area, use a responsive card grid:

```tsx
// Responsive 3-column card grid
<div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map((item) => <Card key={item.id} {...item} />)}
</div>
```

For a masonry-like layout that fills available width:

```tsx
// Auto-fill: as many columns as fit at minimum 280px
<div className="p-6 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
  {items.map((item) => <Card key={item.id} {...item} />)}
</div>
```

## Detail Panel Layout (Split View)

Linear-style — list on left, detail panel on right:

```tsx
<div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] h-full overflow-hidden">
  {/* List — scrollable */}
  <div className="border-r border-black/10 dark:border-white/8 overflow-y-auto">
    {items.map((item) => (
      <Link key={item.id} href={`?id=${item.id}`} className="block px-4 py-3 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] border-b border-black/5 dark:border-white/5">
        <p className="font-medium text-sm">{item.title}</p>
        <p className="text-xs text-black/40 dark:text-white/40 mt-0.5">{item.subtitle}</p>
      </Link>
    ))}
  </div>

  {/* Detail — scrollable */}
  <div className="overflow-y-auto p-6">
    {selectedItem ? <ItemDetail item={selectedItem} /> : <EmptyState />}
  </div>
</div>
```

## Structural Grid (Rail Lines)

The Linear/Resend aesthetic — grid lines are visible design elements, not hidden scaffolding.

```css
/* globals.css */
.page-rails {
  --rail-offset: max(1rem, calc(50% - 36rem));
  position: relative;
  overflow-x: clip; /* NEVER overflow-x: hidden — breaks position:sticky */
}

.page-rails::before,
.page-rails::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgb(0 0 0 / 0.08);
  pointer-events: none;
}

.page-rails::before { left: var(--rail-offset); }
.page-rails::after { right: var(--rail-offset); }

html.dark .page-rails::before,
html.dark .page-rails::after {
  background: rgb(255 255 255 / 0.08);
}

.rail-bounded {
  margin-left: var(--rail-offset);
  margin-right: var(--rail-offset);
}
```

```tsx
// Marketing page with structural grid
<div className="page-rails flex flex-col">
  <Hero />
  <hr className="rail-bounded border-black/8 dark:border-white/8" />
  <Features />
  <hr className="rail-bounded border-black/8 dark:border-white/8" />
  <CTA />
</div>
```

## Feature Grid with Internal Dashed Borders

The card grid pattern used across Linear, Vercel, Resend — cells divided by dashed lines, no card backgrounds:

```tsx
function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="rail-bounded border-t border-black/8 dark:border-white/8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <div
            key={feature.id}
            className={[
              "group px-6 py-8 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]",
              // Right border: not first in 3-col row
              i % 3 !== 0 ? "lg:border-l lg:border-dashed lg:border-black/8 dark:lg:border-white/8" : "",
              // Right border: not first in 2-col row (tablet)
              i % 2 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-black/8 dark:sm:max-lg:border-white/8" : "",
              // Top border: not in first 3-col row
              i >= 3 ? "lg:border-t lg:border-dashed lg:border-black/8 dark:lg:border-white/8" : "",
              // Top border: not in first 2-col row (tablet)
              i >= 2 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-black/8 dark:sm:max-lg:border-white/8" : "",
              // Top border: all after first (mobile single-col)
              i >= 1 ? "max-sm:border-t max-sm:border-dashed max-sm:border-black/8 dark:max-sm:border-white/8" : "",
            ].filter(Boolean).join(" ")}
          >
            <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-black/8 dark:border-white/8 text-black/40 dark:text-white/40 transition-colors group-hover:text-black dark:group-hover:text-white">
              <feature.Icon size={18} />
            </div>
            <h3 className="text-sm font-semibold text-black dark:text-white">{feature.title}</h3>
            <p className="mt-2 text-sm text-black/50 dark:text-white/50 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Tailwind v4 Grid Tokens

Add to `globals.css` for reusable grid sizing:

```css
@theme inline {
  --sidebar-width: 240px;
  --topbar-height: 56px;
  --content-max-width: 1100px;
  --rail-offset: max(1rem, calc(50% - 36rem));
}
```

Use in components:

```tsx
<div className="max-w-[var(--content-max-width)] mx-auto px-6">
```

## Dot Pattern Background

Subtle texture used in alternating sections:

```css
.dot-pattern {
  background-image: radial-gradient(
    rgb(0 0 0 / 0.04) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
}

html.dark .dot-pattern {
  background-image: radial-gradient(
    rgb(255 255 255 / 0.04) 1px,
    transparent 1px
  );
}
```

## Implementation Checklist

- [ ] `h-dvh` (not `h-screen`) for full-height layouts — accounts for mobile browser chrome
- [ ] `overflow-hidden` on the outermost grid container
- [ ] `overflow-y-auto` only on individually-scrolling panes (sidebar, main content)
- [ ] `overflow-x: clip` (not `hidden`) on `.page-rails` — `hidden` breaks `position: sticky`
- [ ] Sidebar is `absolute` + `translate-x` on mobile, `relative` on `lg:`
- [ ] All feature grid cells have `group transition-colors hover:bg-*` for hover feedback
- [ ] Dashed internal borders use `border-dashed border-black/8` — never hardcoded hex
- [ ] Add `scroll-padding-top: 56px` to `html` when using sticky nav with anchor links

## Design Token Reference

| Element | Style |
|---|---|
| Vertical rail lines | `1px solid rgb(0 0 0 / 0.08)` |
| Section dividers | `border-black/8 dark:border-white/8` |
| Internal grid dividers | `border-dashed border-black/8` |
| Card hover | `hover:bg-black/[0.02] dark:hover:bg-white/[0.02]` |
| Section label | `font-mono text-[10px] uppercase tracking-widest` |
| Dot pattern cell | `24px × 24px`, `4% opacity` |

## Common Pitfalls

1. **`overflow-x: hidden` on rails container** — breaks `position: sticky` on any child. Always use `overflow-x: clip`.

2. **Applying padding to the grid container instead of cells** — when using `items-stretch` for full-height dividers, padding must go on children, not the grid.

3. **`border-l` on the first cell** — the first cell in any row should never have a left border. Use `i % columns !== 0` logic.

4. **Using `vh` instead of `dvh`** — on mobile Safari, `100vh` includes browser chrome, causing overflow. `100dvh` adjusts dynamically.

5. **Forgetting hover states on grid cells** — inconsistent hover coverage makes some sections feel static. Every interactive cell needs `group transition-colors hover:bg-*`.

## When to Apply

- SaaS dashboards with sidebar navigation
- Admin panels and data-heavy interfaces
- Marketing pages with structured section layouts
- Any multi-column layout that needs to collapse correctly on mobile

## When NOT to Apply

- Single-column content pages (articles, docs) — use `max-w-prose mx-auto`
- Apps that need drag-and-drop reordering (use `flex` instead for easier manipulation)
- Layouts with highly irregular column counts — CSS Grid subgrid is complex; use a library
