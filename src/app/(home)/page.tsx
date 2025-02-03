// src/app/page.tsx
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Welcome to TradeFlow</h1>
      <div className="space-x-4">
        <Link href="/auth/login">
          <div className="px-4 py-2 bg-blue-600 text-white rounded">Login</div>
        </Link>
        <Link href="/auth/register">
          <div className="px-4 py-2 bg-green-600 text-white rounded">Register</div>
        </Link>
      </div>
    </div>
  );
}
