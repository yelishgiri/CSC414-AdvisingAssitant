"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            Advising Assistant
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/courses" className="text-gray-600 hover:text-gray-900">
              Courses
            </Link>
            <Link href="/plan" className="text-gray-600 hover:text-gray-900">
              Plan Semester
            </Link>
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Register</Button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}
