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

// A fetcher function to retrieve projects from the API
const fetcher = (url: string): Promise<Project[]> =>
  fetch(url).then((res) => res.json());

export default function BusinessProjectsPage() {
  // Extract businessId from the route parameters
  const { businessId } = useParams();

  // Fetch the projects only if businessId is available
  const { data: projects, error } = useSWR(
    businessId ? `/api/business/${businessId}/projects` : null,
    fetcher
  );

  if (!projects && !error) return <p className="p-8">Loading projects...</p>;
  if (error)
    return (
      <p className="p-8">
        Error loading projects: {error.message || "Unknown error"}
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">
        Projects for Business: {businessId}
      </h1>
      {projects && projects.length > 0 ? (
        <ul className="space-y-6">
          {projects.map((project) => (
            <li
              key={project.id}
              className="p-4 border rounded hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold">{project.name}</h2>
              {project.description && (
                <p className="text-gray-700 my-2">{project.description}</p>
              )}
              <p className="text-sm text-gray-500">Status: {project.status}</p>
              <Link
                href={`/project/${project.id}`}
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                View Details &rarr;
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-12 text-gray-600">
          No projects found for this business.
        </p>
      )}
      <div className="mt-8 text-center">
        <Link
          href={`/project/create?businessId=${businessId}`}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Create New Project
        </Link>
      </div>
    </div>
  );
}
