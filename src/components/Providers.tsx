"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface LayoutProps {
  children: React.ReactNode;
}

const Providers: React.FC<LayoutProps> = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>{children}</SessionProvider>
    </NextThemesProvider>
  );
};

export default Providers;
