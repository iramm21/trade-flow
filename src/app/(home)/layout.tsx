// src/app/home/layout.tsx
"use client";

import { ReactNode } from "react";
import HomeHeader from "@/components/layout/HomeHeader";
import HomeFooter from "@/components/layout/HomeFooter";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <HomeHeader />
      <main>{children}</main>
      <HomeFooter />
    </div>
  );
}
