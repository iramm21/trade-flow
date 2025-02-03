"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function DashboardHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Title */}
        <Link href="/dashboard">
          <span className="text-2xl font-bold hover:text-gray-300 cursor-pointer">
            TradeFlow Dashboard
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link href="/dashboard">
            <span className="hover:text-gray-300 cursor-pointer">Home</span>
          </Link>
          <Link href="/business/register">
            <span className="hover:text-gray-300 cursor-pointer">
              Create Business
            </span>
          </Link>
          {session && (
            <button
              onClick={() => signOut()}
              className="hover:text-gray-300 cursor-pointer"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
