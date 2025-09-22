"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { currencyBRL, percent, clamp } from "@/lib/format";
import { useState } from "react";
import CurrencyInput from "@/components/CurrencyInput";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import Title3D from "@/components/Title3D";

export default function Home() {
  const [investimentoInicial, setInvestimentoInicial] = useState(0);
  const [aporteMensal, setAporteMensal] = useState(0);
  const [periodo, setPeriodo] = useState(0);
  const [periodoTipo, setPeriodoTipo] = useState("meses");

  // Parâmetros padrão (mock)
  const parametros = [
    { label: "Selic efetiva (a.a.)", value: 14.9 },
    { label: "CDI (a.a.)", value: 14.9 },
    { label: "IPCA (a.a.)", value: 4.36 },
    { label: "TR (a.m.)", value: 0.172 },
    { label: "Juro nominal do Tesouro Prefixado (a.a.)", value: 14.0 },
    { label: "Taxa de custódia da B3 no Tesouro Direto (a.a.)", value: 0.2 },
    { label: "Juro real do Tesouro IPCA+ (a.a.)", value: 6.5 },
    { label: "Taxa de administração do Fundo DI (a.a.)", value: 0.25 },
    { label: "Rentabilidade do CDB (% do CDI)", value: 100 },
    { label: "Rentabilidade do Fundo DI (% do CDI)", value: 98.17 },
    { label: "Rentabilidade da LCI/LCA (% do CDI)", value: 85 },
    { label: "Rentabilidade da Poupança (a.m.)", value: 0.6729 },
  ];

  // Funções de cálculo simplificadas
  function calcularCDB() {
    const taxaCdi = parametros[1].value;
    const rentabilidade = (parametros[8].value / 100) * taxaCdi;
    return calcularRendimento(rentabilidade);
  }
  function calcularLCILCA() {
    const taxaCdi = parametros[1].value;
    const rentabilidade = (parametros[10].value / 100) * taxaCdi;
    return calcularRendimento(rentabilidade);
  }
  function calcularTesouroSelic() {
    return calcularRendimento(parametros[0].value);
  }
  function calcularFundoDI() {
    const taxaCdi = parametros[1].value;
    const rentabilidade =
      (parametros[9].value / 100) * taxaCdi - parametros[7].value;
    return calcularRendimento(rentabilidade);
  }
  function calcularTesouroPrefixado() {
    return calcularRendimento(parametros[4].value);
  }
  function calcularPoupanca() {
    // Poupança: taxa mensal
    const taxaMensal = parametros[11].value;
    const meses = periodoTipo === "meses" ? periodo : periodo * 12;
    let valor = investimentoInicial;
    for (let i = 0; i < meses; i++) {
      valor += aporteMensal;
      valor *= 1 + taxaMensal / 100;
    }
    return valor;
  }
  function calcularTesouroIPCA() {
    // IPCA+ juro real
    const taxaReal = parametros[6].value;
    return calcularRendimento(taxaReal);
  }
  function calcularCorrecaoIPCA() {
    return calcularRendimento(parametros[2].value);
  }
  function calcularRendimento(taxaAnual: number) {
    const meses = periodoTipo === "meses" ? periodo : periodo * 12;
    const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
    let valor = investimentoInicial;
    for (let i = 0; i < meses; i++) {
      valor += aporteMensal;
      valor *= 1 + taxaMensal;
    }
    return valor;
  }

  // Simulação dos investimentos
  const resultados = [
    { nome: "LCI e LCA", valor: calcularLCILCA() },
    { nome: "CDB", valor: calcularCDB() },
    { nome: "Tesouro Selic", valor: calcularTesouroSelic() },
    { nome: "Fundo DI", valor: calcularFundoDI() },
    { nome: "Tesouro Prefixado", valor: calcularTesouroPrefixado() },
    { nome: "Poupança", valor: calcularPoupanca() },
    { nome: "Tesouro IPCA+", valor: calcularTesouroIPCA() },
    { nome: "Correção pelo IPCA", valor: calcularCorrecaoIPCA() },
  ];
  const totalInvestido =
    investimentoInicial +
    aporteMensal * (periodoTipo === "meses" ? periodo : periodo * 12);
  const ranking = [...resultados].sort((a, b) => b.valor - a.valor);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center py-4 px-2">
      <div className="theme-toggle-wrapper">
        <ThemeToggle />
      </div>
      <div className="title-wrapper">
        <Title3D text="CALC Rendimentos" className="mb-8 mt-4 w-full" />
      </div>
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-6">Que aplicação rende mais?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <CurrencyInput
              id="investInicial"
              label="Investimento inicial"
              value={investimentoInicial}
              onValueChange={setInvestimentoInicial}
              placeholder="0,00"
              ariaLabel="Investimento inicial"
            />
            <CurrencyInput
              id="aporteMensal"
              label="Aportes mensais"
              value={aporteMensal}
              onValueChange={setAporteMensal}
              placeholder="0,00"
              ariaLabel="Aportes mensais"
            />
            <div className="flex items-end gap-2">
              <div className="flex flex-col gap-1">
                <Label htmlFor="periodoInput">Período</Label>
                <Input
                  id="periodoInput"
                  type="number"
                  min={0}
                  value={periodo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPeriodo(Number(e.target.value))
                  }
                  className="w-24"
                  placeholder="0"
                  aria-label="Período da aplicação"
                />
              </div>
              <div className="flex-1">
                <Label className="sr-only">Tipo de período</Label>
                <Select value={periodoTipo} onValueChange={setPeriodoTipo}>
                  <SelectTrigger aria-label="Tipo de período">
                    <SelectValue placeholder="meses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meses">meses</SelectItem>
                    <SelectItem value="anos">anos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {parametros.map((p, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    {p.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xl font-bold">
                  {typeof p.value === "number"
                    ? `${p.value}${p.label.includes("%") ? " %" : ""}`
                    : p.value}
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Esses são os parâmetros padrões utilizados na sua simulação. Você
            pode alterá-los e refazer os cálculos para uma simulação avançada.
          </p>
        </div>
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-violet-500 dark:text-violet-400">
                Calculadora de Renda Fixa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base">
                Veja quanto seu dinheiro pode render ao simular investimentos em
                Tesouro Direto, CDBs, LCIs e LCAs, fundos DI e compare com o
                retorno da poupança e a variação da inflação.
              </p>
            </CardContent>
          </Card>
          <div className="mb-4">
            <span className="font-semibold">Total investido: </span>
            <span className="text-violet-600 dark:text-violet-400 font-bold">
              {currencyBRL(totalInvestido)}
            </span>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 text-violet-600 dark:text-violet-400">
              Melhores opções de investimento
            </h2>
            <div className="space-y-2">
              {ranking.map((r) => {
                const width = clamp(
                  (100 * (r.valor - totalInvestido)) / ranking[0].valor,
                  0,
                  100
                );
                return (
                  <div key={r.nome} className="flex items-center gap-3">
                    <span className="w-36 shrink-0">{r.nome}</span>
                    <div className="flex-1">
                      <Progress value={width} />
                    </div>
                    <span className="font-bold text-violet-600 dark:text-violet-400 w-36 text-right">
                      {currencyBRL(r.valor)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mb-6">
            <Button
              onClick={() => {
                document
                  .getElementById("simulacao")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700"
            >
              Ver simulação
            </Button>
          </div>
        </div>
      </div>

      {/* Separador visual entre as seções */}
      <Separator className="my-6 max-w-6xl w-full" />

      <div className="overflow-x-auto max-w-6xl w-full mt-4 px-4" id="simulacao">
        <h2 className="text-2xl font-bold mb-6 text-violet-700 dark:text-violet-400 text-center">
          Simulação do investimento
        </h2>
        <div className="rounded-lg border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-violet-50 dark:bg-violet-900/20">
                <TableHead className="font-bold">Investimento</TableHead>
                <TableHead className="font-bold">
                  Valor bruto acumulado
                </TableHead>
                <TableHead className="font-bold">Rentabilidade bruta</TableHead>
                <TableHead className="font-bold">Custos</TableHead>
                <TableHead className="font-bold">Valor pago em IR</TableHead>
                <TableHead className="font-bold">
                  Valor líquido acumulado
                </TableHead>
                <TableHead className="font-bold">
                  Rentabilidade líquida
                </TableHead>
                <TableHead className="font-bold">Ganho líquido</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultados.map((r) => {
                const bruto = r.valor;
                // Custos/IR simplificados inspirados na imagem (placeholders)
                const custos =
                  r.nome.includes("Selic") || r.nome.includes("Prefixado")
                    ? 3.35
                    : 0;
                const ir =
                  r.nome === "LCI e LCA" || r.nome === "Poupança" ? 0 : 13.1;
                const liquido = bruto - custos - ir;
                const rentBruta = (bruto / totalInvestido - 1) * 100;
                const rentLiquida = (liquido / totalInvestido - 1) * 100;
                const ganho = liquido - totalInvestido;
                return (
                  <TableRow
                    key={r.nome}
                    className="hover:bg-violet-50/50 dark:hover:bg-violet-900/10 transition-colors"
                  >
                    <TableCell className="font-semibold">{r.nome}</TableCell>
                    <TableCell className="text-right">
                      {currencyBRL(bruto)}
                    </TableCell>
                    <TableCell className="text-right">
                      {percent(rentBruta)}
                    </TableCell>
                    <TableCell className="text-right">
                      {currencyBRL(custos)}
                    </TableCell>
                    <TableCell className="text-right">
                      {currencyBRL(ir)}
                    </TableCell>
                    <TableCell className="text-right">
                      {currencyBRL(liquido)}
                    </TableCell>
                    <TableCell className="text-right">
                      {percent(rentLiquida)}
                    </TableCell>
                    <TableCell className="font-bold text-violet-600 dark:text-violet-400 text-right">
                      {currencyBRL(ganho)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
