"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
}

const Providers: React.FC<LayoutProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
