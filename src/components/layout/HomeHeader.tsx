"use client";

import Link from "next/link";

export default function HomeHeader() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <Link href="/">
            <span>TradeFlow</span>
          </Link>
        </h1>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link href="/features" className="hover:text-gray-200">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-gray-200">
            Pricing
          </Link>
          <Link href="/auth/login" className="hover:text-gray-200">
            Login
          </Link>
          <Link href="/auth/register" className="hover:text-gray-200">
            Register
          </Link>
        </nav>
        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
