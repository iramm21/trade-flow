"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";

interface Business {
  id: string;
  name: string;
}

const fetcher = (url: string): Promise<Business[]> =>
  fetch(url).then((res) => res.json());

export default function ProjectCreation() {
  const { data: session, status } = useSession();
  const [businessId, setBusinessId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  // Only fetch businesses if the session is available
  const { data: businesses, error } = useSWR(
    session ? `/api/business?ownerId=${session.user.id}` : null,
    fetcher
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch("/api/project/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId, name, description }),
      });
      if (res.ok) {
        setMessage("Project created successfully!");
        // Optionally clear fields after success
        setName("");
        setDescription("");
      } else {
        const errorData = await res.json();
        setMessage(errorData.error || "Failed to create project");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage("An unexpected error occurred: " + error.message);
      } else {
        setMessage("An unexpected error occurred");
      }
      console.error(error);
    }
  }

  if (status === "loading") return <p className="p-8">Loading...</p>;
  if (!session)
    return <p className="p-8">You must be logged in to create a project.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-md bg-white p-6 rounded shadow"
      >
        {/* Business Selector */}
        <div>
          <label className="block text-gray-700 mb-1">Select Business</label>
          {error && <p className="text-red-500">Failed to load businesses</p>}
          {!businesses ? (
            <p className="text-gray-500">Loading businesses...</p>
          ) : (
            <select
              value={businessId}
              onChange={(e) => setBusinessId(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">-- Select a Business --</option>
              {businesses.map((biz) => (
                <option key={biz.id} value={biz.id}>
                  {biz.name}
                </option>
              ))}
            </select>
          )}
        </div>
        {/* Project Name */}
        <div>
          <label className="block text-gray-700 mb-1">Project Name</label>
          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        {/* Project Description */}
        <div>
          <label className="block text-gray-700 mb-1">
            Project Description (optional)
          </label>
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Create Project
        </button>
        {message && <p className="text-center mt-2">{message}</p>}
      </form>
      <div className="mt-4">
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
