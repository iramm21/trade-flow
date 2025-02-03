"use client";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";
import type { Business } from "@/types/next-auth";

// A simple fetcher function that returns JSON data
const fetcher = (url: string): Promise<Business[]> =>
  fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data: session, status } = useSession();

  // Only fetch data if a session is available
  const { data: businesses, error } = useSWR(
    session ? `/api/business?ownerId=${session.user.id}` : null,
    fetcher
  );

  if (status === "loading") return <p className="p-8">Loading...</p>;
  if (!session)
    return <p className="p-8">You must be logged in to view the dashboard.</p>;
  if (error)
    return <p className="p-8">Error loading businesses: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link
          href="/business/register"
          className="mt-4 md:mt-0 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Create Business
        </Link>
      </div>

      {/* Business List */}
      <h2 className="text-xl font-semibold mb-4">Your Businesses</h2>
      {businesses && businesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business: Business) => (
            <div
              key={business.id}
              className="p-4 border rounded hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2">{business.name}</h3>
              <Link
                href={`/business/${business.id}/project/`}
                className="text-blue-500 hover:underline"
              >
                View Projects &rarr;
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="mb-4 text-gray-700">No businesses found.</p>
          <Link
            href="/business/register"
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Create your first business
          </Link>
        </div>
      )}
    </div>
  );
}
