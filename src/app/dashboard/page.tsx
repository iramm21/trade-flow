"use client";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";
import type { Business } from "@/types/next-auth"; // Ensure this type is defined appropriately

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

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You must be logged in to view the dashboard.</p>;
  if (error) return <p>Error loading businesses: {error.message}</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <h2 className="text-xl mb-2">Your Businesses</h2>
      {businesses && businesses.length > 0 ? (
        <ul className="space-y-2">
          {businesses.map((business: Business) => (
            <li key={business.id} className="p-4 border rounded">
              <h3 className="text-lg font-semibold">{business.name}</h3>
              <Link
                href={`/business/${business.id}/projects`}
                className="text-blue-500"
              >
                View Projects
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No businesses found. Consider creating one.</p>
      )}
    </div>
  );
}
