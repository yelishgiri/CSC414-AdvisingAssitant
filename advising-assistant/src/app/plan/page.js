"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { fetchStudentData, fetchCurriculum } from "@/lib/api";

export default function DegreePlanPage() {
  const [studentData, setStudentData] = useState(null);
  const [curriculum, setCurriculum] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const student = await fetchStudentData("student123");
        setStudentData(student);

        const curriculumData = await fetchCurriculum(student.curriculum);
        setCurriculum(curriculumData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!studentData || !curriculum.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center">
              Failed to load degree plan data. Please try again later.
            </p>
            <Button
              className="mt-4 mx-auto block"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const {
    name,
    completedCredits,
    totalCredits,
    projectedGraduation,
    completedCourses,
  } = studentData;

  const progressPercentage = Math.round(
    (completedCredits / totalCredits) * 100
  );

  const isCourseCompleted = (courseCode) => {
    return completedCourses.some((course) => course.code === courseCode);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Degree Plan</h1>
          <p className="text-muted-foreground">
            {studentData.curriculum} • Projected Graduation:{" "}
            {projectedGraduation}
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
            <CardTitle className="text-lg">Completed Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              <span>{completedCourses.length} courses completed</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Remaining Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-amber-500" />
              <span>{studentData.remainingRequired} courses remaining</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Requirements</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="remaining">Remaining</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-8">
            {curriculum.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">
                        {
                          category.courses.filter((course) =>
                            isCourseCompleted(course.code)
                          ).length
                        }{" "}
                        of {category.courses.length} courses
                      </span>
                      <span className="text-sm font-medium">
                        {Math.round(
                          (category.courses.filter((course) =>
                            isCourseCompleted(course.code)
                          ).length /
                            category.courses.length) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={Math.round(
                        (category.courses.filter((course) =>
                          isCourseCompleted(course.code)
                        ).length /
                          category.courses.length) *
                          100
                      )}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-3">
                    {category.courses.map((course) => {
                      const completed = isCourseCompleted(course.code);

                      return (
                        <div
                          key={course.code}
                          className={`p-3 rounded-lg border ${
                            completed
                              ? "bg-green-50 border-green-100"
                              : "bg-white"
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="mr-3 mt-1">
                              {completed ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <Clock className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {course.code}: {course.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {course.credits} credits
                              </p>

                              {course.prerequisites && !completed && (
                                <div className="mt-1 flex items-center">
                                  {course.prerequisites
                                    .split(", ")
                                    .some(
                                      (prereq) => !isCourseCompleted(prereq)
                                    ) ? (
                                    <>
                                      <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                                      <span className="text-xs text-amber-600">
                                        Prerequisites not met:{" "}
                                        {course.prerequisites}
                                      </span>
                                    </>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-green-50 text-green-700 border-green-200"
                                    >
                                      Prerequisites met
                                    </Badge>
                                  )}
                                </div>
                              )}

                              {completed && (
                                <Badge
                                  variant="outline"
                                  className="mt-1 text-xs bg-green-50 text-green-700 border-green-200"
                                >
                                  Completed{" "}
                                  {completedCourses.find(
                                    (c) => c.code === course.code
                                  )?.semester || ""}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Courses</CardTitle>
              <CardDescription>
                Courses you have successfully completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedCourses.length === 0 ? (
                  <p className="text-center py-4 text-muted-foreground">
                    No courses completed yet.
                  </p>
                ) : (
                  completedCourses.map((course) => (
                    <div
                      key={course.code}
                      className="p-3 rounded-lg border bg-green-50 border-green-100"
                    >
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                        <div>
                          <h3 className="font-medium">
                            {course.code}: {course.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {course.credits} credits
                          </p>
                          <Badge
                            variant="outline"
                            className="mt-1 text-xs bg-green-50 text-green-700 border-green-200"
                          >
                            Completed {course.semester}
                          </Badge>
                          {course.grade && (
                            <Badge
                              variant="outline"
                              className="mt-1 ml-2 text-xs"
                            >
                              Grade: {course.grade}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="remaining">
          <Card>
            <CardHeader>
              <CardTitle>Remaining Requirements</CardTitle>
              <CardDescription>
                Courses you still need to complete
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {curriculum.flatMap((category) =>
                  category.courses.filter(
                    (course) => !isCourseCompleted(course.code)
                  )
                ).length === 0 ? (
                  <p className="text-center py-4 text-muted-foreground">
                    All requirements completed! Congratulations!
                  </p>
                ) : (
                  curriculum.flatMap((category) =>
                    category.courses
                      .filter((course) => !isCourseCompleted(course.code))
                      .map((course) => (
                        <div
                          key={course.code}
                          className="p-3 rounded-lg border"
                        >
                          <div className="flex items-start">
                            <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-1" />
                            <div>
                              <h3 className="font-medium">
                                {course.code}: {course.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {course.credits} credits
                              </p>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {category.name}
                              </Badge>

                              {course.prerequisites && (
                                <div className="mt-1 flex items-center">
                                  {course.prerequisites
                                    .split(", ")
                                    .some(
                                      (prereq) => !isCourseCompleted(prereq)
                                    ) ? (
                                    <>
                                      <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                                      <span className="text-xs text-amber-600">
                                        Prerequisites not met:{" "}
                                        {course.prerequisites}
                                      </span>
                                    </>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-green-50 text-green-700 border-green-200"
                                    >
                                      Prerequisites met
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
