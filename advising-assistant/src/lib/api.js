// This is where the useFetch() function if connected to the backend
// As our team is only responsible for designing the front end client I am leaving a placeholder for now for simulating API call
// With A Mock API Worker Functions

export async function fetchStudentData(studentId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: studentId,
          name: "Yelish Giri",
          curriculum: "Computer Science",
          completedCredits: 78,
          totalCredits: 120,
          currentSemester: "Spring 2025",
          nextSemester: "Fall 2025",
          projectedGraduation: "Spring 2027",
          remainingRequired: 14,
          remainingRequiredCourses: ["CS301", "CS401", "CS450", "MAT301"],
          completedCourses: [
            {
              id: "1",
              code: "CS101",
              name: "Introduction to Programming",
              credits: 3,
              semester: "Fall 2021",
              grade: "A",
            },
            { id: "2", code: "CS201", name: "Data Structures", credits: 3, semester: "Spring 2022", grade: "B+" },
            { id: "3", code: "MAT101", name: "Calculus I", credits: 4, semester: "Fall 2021", grade: "A-" },
            { id: "4", code: "MAT201", name: "Calculus II", credits: 4, semester: "Spring 2022", grade: "B" },
            { id: "5", code: "ENG101", name: "English Composition", credits: 3, semester: "Fall 2021", grade: "A" },
            { id: "6", code: "CS250", name: "Computer Architecture", credits: 3, semester: "Fall 2022", grade: "B+" },
            { id: "7", code: "CS280", name: "Web Development", credits: 3, semester: "Spring 2023" },
            { id: "8", code: "CS290", name: "Database Systems", credits: 3, semester: "Spring 2023" },
          ],
          recommendedCourses: [
            {
              id: "101",
              code: "CS301",
              name: "Algorithms",
              credits: 3,
              type: "required",
              prerequisites: "CS201",
              availability: "Fall 2023",
            },
            {
              id: "102",
              code: "CS401",
              name: "Operating Systems",
              credits: 3,
              type: "required",
              prerequisites: "CS250",
              availability: "Fall 2023",
            },
            {
              id: "103",
              code: "MAT301",
              name: "Discrete Mathematics",
              credits: 3,
              type: "required",
              availability: "Fall 2023",
            },
            {
              id: "104",
              code: "CS350",
              name: "Software Engineering",
              credits: 3,
              type: "elective",
              prerequisites: "CS201",
              availability: "Fall 2023",
            },
          ],
          interests: ["Artificial Intelligence", "Cybersecurity"],
          interestBasedCourses: [
            {
              id: "201",
              code: "CS420",
              name: "Artificial Intelligence",
              credits: 3,
              type: "elective",
              prerequisites: "CS301",
              availability: "Fall 2023",
              interestArea: "Artificial Intelligence",
            },
            {
              id: "202",
              code: "CS425",
              name: "Machine Learning",
              credits: 3,
              type: "elective",
              prerequisites: "CS301, MAT301",
              availability: "Spring 2024",
              interestArea: "Artificial Intelligence",
            },
            {
              id: "203",
              code: "CS430",
              name: "Cybersecurity Fundamentals",
              credits: 3,
              type: "elective",
              availability: "Fall 2023",
              interestArea: "Cybersecurity",
            },
            {
              id: "204",
              code: "CS435",
              name: "Network Security",
              credits: 3,
              type: "elective",
              prerequisites: "CS430",
              availability: "Spring 2024",
              interestArea: "Cybersecurity",
            },
            {
              id: "205",
              code: "CS440",
              name: "Big Data Analytics",
              credits: 3,
              type: "elective",
              prerequisites: "CS290",
              availability: "Fall 2023",
              interestArea: "Big Data",
            },
          ],
        })
      }, 1000)
    })
  }
  
