"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-800 text-center">
          Welcome to <span className="text-blue-600">TradeFlow</span>
        </h1>
        <p className="text-lg mb-8 text-gray-600 text-center max-w-md">
          Simplify your business management and project calculations with ease.
        </p>
        <div className="flex space-x-4">
          <Link
            href="/auth/login"
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Register
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">
                Business Management
              </h3>
              <p className="text-gray-600">
                Organize your business details, employees, and projects in one
                place.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Project Tracking</h3>
              <p className="text-gray-600">
                Create, track, and manage projects effortlessly.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Trade Calculations</h3>
              <p className="text-gray-600">
                Access integrated tools to compute pricing and cost estimates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            How It Works
          </h2>
          <ol className="space-y-6">
            <li className="flex flex-col md:flex-row items-start">
              <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold">Register Your Account</h3>
                <p className="text-gray-600">
                  Sign up and log in to access your personalized dashboard.
                </p>
              </div>
            </li>
            <li className="flex flex-col md:flex-row items-start">
              <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold">Set Up Your Business</h3>
                <p className="text-gray-600">
                  Create your business profile, add employees, and manage
                  projects.
                </p>
              </div>
            </li>
            <li className="flex flex-col md:flex-row items-start">
              <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold">Optimize Operations</h3>
                <p className="text-gray-600">
                  Use our integrated trade calculations and management tools to
                  boost efficiency.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to streamline your business?
          </h2>
          <p className="text-lg text-white mb-8">
            Join TradeFlow today and start optimizing your business management.
          </p>
          <Link
            href="/auth/register"
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded hover:bg-gray-100 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
