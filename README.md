# Fixed Income Calculator

Compare Brazilian fixed-income investments side by side. Enter an amount and a period, and the app shows the net return for each option after taxes.

**Live demo:** https://tgmarinho.github.io/calc-rentabilidade/

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38BDF8?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=white)

## What it does

- Calculates returns for Tesouro Direto (Selic, Prefixado, IPCA+), CDB, LCI/LCA, Fundo DI, and Poupança.
- Compares every option in a single view, with taxes already applied.
- Shows a detailed breakdown for each type: gross value, taxes, and net value.
- Light and dark theme.

## Stack

Next.js 15 (App Router, Turbopack), TypeScript, Tailwind CSS, shadcn/ui, React Query, Zod, and next-themes.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## How to use

1. Enter the initial amount.
2. Set the monthly contribution.
3. Choose the period, in months or years.
4. Read the comparison and the detailed breakdown for each investment type.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |

Found a bug or have an idea? Open an issue or send a pull request.
