'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { fetchStudentData } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Form schema for validation (C7: Data Validation)
const formSchema = z.object({
  courseCode: z.string().min(1, 'Course code is required'),
  courseName: z.string().min(1, 'Course name is required'),
  interests: z.string().optional(),
});

export default function CoursesPage() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form setup with react-hook-form and zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseCode: '',
      courseName: '',
      interests: '',
    },
  });

  // Fetch student data (F1: Courses Taken, F2: Recommended Courses)
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchStudentData('student123'); // Using placeholder student ID
        setStudentData(data);
      } catch (err) {
        setError('Failed to load courses. Please try again.');
        console.error('Error fetching student data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle form submission (C1: Course Form, C10: Course Planner)
  const onSubmit = async (values) => {
    setError('');
    setSavedSuccess(false);
    try {
      // Submit course to backend (C8)
      await fetchStudentData('student123', {
        method: 'POST',
        endpoint: '/add-course', // Adjust based on actual API
        data: values,
      });

      // Refresh student data
      const data = await fetchStudentData('student123');
      setStudentData(data);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      form.reset();
    } catch (err) {
      setError(err.message || 'Failed to add course');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Error or no data state
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

      {/* Error and Success Alerts */}
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

      {/* Courses Taken Section (F1) */}
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

      {/* Recommended Courses Section (F2, C5) */}
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

      {/* Add Course Form (C1, C10) */}
      <Card>
        <CardHeader>
          <CardTitle>Add a Course</CardTitle>
          <CardDescription>Add a course to your academic plan</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="courseCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Code</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., CSC101" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="courseName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Introduction to Programming"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic Interests (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., AI, Big Data" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                    Adding...
                  </span>
                ) : (
                  'Add Course'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

