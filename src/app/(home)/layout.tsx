// src/app/home/layout.tsx
"use client";

import { ReactNode } from "react";
import HomeHeader from "@/components/layout/HomeHeader";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <HomeHeader />
      <main>{children}</main>
    </div>
  );
}
