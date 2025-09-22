"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { currencyBRL, percent } from "@/lib/format";
import Link from "next/link";
import { useMemo } from "react";

function num(v: string | null, d = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
}

export default function SimulacaoPage() {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const investimentoInicial = num(params.get("ii"), 0);
  const aporteMensal = num(params.get("am"), 0);
  const periodo = num(params.get("p"), 0);
  const periodoTipo = params.get("pt") === "anos" ? "anos" : "meses";

  const meses = periodoTipo === "meses" ? periodo : periodo * 12;

  function calcularRendimento(taxaAnual: number) {
    const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
    let valor = investimentoInicial;
    for (let i = 0; i < meses; i++) {
      valor += aporteMensal;
      valor *= 1 + taxaMensal;
    }
    return valor;
  }

  const resultados = useMemo(() => {
    const cdi = 14.9;
    const bruto = (t: number) => calcularRendimento(t);
    const porCdi = (pct: number) => calcularRendimento((pct / 100) * cdi);
    return [
      { nome: "LCI e LCA", bruto: porCdi(85), custos: 0, ir: 0 },
      { nome: "CDB", bruto: porCdi(100), custos: 0, ir: 13.1 },
      { nome: "Tesouro Selic", bruto: bruto(14.9), custos: 3.35, ir: 13.1 },
      { nome: "Fundo DI", bruto: porCdi(98.17), custos: 4.19, ir: 12.87 },
      {
        nome: "Tesouro Prefixado",
        bruto: bruto(14.0),
        custos: 3.35,
        ir: 12.35,
      },
      {
        nome: "Poupança",
        bruto: calcularRendimento((1 + 0.006729) ** 12 - 1),
        custos: 0,
        ir: 0,
      },
      { nome: "Tesouro IPCA+", bruto: bruto(6.5), custos: 3.34, ir: 9.71 },
      { nome: "Correção pelo IPCA", bruto: bruto(4.36), custos: 0, ir: 0 },
    ].map((r) => {
      const totalInvestido = investimentoInicial + aporteMensal * meses;
      const liquido = r.bruto - r.custos - r.ir;
      return {
        ...r,
        totalInvestido,
        rentBruta: (r.bruto / totalInvestido - 1) * 100,
        liquido,
        rentLiquida: (liquido / totalInvestido - 1) * 100,
        ganho: liquido - totalInvestido,
      };
    });
  }, [investimentoInicial, aporteMensal, meses]);

  const totalInvestido = investimentoInicial + aporteMensal * meses;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-purple-700">
          Simulação do investimento
        </h1>
        <Link href="/" className="text-blue-700 underline">
          Voltar
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
        <div>
          <div className="text-gray-600">Valor inicial investido:</div>
          <div className="text-blue-700 font-bold">
            {currencyBRL(investimentoInicial)}
          </div>
        </div>
        <div>
          <div className="text-gray-600">Aportes Mensais:</div>
          <div className="text-blue-700 font-bold">
            {currencyBRL(aporteMensal)}
          </div>
        </div>
        <div>
          <div className="text-gray-600">Período da aplicação:</div>
          <div className="text-blue-700 font-bold">{meses} meses</div>
        </div>
        <div>
          <div className="text-gray-600">Soma dos valores investidos:</div>
          <div className="text-blue-700 font-bold">
            {currencyBRL(totalInvestido)}
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Investimento</TableHead>
            <TableHead>Valor bruto acumulado</TableHead>
            <TableHead>Rentabilidade bruta</TableHead>
            <TableHead>Custos</TableHead>
            <TableHead>Valor pago em IR</TableHead>
            <TableHead>Valor líquido acumulado</TableHead>
            <TableHead>Rentabilidade líquida</TableHead>
            <TableHead>Ganho líquido</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resultados.map((r) => (
            <TableRow key={r.nome}>
              <TableCell className="font-semibold">{r.nome}</TableCell>
              <TableCell>{currencyBRL(r.bruto)}</TableCell>
              <TableCell>{percent(r.rentBruta)}</TableCell>
              <TableCell>{currencyBRL(r.custos)}</TableCell>
              <TableCell>{currencyBRL(r.ir)}</TableCell>
              <TableCell>{currencyBRL(r.liquido)}</TableCell>
              <TableCell>{percent(r.rentLiquida)}</TableCell>
              <TableCell className="font-bold text-blue-700">
                {currencyBRL(r.ganho)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="text-xs text-gray-500 mt-4">
        Os cálculos consideram taxas de juros e inflação constantes ao longo do
        período e são exemplos simplificados.
      </p>
    </div>
  );
}
