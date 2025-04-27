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
            { id: "3", code: "MAT168", name: "Calculus I", credits: 4, semester: "Fall 2021", grade: "A-" },
            { id: "4", code: "MAT169", name: "Calculus II", credits: 4, semester: "Spring 2022", grade: "B" },
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
              code: "CS414",
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
  
  export async function fetchAvailableCourses(semester) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "101",
            code: "CS301",
            name: "Algorithms",
            credits: 3,
            type: "required",
            prerequisites: "CS201",
            availability: semester,
          },
          {
            id: "102",
            code: "CS401",
            name: "Operating Systems",
            credits: 3,
            type: "required",
            prerequisites: "CS250",
            availability: semester,
          },
          {
            id: "103",
            code: "MAT301",
            name: "Discrete Mathematics",
            credits: 3,
            type: "required",
            availability: semester,
          },
          {
            id: "104",
            code: "CS414",
            name: "Software Engineering",
            credits: 3,
            type: "elective",
            prerequisites: "CS201",
            availability: semester,
          },
          {
            id: "201",
            code: "CS420",
            name: "Artificial Intelligence",
            credits: 3,
            type: "elective",
            prerequisites: "CS301",
            availability: semester,
            interestArea: "Artificial Intelligence",
          },
          {
            id: "203",
            code: "CS430",
            name: "Cybersecurity Fundamentals",
            credits: 3,
            type: "elective",
            availability: semester,
            interestArea: "Cybersecurity",
          },
          {
            id: "205",
            code: "CS440",
            name: "Big Data Analytics",
            credits: 3,
            type: "elective",
            prerequisites: "CS290",
            availability: semester,
            interestArea: "Big Data",
          },
          {
            id: "206",
            code: "CS445",
            name: "Cloud Computing",
            credits: 3,
            type: "elective",
            availability: semester,
            interestArea: "Cloud Computing",
          },
          {
            id: "207",
            code: "CS450",
            name: "Computer Graphics",
            credits: 3,
            type: "required",
            prerequisites: "CS301, MAT301",
            availability: semester,
          },
        ])
      }, 1000)
    })
  }
  
  export async function fetchInterestAreas() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            name: "Artificial Intelligence",
            description: "Machine learning, neural networks, and AI applications",
          },
          { id: "2", name: "Cybersecurity", description: "Network security, cryptography, and ethical hacking" },
          { id: "3", name: "Big Data", description: "Data analytics, data mining, and big data processing" },
          { id: "4", name: "Cloud Computing", description: "Cloud architectures, services, and deployment" },
          { id: "5", name: "Mobile Development", description: "iOS, Android, and cross-platform mobile app development" },
          { id: "6", name: "Game Development", description: "Game engines, 3D graphics, and game design" },
          { id: "7", name: "Web Development", description: "Frontend, backend, and full-stack web development" },
          {
            id: "8",
            name: "Internet of Things",
            description: "Connected devices, embedded systems, and IoT applications",
          },
        ])
      }, 1000)
    })
  }
  
  export async function saveSemesterPlan(studentId, courseIds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Saved semester plan for student ${studentId}:`, courseIds)
        resolve()
      }, 1000)
    })
  }
  
  export async function updateStudentInterests(studentId, interests) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Updated interests for student ${studentId}:`, interests)
        resolve()
      }, 1000)
    })
  }
  
  export async function fetchCurriculum(curriculumName) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            name: "Core Computer Science",
            description: "Fundamental computer science courses required for all CS majors",
            courses: [
              { code: "CS101", name: "Introduction to Programming", credits: 3, required: true },
              { code: "CS201", name: "Data Structures", credits: 3, prerequisites: "CS101", required: true },
              { code: "CS250", name: "Computer Architecture", credits: 3, prerequisites: "CS101", required: true },
              { code: "CS290", name: "Database Systems", credits: 3, prerequisites: "CS201", required: true },
              { code: "CS301", name: "Algorithms", credits: 3, prerequisites: "CS201", required: true },
              { code: "CS401", name: "Operating Systems", credits: 3, prerequisites: "CS250", required: true },
              { code: "CS450", name: "Computer Graphics", credits: 3, prerequisites: "CS301, MAT301", required: true },
            ],
          },
          {
            id: "2",
            name: "Mathematics",
            description: "Mathematics courses required for the CS degree",
            courses: [
              { code: "MAT168", name: "Calculus I", credits: 4, required: true },
              { code: "MAT169", name: "Calculus II", credits: 4, prerequisites: "MAT101", required: true },
              { code: "MAT301", name: "Discrete Mathematics", credits: 3, required: true },
            ],
          },
          {
            id: "3",
            name: "General Education",
            description: "General education requirements",
            courses: [
              { code: "ENG101", name: "English Composition", credits: 3, required: true },
              { code: "THE101", name: "Creative Arts And Music", credits: 3, required: true },
              { code: "HIS101", name: "World History", credits: 3, required: false },
            ],
          },
          {
            id: "4",
            name: "CS Electives",
            description: "Computer Science elective courses (choose at least 4)",
            courses: [
              { code: "CS280", name: "Web Development", credits: 3, required: false },
              { code: "CS414", name: "Software Engineering", credits: 3, prerequisites: "CS201", required: false },
              { code: "CS420", name: "Artificial Intelligence", credits: 3, prerequisites: "CS301", required: false },
              { code: "CS425", name: "Machine Learning", credits: 3, prerequisites: "CS301, MAT301", required: false },
              { code: "CS430", name: "Cybersecurity Fundamentals", credits: 3, required: false },
              { code: "CS435", name: "Network Security", credits: 3, prerequisites: "CS430", required: false },
              { code: "CS440", name: "Big Data Analytics", credits: 3, prerequisites: "CS290", required: false },
              { code: "CS445", name: "Cloud Computing", credits: 3, required: false },
            ],
          },
        ])
      }, 1000)
    })
  }
  