// src/components/layout/DashboardSidebar.tsx
"use client";

import Link from "next/link";

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-full p-4">
      <nav className="space-y-4">
        <Link href="/dashboard">
          <span className="block hover:text-gray-300">Dashboard Home</span>
        </Link>
        <Link href="/business/register">
          <span className="block hover:text-gray-300">Register Business</span>
        </Link>
        <Link href="/project/create">
          <span className="block hover:text-gray-300">Create Project</span>
        </Link>
        <Link href="/trade-calc">
          <span className="block hover:text-gray-300">Trade Calculator</span>
        </Link>
      </nav>
    </aside>
  );
}
