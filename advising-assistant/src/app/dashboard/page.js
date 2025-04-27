"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, Clock, GraduationCap } from "lucide-react"
import Link from "next/link"
import { fetchStudentData } from "@/lib/api"

export default function Dashboard() {
  const [studentData, setStudentData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStudentData("student123")
        setStudentData(data)
      } catch (error) {
        console.error("Failed to load student data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!studentData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center">Failed to load student data. Please try again later.</p>
            <Button className="mt-4 mx-auto block" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const {
    name,
    curriculum,
    completedCredits,
    totalCredits,
    currentSemester,
    projectedGraduation,
    recommendedCourses,
    interests,
  } = studentData

  const progressPercentage = Math.round((completedCredits / totalCredits) * 100)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {name}</h1>
          <p className="text-muted-foreground">
            {curriculum} • {currentSemester}
          </p>
        </div>
        <Button asChild className="mt-4 md:mt-0">
          <Link href="/plan/semester">Plan Next Semester</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Degree Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                {completedCredits} of {totalCredits} credits
              </span>
              <span className="text-sm font-medium">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Projected Graduation</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-primary" />
            <span>{projectedGraduation}</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Next Semester Registration</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            <span>Opens in 14 days</span>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recommended" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="recommended">Recommended Courses</TabsTrigger>
          <TabsTrigger value="interests">Based on Interests</TabsTrigger>
        </TabsList>
        <TabsContent value="recommended">
          <Card>
            <CardHeader>
              <CardTitle>Recommended for Next Semester</CardTitle>
              <CardDescription>Based on your curriculum and completed courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedCourses.map((course) => (
                  <div key={course.id} className="flex items-start p-4 border rounded-lg">
                    <div className="mr-4 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {course.code}: {course.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {course.credits} credits • {course.availability}
                      </p>
                      {course.prerequisites && (
                        <p className="text-xs text-muted-foreground mt-1">Prerequisites: {course.prerequisites}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-6 w-full" asChild>
                <Link href="/plan/semester">View All Recommendations</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="interests">
          <Card>
            <CardHeader>
              <CardTitle>Courses Based on Your Interests</CardTitle>
              <CardDescription>Electives that match your interests: {interests.join(", ")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentData.interestBasedCourses.map((course) => (
                  <div key={course.id} className="flex items-start p-4 border rounded-lg">
                    <div className="mr-4 mt-1">
                      <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {course.code}: {course.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {course.credits} credits • {course.availability}
                      </p>
                      <p className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mt-1 inline-block">
                        {course.interestArea}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-6 w-full" variant="outline" asChild>
                <Link href="/interests">Update Your Interests</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Your Degree Plan</CardTitle>
          <CardDescription>Track your progress through your curriculum</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Completed Courses: {studentData.completedCourses.length}</h3>
              <p className="text-sm text-muted-foreground">Remaining Required: {studentData.remainingRequired}</p>
            </div>
            <Button asChild>
              <Link href="/plan">View Full Degree Plan</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
