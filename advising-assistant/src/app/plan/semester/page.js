"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, AlertCircle, CheckCircle2 } from "lucide-react"
import { fetchAvailableCourses, fetchStudentData, saveSemesterPlan } from "@/lib/api"

export default function SemesterPlanningPage() {
  const [studentData, setStudentData] = useState(null)
  const [availableCourses, setAvailableCourses] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [student, courses] = await Promise.all([
          fetchStudentData("student123"),
          fetchAvailableCourses("Fall 2023"),
        ])
        setStudentData(student)
        setAvailableCourses(courses)
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleCourseToggle = (courseId) => {
    setSelectedCourses((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]))
  }

  const handleSavePlan = async () => {
    if (!studentData) return

    setSaving(true)
    try {
      await saveSemesterPlan("student123", selectedCourses)
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
    } catch (error) {
      console.error("Failed to save semester plan:", error)
    } finally {
      setSaving(false)
    }
  }

  const getTotalCredits = () => {
    return availableCourses
      .filter((course) => selectedCourses.includes(course.id))
      .reduce((sum, course) => sum + course.credits, 0)
  }

  const isPrerequisiteMet = (course) => {
    if (!course.prerequisites || !studentData) return true

    const prereqCourses = course.prerequisites.split(", ")
    return prereqCourses.every((prereq) => studentData.completedCourses.some((completed) => completed.code === prereq))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!studentData || !availableCourses.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center">Failed to load data. Please try again later.</p>
            <Button className="mt-4 mx-auto block" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const requiredCourses = availableCourses.filter((course) =>
    studentData.remainingRequiredCourses.includes(course.code),
  )

  const electiveCourses = availableCourses.filter(
    (course) => course.type === "elective" && !studentData.remainingRequiredCourses.includes(course.code),
  )

  const interestBasedCourses = availableCourses.filter(
    (course) =>
      course.interestArea &&
      studentData.interests.includes(course.interestArea) &&
      !studentData.remainingRequiredCourses.includes(course.code),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Plan Your Next Semester</h1>
          <p className="text-muted-foreground">Select courses for {studentData.nextSemester}</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-2 items-center">
          <Badge variant="outline" className="text-sm">
            Selected Credits: {getTotalCredits()} / 18 max
          </Badge>
          <Button onClick={handleSavePlan} disabled={selectedCourses.length === 0 || saving}>
            {saving ? "Saving..." : "Save Plan"}
          </Button>
        </div>
      </div>

      {savedSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">
            Your semester plan has been saved successfully.
          </AlertDescription>
        </Alert>
      )}

      <Alert className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Planning Tips</AlertTitle>
        <AlertDescription>
          We recommend taking 12-18 credits per semester to stay on track. Courses with prerequisites you haven't
          completed will be marked.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="required" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="required">Required Courses</TabsTrigger>
          <TabsTrigger value="electives">Electives</TabsTrigger>
          <TabsTrigger value="interests">Based on Interests</TabsTrigger>
        </TabsList>

        <TabsContent value="required">
          <Card>
            <CardHeader>
              <CardTitle>Required Courses</CardTitle>
              <CardDescription>These courses are required for your {studentData.curriculum} curriculum</CardDescription>
            </CardHeader>
            <CardContent>
              {requiredCourses.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">
                  No required courses available for the upcoming semester.
                </p>
              ) : (
                <div className="space-y-4">
                  {requiredCourses.map((course) => {
                    const prereqMet = isPrerequisiteMet(course)

                    return (
                      <div key={course.id} className="flex items-start p-4 border rounded-lg">
                        <Checkbox
                          id={`course-${course.id}`}
                          checked={selectedCourses.includes(course.id)}
                          onCheckedChange={() => handleCourseToggle(course.id)}
                          disabled={!prereqMet}
                          className="mr-4 mt-1"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={`course-${course.id}`}
                            className={`font-medium ${!prereqMet ? "text-muted-foreground" : ""}`}
                          >
                            {course.code}: {course.name}
                          </label>
                          <p className="text-sm text-muted-foreground">
                            {course.credits} credits • {course.availability}
                          </p>
                          {course.prerequisites && (
                            <p className="text-xs text-muted-foreground mt-1">Prerequisites: {course.prerequisites}</p>
                          )}
                          {!prereqMet && (
                            <div className="mt-2 flex items-center">
                              <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                              <span className="text-xs text-amber-600">Prerequisites not met</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="electives">
          <Card>
            <CardHeader>
              <CardTitle>Available Electives</CardTitle>
              <CardDescription>Choose from these electives to fulfill your degree requirements</CardDescription>
            </CardHeader>
            <CardContent>
              {electiveCourses.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">
                  No elective courses available for the upcoming semester.
                </p>
              ) : (
                <div className="space-y-4">
                  {electiveCourses.map((course) => {
                    const prereqMet = isPrerequisiteMet(course)

                    return (
                      <div key={course.id} className="flex items-start p-4 border rounded-lg">
                        <Checkbox
                          id={`course-${course.id}`}
                          checked={selectedCourses.includes(course.id)}
                          onCheckedChange={() => handleCourseToggle(course.id)}
                          disabled={!prereqMet}
                          className="mr-4 mt-1"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={`course-${course.id}`}
                            className={`font-medium ${!prereqMet ? "text-muted-foreground" : ""}`}
                          >
                            {course.code}: {course.name}
                          </label>
                          <p className="text-sm text-muted-foreground">
                            {course.credits} credits • {course.availability}
                          </p>
                          {course.prerequisites && (
                            <p className="text-xs text-muted-foreground mt-1">Prerequisites: {course.prerequisites}</p>
                          )}
                          {!prereqMet && (
                            <div className="mt-2 flex items-center">
                              <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                              <span className="text-xs text-amber-600">Prerequisites not met</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interests">
          <Card>
            <CardHeader>
              <CardTitle>Courses Based on Your Interests</CardTitle>
              <CardDescription>Courses that match your interests: {studentData.interests.join(", ")}</CardDescription>
            </CardHeader>
            <CardContent>
              {interestBasedCourses.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">
                  No courses matching your interests are available for the upcoming semester.
                </p>
              ) : (
                <div className="space-y-4">
                  {interestBasedCourses.map((course) => {
                    const prereqMet = isPrerequisiteMet(course)

                    return (
                      <div key={course.id} className="flex items-start p-4 border rounded-lg">
                        <Checkbox
                          id={`course-${course.id}`}
                          checked={selectedCourses.includes(course.id)}
                          onCheckedChange={() => handleCourseToggle(course.id)}
                          disabled={!prereqMet}
                          className="mr-4 mt-1"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={`course-${course.id}`}
                            className={`font-medium ${!prereqMet ? "text-muted-foreground" : ""}`}
                          >
                            {course.code}: {course.name}
                          </label>
                          <p className="text-sm text-muted-foreground">
                            {course.credits} credits • {course.availability}
                          </p>
                          <Badge className="mt-1 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                            {course.interestArea}
                          </Badge>
                          {course.prerequisites && (
                            <p className="text-xs text-muted-foreground mt-1">Prerequisites: {course.prerequisites}</p>
                          )}
                          {!prereqMet && (
                            <div className="mt-2 flex items-center">
                              <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                              <span className="text-xs text-amber-600">Prerequisites not met</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Selected Courses</CardTitle>
          <CardDescription>Your planned courses for {studentData.nextSemester}</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedCourses.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">
              No courses selected yet. Choose courses from the tabs above.
            </p>
          ) : (
            <>
              <div className="space-y-2 mb-4">
                {selectedCourses.map((courseId) => {
                  const course = availableCourses.find((c) => c.id === courseId)
                  if (!course) return null

                  return (
                    <div key={course.id} className="flex justify-between items-center p-3 bg-muted rounded-md">
                      <div>
                        <p className="font-medium">
                          {course.code}: {course.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{course.credits} credits</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleCourseToggle(course.id)}>
                        Remove
                      </Button>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <p className="font-medium">Total Credits: {getTotalCredits()}</p>
                  <p className="text-sm text-muted-foreground">
                    {getTotalCredits() < 12
                      ? "Below full-time status (12 credits minimum recommended)"
                      : getTotalCredits() > 18
                        ? "Exceeds maximum recommended load (18 credits)"
                        : "Within recommended credit range"}
                  </p>
                </div>
                <Button onClick={handleSavePlan} disabled={selectedCourses.length === 0 || saving}>
                  {saving ? "Saving..." : "Save Plan"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
