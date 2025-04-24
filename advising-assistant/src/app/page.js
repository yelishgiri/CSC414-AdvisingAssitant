import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar,BookOpen, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div>
       <main className="flex-grow container mx-auto px-4 py-8">
        <section className="py-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Plan Your Academic Journey</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Stay on track to graduate with personalized course recommendations based on your curriculum and interests.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Semester Planning</h3>
              <p className="text-muted-foreground">
                Plan your upcoming semester with course recommendations based on your curriculum and prerequisites.
              </p>
            </div>
            <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Elective Suggestions</h3>
              <p className="text-muted-foreground">
                Get personalized elective recommendations based on your interests and career goals.
              </p>
            </div>
            <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Graduation Projection</h3>
              <p className="text-muted-foreground">
                Visualize your path to graduation with projected completion dates based on your progress.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-6 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© Group 3  CSC 414 Advising Assistant Team. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
