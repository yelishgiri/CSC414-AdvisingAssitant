# 🎓 Advising Assistant – Group 3 (Front-End Team)

An intelligent academic planning tool that helps students stay on track for graduation by streamlining course scheduling, elective selection, and curriculum tracking.

---

## Steps to Run the Project
### Prerequisites

Make sure the following are installed:
- Node.js (v18+ recommended)
- npm
- Git

Installation Steps

1. Clone the Repository
```bash

git clone git@github.com:yelishgiri/CSC414-AdvisingAssitant.git

cd CSC414-AdvisingAssitant

cd advising-assistant
```

2. Install Dependencies
```bash
npm install
```


4. Run the Development Server
   
```bash
npm run dev
```

Open your browser and go to `http://localhost:3000` to view the app.


---

## UI Flow: How to Use the App

1. **Landing Page** → Navigate to _Get Started_ or _About the Project_
2. **Register** as a new student → redirected to the login page
3. **Login** → Access the main dashboard
4. Dashboard shows:
   - Current progress
   - Timeline for registration
   - Graduation projection
5. Navigate to:
   - 📌 **Courses** (view completed, remaining, plan next semester)
   - ✅ **Plan Next Semester**
   - ⭐ **Edit Interests** page


---


## 📌 Features

- ✅ Semester schedule planner with prerequisite/corequisite handling
- ✅ Degree progress tracker that compares completed and required courses
- ✅ Personalized elective recommendations based on student interests
- ✅ Filters courses by offerings for the upcoming semester
- ✅ Projected graduation timeline based on course load and progress

---



## 👨‍💻 Team Members – Group 3

| Name                  | Role                    |
|-----------------------|-------------------------|
| Oluwajomiloju Adejumo | UI/ UX Design           |
| Keishon Boose         | Project Manager         |
| Rabindra Giri         | Development             |
| Evans Smith           | Development             |


---

```bash
/components → Reusable UI Components /lib/api.js → Mock API handlers /pages → Application routes
/pages/dashboard → Dashboard screen /pages/courses → Course viewer /pages/plan → Semester planner
/pages/interests → Interest update UI
```

