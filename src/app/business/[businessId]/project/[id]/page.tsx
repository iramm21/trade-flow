"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";

// Define a type for a project
interface Project {
  id: string;
  name: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// A fetcher function that returns a single project's data
const fetcher = (url: string): Promise<Project> =>
  fetch(url).then((res) => res.json());

export default function ProjectPage() {
  // Extract the project ID from the route parameters
  const { id } = useParams();

  // Fetch project data from the API, only if an ID is present
  const { data: project, error } = useSWR<Project>(
    id ? `/api/project/${id}` : null,
    fetcher
  );

  // If there's no project and no error, we are still loading
  if (!project && !error) return <p className="p-8">Loading...</p>;
  // If an error occurred, display it
  if (error)
    return <p className="p-8">Error loading project: {error.message}</p>;
  // Safety check in case project is still undefined
  if (!project) return <p className="p-8">Project not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <p className="text-gray-600 mb-2">Status: {project.status}</p>
      {project.description && <p className="mb-4">{project.description}</p>}
      <p className="text-sm text-gray-500">
        Created at: {new Date(project.createdAt).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500 mb-6">
        Last updated: {new Date(project.updatedAt).toLocaleString()}
      </p>
      <Link href="/dashboard">
        <span className="text-blue-500 hover:underline">
          ← Back to Dashboard
        </span>
      </Link>
    </div>
  );
}
