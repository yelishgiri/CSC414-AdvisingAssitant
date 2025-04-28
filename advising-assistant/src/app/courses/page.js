"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { fetchStudentData } from "@/lib/api";

export default function CoursesPage() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [courseForm, setCourseForm] = useState({
    courseCode: "",
    courseName: "",
    interests: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCourseForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchStudentData("student123");
        setStudentData(data);
      } catch {
        setError("Failed to load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSavedSuccess(false);

    if (!courseForm.courseCode.trim() || !courseForm.courseName.trim()) {
      setError("Course Code and Course Name are required.");
      return;
    }

    try {
      const newCourse = {
        id: Date.now().toString(),
        code: courseForm.courseCode,
        name: courseForm.courseName,
        credits: 3,
        semester: "Planned",
        grade: "N/A",
      };

      setStudentData((prev) => ({
        ...prev,
        completedCourses: [...prev.completedCourses, newCourse],
      }));

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);

      setCourseForm({
        courseCode: "",
        courseName: "",
        interests: "",
      });
    } catch {
      setError("Failed to add course.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center">{error}</p>
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

  const { completedCourses, recommendedCourses } = studentData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Button asChild>
          <Link href="/plan/semester">Plan Next Semester</Link>
        </Button>
      </div>

      {error && (
        <Alert className="mb-6 bg-red-50 border-red-200">
          <AlertTitle className="text-red-800">Error</AlertTitle>
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}
      {savedSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">
            Course added successfully.
          </AlertDescription>
        </Alert>
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Courses Taken</CardTitle>
          <CardDescription>Your academic history</CardDescription>
        </CardHeader>
        <CardContent>
          {completedCourses.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No courses taken yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.semester}</TableCell>
                    <TableCell>{course.grade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recommended Courses</CardTitle>
          <CardDescription>Suggested for your next semester</CardDescription>
        </CardHeader>
        <CardContent>
          {recommendedCourses.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No recommendations available.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-start p-4 border rounded-lg"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium">
                      {course.code}: {course.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {course.credits} credits • {course.availability}
                    </p>
                    {course.prerequisites && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Prerequisites: {course.prerequisites}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add a Course</CardTitle>
          <CardDescription>Add a course to your academic plan</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="courseCode"
                  className="block text-sm font-medium"
                >
                  Course Code
                </label>
                <Input
                  id="courseCode"
                  name="courseCode"
                  value={courseForm.courseCode}
                  onChange={handleFormChange}
                  placeholder="e.g., CSC101"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="courseName"
                  className="block text-sm font-medium"
                >
                  Course Name
                </label>
                <Input
                  id="courseName"
                  name="courseName"
                  value={courseForm.courseName}
                  onChange={handleFormChange}
                  placeholder="e.g., Introduction to Programming"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="interests" className="block text-sm font-medium">
                Academic Interests (Optional)
              </label>
              <Input
                id="interests"
                name="interests"
                value={courseForm.interests}
                onChange={handleFormChange}
                placeholder="e.g., AI, Big Data"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Adding..." : "Add Course"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
