# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Dev server
npm run dev

# Production build (type-checks then bundles)
npm run build

# Lint with Oxlint
npm run lint

# Preview production build
npm run preview
```

Firebase Functions (in `functions/`):
```bash
cd functions && npm run build   # compile TS
firebase deploy --only functions
firebase deploy --only firestore:rules
```

No test suite exists in this project.

## Environment

Copy `.env.example` to `.env` and fill in Firebase credentials plus the Discord webhook URL (`VITE_DISCORD_WEBHOOK_URL`). All env vars are prefixed `VITE_` and consumed via `import.meta.env`.

## Architecture

**Frontend:** React 19 + TypeScript, Vite 8, Tailwind CSS v3, React Router v7. Linter is **Oxlint** (not ESLint) — config lives in `.oxlintrc.json`.

**Backend:** Firebase only — no custom server.
- **Firestore** for `bookings`, `stations`, and `settings/site`.
- **Firebase Auth** (Google sign-in) for the admin panel; authorized emails are hardcoded in `src/contexts/AuthContext.tsx` and mirrored in `firestore.rules`.
- **Firebase Functions** (`functions/src/index.ts`) has one trigger — `onBookingCreated` — that sends a Discord embed when a booking document is created.

**Data flow for bookings:**
1. `src/firebase/bookings.ts` is the single source of truth for all Firestore reads/writes on `bookings` and `stations`.
2. When a booking is created via `createBooking()`, it writes to Firestore and also calls the Discord webhook directly from the client (the Functions trigger is a secondary/backup path).
3. `getBusySlots()` / `isSlotBusy()` helpers compute availability from existing bookings; `subscribeToBookingsForDate()` keeps the Booking page reactive.
4. Stations are seeded automatically from `DEFAULT_STATIONS` on first Firestore read if the collection is empty.

**Settings pattern:**
- `src/firebase/settings.ts` handles one-time reads and writes to `settings/site`.
- `src/hooks/useSettings.ts` provides a live-updating React hook via `onSnapshot` for pages that need real-time settings (contact info, pricing). Use this hook in components; use `getSettings()` / `getCachedSettings()` in non-React contexts.

**Admin panel** (`src/pages/Admin.tsx`): five tabs — Calendar (time-slot grid per station per day), Stations (open/closed/full toggle), Bookings (list view), Discord (webhook test), Settings (contact info + pricing). Gated entirely by `isAdmin` from `AuthContext`.

## Design System

The UI follows a **neobrutalist** style. All key tokens live in `tailwind.config.js`:

| Token | Value |
|---|---|
| `kai-dark` | `#1A1E24` (page background) |
| `kai-deeper` | `#14171C` (navbar/admin header) |
| `kai-surface` | `#22272F` (cards) |
| `kai-ink` | `#0C0E12` (borders/shadows) |
| `kai-red` | `#C0392B` (accent/CTA) |
| `kai-muted` | `#A9ADB4` |

Global utility classes defined in `src/index.css`:
- `.btn-neo` — bordered button with shadow-shift on hover/active
- `.card-neo` — bordered surface card (`border-3 border-kai-ink bg-kai-surface`)
- `.input-neo` — no-radius input with neo border
- `.reveal` / `.stagger-children` — scroll-reveal animation classes (toggled `.visible` by `useInView`)

Always use `border-3` (custom Tailwind value = `3px`) instead of standard `border-2`/`border-4` for structural borders.

## Hooks

- `useSettings()` — live Firestore settings with defaults fallback
- `useInView(ref)` — triggers `.visible` class for scroll animations
- `useCounter(target, duration)` — animated number counter
- `useTilt(ref)` — 3-D tilt effect on mouse move
