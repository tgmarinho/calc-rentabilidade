"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Utilizando uma abordagem mais simples para lidar com os tipos
type ThemeProviderProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
