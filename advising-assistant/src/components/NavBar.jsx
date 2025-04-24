"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold flex gap-2 items-center">
            <GraduationCap />
            Advising Assistant
          </Link>
          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/courses" className="text-gray-600 hover:text-gray-900">
              Courses
            </Link>
            <Link href="/plan" className="text-gray-600 hover:text-gray-900">
              Plan
            </Link>
            <div className="flex gap-4">
            <Link href="/login">
              <Button size="sm"
              >Login</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Register</Button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
