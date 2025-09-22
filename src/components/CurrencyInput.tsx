"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function onlyDigits(s: string) {
  return s.replace(/\D+/g, "");
}

function formatBRLFromCents(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function parseToCentsFromLocale(value: string) {
  // Remove tudo que não é dígito e monta centavos
  const digits = onlyDigits(value);
  if (!digits) return 0;
  return parseInt(digits, 10);
}

export type CurrencyInputProps = {
  id?: string;
  label?: string;
  value: number; // valor em reais (ex: 1234.56)
  onValueChange: (value: number) => void;
  placeholder?: string;
  ariaLabel?: string;
};

export default function CurrencyInput({
  id,
  label,
  value,
  onValueChange,
  placeholder = "0,00",
  ariaLabel,
}: CurrencyInputProps) {
  const [cents, setCents] = useState(Math.round(value * 100));
  const formatted = useMemo(() => formatBRLFromCents(cents), [cents]);

  useEffect(() => {
    setCents(Math.round(value * 100));
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newCents = parseToCentsFromLocale(e.target.value);
      setCents(newCents);
      onValueChange(newCents / 100);
    },
    [onValueChange]
  );

  return (
    <div className="flex flex-col gap-1">
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-muted-foreground select-none">
          R$
        </span>
        <Input
          id={id}
          type="text"
          inputMode="numeric"
          pattern="[0-9.,]*"
          value={formatted.replace(/^R\$\s?/, "")}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label={ariaLabel || label}
          className="pl-10"
        />
      </div>
    </div>
  );
}
