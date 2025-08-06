'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Water Tracker</h1>
            <nav className="flex space-x-4">
              <Link
                href="/log"
                className={`font-medium px-3 py-2 rounded-md transition duration-200 ${
                  pathname === '/log'
                    ? 'text-gray-900 underline'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Log Intake
              </Link>
              <Link
                href="/summary"
                className={`font-medium px-3 py-2 rounded-md transition duration-200 ${
                  pathname === '/summary'
                    ? 'text-gray-900 underline'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Summary
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Water Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
