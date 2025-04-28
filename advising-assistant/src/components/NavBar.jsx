"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const authPages = ["/", "/login", "/register", "/about"];

  const isAuthPage = authPages.includes(pathname);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold flex gap-2 items-center">
            <GraduationCap />
            Advising Assistant
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {isAuthPage ? (
              <div className="flex gap-4">
                <Link href="/login">
                  <Button size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Register</Button>
                </Link>
                <Link href="/about">
                  <Button size="sm">About</Button>
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  href="/courses"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Courses
                </Link>
                <Link
                  href="/plan"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Plan
                </Link>
                <div className="flex gap-4">
                    <Button size="sm" onClick={() => router.replace('/login')}>Logout</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
