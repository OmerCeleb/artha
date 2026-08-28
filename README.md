# artha

A personal finance tracker that keeps your data on your device, and tries to make budgeting less of a chore.

> **Status:** working prototype, no longer in active development. Runs entirely in the browser — no account, no server, no deployment.

## Why

Most budgeting apps ask you to hand over bank credentials before they show you anything. That's a lot of trust to ask for a spending chart.

artha takes the opposite approach: everything lives in `localStorage`. There's no backend to send data to, no sign-up, and no way for the app to see your finances even if it wanted to. The trade-off is honest and stated up front — clear your browser data and your history goes with it.

The second idea was that tracking spending is a habit problem more than a maths problem, so the app borrows from games: you earn XP for logging transactions, hitting goals and keeping streaks, and level up as you go.

## Features

**Transactions** — log income and expenses across configurable categories, with multi-currency support.

**Goals** — set savings targets, track progress, get credited when you hit them.

**Analytics** — spending breakdowns by category and over time.

**Progression** — an XP and level system (`src/config/levels.ts`) that rewards adding transactions, completing goals and maintaining daily, weekly and monthly streaks. Level titles are localised.

**Localisation** — interface in English, Swedish and Turkish.

**Theming** — light and dark mode.

**Onboarding** — a first-run flow that sets up currency, categories and initial goals.

## Architecture

A React SPA with no backend. State is held in four React contexts and persisted to `localStorage` through a single storage service:

```
src/
├── screens/       Onboarding · Dashboard · Transactions · Goals · Analytics · Profile
├── contexts/      Auth · Language · Theme · Transaction
├── services/      storage.ts (localStorage) · notifications.ts
├── config/        categories · currencies · levels · constants · initialGoals
├── components/    grouped by feature
└── types/
```

Keeping all persistence behind `services/storage.ts` was deliberate: swapping `localStorage` for an API later means rewriting one file rather than every context.

## Tech stack

| | |
|---|---|
| Framework | React 18 (Create React App) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Routing | React Router |
| Dates | date-fns |
| Icons | Lucide |
| Persistence | Browser `localStorage` |

## Running locally

```bash
npm install
npm start
```

No environment variables or database needed.

## Known gaps

- No automated tests. Testing libraries are installed but no test suite was written.
- No data export or import, so there's no way to move your history between browsers.
- `localStorage` has a size limit; the app doesn't handle hitting it.
- Not deployed anywhere.
