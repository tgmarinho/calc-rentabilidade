"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Usando o tipo inferido diretamente do componente NextThemesProvider
type ThemeProviderProps = {
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof NextThemesProvider>, "children">;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
