"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const params = useParams();

  // Retrieve businessId from the URL parameters (if available)
  const businessId = params.businessId;

  // Build the "Create Project" URL based on whether businessId exists
  const createProjectHref = businessId
    ? `/business/${businessId}/project/create`
    : "/project/create";

  const navItems = [
    { label: "Dashboard Home", href: "/dashboard" },
    { label: "Register Business", href: "/business/register" },
    { label: "Create Project", href: createProjectHref },
    { label: "Trade Calculator", href: "/trade-calc" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Dashboard Menu</h2>
      </div>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <span
              className={`block px-4 py-2 rounded transition-colors hover:bg-gray-700 ${
                pathname === item.href ? "bg-gray-700" : ""
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
