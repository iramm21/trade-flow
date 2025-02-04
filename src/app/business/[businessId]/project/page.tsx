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

// Define a type for business details
interface BusinessInfo {
  id: string;
  name: string;
}

// Fetcher for projects (returns an array of projects)
const fetchProjects = (url: string): Promise<Project[]> =>
  fetch(url).then((res) => res.json());

// Fetcher for business details (returns one business object)
const fetchBusiness = (url: string): Promise<BusinessInfo> =>
  fetch(url).then((res) => res.json());

export default function BusinessProjectsPage() {
  // Extract businessId from the route parameters
  const { businessId } = useParams();

  // Fetch the business details
  const { data: business, error: businessError } = useSWR<BusinessInfo>(
    businessId ? `/api/business/${businessId}` : null,
    fetchBusiness
  );

  // Fetch the projects for the given business
  const { data: projects, error: projectsError } = useSWR<Project[]>(
    businessId ? `/api/business/${businessId}/projects` : null,
    fetchProjects
  );

  if ((!business && !businessError) || (!projects && !projectsError))
    return <p className="p-8">Loading...</p>;
  if (businessError)
    return (
      <p className="p-8">
        Error loading business: {businessError.message || "Unknown error"}
      </p>
    );
  if (projectsError)
    return (
      <p className="p-8">
        Error loading projects: {projectsError.message || "Unknown error"}
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">
        Projects for Business: {business ? business.name : businessId}
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
