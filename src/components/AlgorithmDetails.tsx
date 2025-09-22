"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AlgorithmDetails() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-6">
      <Button
        onClick={toggleDetails}
        className="bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white"
      >
        Ver algoritmo dos cálculos
      </Button>

      {isOpen && (
        <div className="algorithm-details-overlay">
          <div className="algorithm-details-container">
            <Button
              onClick={toggleDetails}
              className="absolute top-4 right-4 bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700"
            >
              Fechar
            </Button>
            <h3 className="text-xl font-bold mb-4">Algoritmos de Cálculo</h3>
            <div className="space-y-4">
              <div className="bg-violet-50 dark:bg-violet-900/50 p-4 rounded-md overflow-x-auto">
                <h3 className="font-bold text-lg mb-2">
                  Cálculo de Rendimento
                </h3>
                <pre className="text-sm">
                  {`function calcularRendimento(taxaAnual: number) {
  const meses = periodoTipo === "meses" ? periodo : periodo * 12;
  const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
  let valor = investimentoInicial;
  for (let i = 0; i < meses; i++) {
    valor += aporteMensal;
    valor *= 1 + taxaMensal;
  }
  return valor;
}`}
                </pre>
              </div>

              <div className="bg-violet-50 dark:bg-violet-900/50 p-4 rounded-md overflow-x-auto">
                <h3 className="font-bold text-lg mb-2">Cálculo de CDB</h3>
                <pre className="text-sm">
                  {`function calcularCDB() {
  const taxaCdi = parametros[1].value;
  const rentabilidade = (parametros[8].value / 100) * taxaCdi;
  return calcularRendimento(rentabilidade);
}`}
                </pre>
                <p className="mt-2 text-sm">
                  O CDB utiliza a taxa do CDI multiplicada pela rentabilidade do
                  CDB (geralmente 100% do CDI).
                </p>
              </div>

              <div className="bg-violet-50 dark:bg-violet-900/50 p-4 rounded-md overflow-x-auto">
                <h3 className="font-bold text-lg mb-2">Cálculo de LCI/LCA</h3>
                <pre className="text-sm">
                  {`function calcularLCILCA() {
  const taxaCdi = parametros[1].value;
  const rentabilidade = (parametros[10].value / 100) * taxaCdi;
  return calcularRendimento(rentabilidade);
}`}
                </pre>
                <p className="mt-2 text-sm">
                  LCI e LCA geralmente possuem rentabilidade menor que o CDB
                  (85% a 95% do CDI), mas são isentos de IR.
                </p>
              </div>

              <div className="bg-violet-50 dark:bg-violet-900/50 p-4 rounded-md overflow-x-auto">
                <h3 className="font-bold text-lg mb-2">Cálculo da Poupança</h3>
                <pre className="text-sm">
                  {`function calcularPoupanca() {
  // Poupança: taxa mensal
  const taxaMensal = parametros[11].value;
  const meses = periodoTipo === "meses" ? periodo : periodo * 12;
  let valor = investimentoInicial;
  for (let i = 0; i < meses; i++) {
    valor += aporteMensal;
    valor *= 1 + taxaMensal / 100;
  }
  return valor;
}`}
                </pre>
                <p className="mt-2 text-sm">
                  A poupança utiliza uma taxa fixa mensal de 0,5% + TR quando a
                  taxa Selic é maior que 8,5% ao ano ou 70% da taxa Selic + TR
                  quando a Selic é menor ou igual a 8,5% ao ano.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
