"use client";
import ReduxProvider from "@/providers/ReduxProvider";
import SessionProvider from "@/providers/SessionProvider";
import { ReactNode } from "react";

const LayoutClient = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider>
      <SessionProvider>{children}</SessionProvider>
    </ReduxProvider>
  );
};

export default LayoutClient;
