"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, BookOpen } from "lucide-react";
import {
  fetchStudentData,
  fetchInterestAreas,
  updateStudentInterests,
} from "@/lib/api";

export default function InterestsPage() {
  const [studentData, setStudentData] = useState(null);
  const [interestAreas, setInterestAreas] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const student = await fetchStudentData("student123");
        setStudentData(student);
        setSelectedInterests(student.interests);

        const areas = await fetchInterestAreas();
        setInterestAreas(areas);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleInterestToggle = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSaveInterests = async () => {
    if (!studentData) return;

    setSaving(true);
    try {
      await updateStudentInterests("student123", selectedInterests);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save interests:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!studentData || !interestAreas.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center">
              Failed to load data. Please try again later.
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Academic Interests</h1>
          <p className="text-muted-foreground">
            Select topics you're interested in to get personalized course
            recommendations
          </p>
        </div>
      </div>

      {savedSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">
            Your interests have been updated successfully.
          </AlertDescription>
        </Alert>
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Select Your Interests</CardTitle>
          <CardDescription>
            Choose areas that interest you to help us recommend relevant
            elective courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interestAreas.map((area) => (
              <div
                key={area.id}
                className="flex items-start space-x-3 p-4 border rounded-lg"
              >
                <Checkbox
                  id={`interest-${area.id}`}
                  checked={selectedInterests.includes(area.name)}
                  onCheckedChange={() => handleInterestToggle(area.name)}
                  className="mt-1"
                />
                <div>
                  <label
                    htmlFor={`interest-${area.id}`}
                    className="font-medium cursor-pointer"
                  >
                    {area.name}
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setSelectedInterests(studentData.interests)}
          >
            Reset
          </Button>
          <Button onClick={handleSaveInterests} disabled={saving}>
            {saving ? "Saving..." : "Save Interests"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Courses Based on Your Interests</CardTitle>
          <CardDescription>
            Courses that match your selected interests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedInterests.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">
              Select interests above to see recommended courses.
            </p>
          ) : (
            <div className="space-y-4">
              {selectedInterests.map((interest) => {
                const matchingCourses = studentData.interestBasedCourses.filter(
                  (course) => course.interestArea === interest
                );

                return matchingCourses.length > 0 ? (
                  <div key={interest} className="space-y-3">
                    <h3 className="font-medium flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-primary" />
                      {interest}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-7">
                      {matchingCourses.map((course) => (
                        <div key={course.id} className="p-3 border rounded-lg">
                          <h4 className="font-medium">
                            {course.code}: {course.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {course.credits} credits • {course.availability}
                          </p>
                          <Badge className="mt-1 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                            {course.interestArea}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null;
              })}

              {!studentData.interestBasedCourses.some((course) =>
                selectedInterests.includes(course.interestArea)
              ) && (
                <p className="text-center py-4 text-muted-foreground">
                  No courses matching your selected interests are available for
                  the upcoming semester.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
