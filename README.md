# Calculadora de Investimentos

Uma aplicação web estática para calcular e comparar diferentes opções de investimentos no Brasil, desenvolvida com Next.js e o T3 Stack.

## Funcionalidades

- Cálculo de rendimentos para diferentes tipos de investimentos:
  - Tesouro Direto (Selic, Prefixado, IPCA+)
  - CDB
  - LCI/LCA
  - Fundo DI
  - Poupança
- Comparativo visual entre as diferentes opções
- Simulação detalhada dos investimentos
- Suporte a modo escuro/claro com tema Sky

## Stack utilizada

- Next.js 15.5.3 (com App Router e Turbopack)
- TypeScript
- TailwindCSS
- Prisma (preparado para futuras implementações)
- tRPC (preparado para futuras implementações)
- React Query
- Zod
- Shadcn UI (componentes personalizados)
- next-themes para suporte a temas

## Scripts principais

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera build de produção
- `npm run start` — inicia o servidor em produção

## Como adicionar componentes Shadcn UI

Use o comando:

```bash
npx shadcn@latest add <componente>
```

Consulte a [documentação oficial](https://ui.shadcn.com/docs/cli)

## Como usar

1. Insira o valor do investimento inicial
2. Configure o valor dos aportes mensais
3. Defina o período da aplicação (em meses ou anos)
4. Veja automaticamente a comparação entre os diferentes tipos de investimentos
5. Confira a simulação detalhada com valores brutos, líquidos e impostos

---

Para dúvidas ou melhorias, abra uma issue ou contribua via pull request.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
