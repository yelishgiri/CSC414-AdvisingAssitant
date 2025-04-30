import { GraduationCap } from "lucide-react";

export default function About() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <section className="py-12 text-center">
        <h2 className="text-4xl font-bold mb-4">About Advising Assistant</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          This project was developed as part of the CSC 414 Introduction to
          Software Engineering course at The University of Southern Mississippi.
          The goal is to provide students with an intuitive platform for
          planning their academic journey, aligning with the Advising Assistant
          proposal.
        </p>
        <div className="mb-8">
          <GraduationCap className="h-10 w-10 mx-auto text-primary mb-4" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">Project Team</h3>
        <ul className="text-lg text-muted-foreground space-y-2">
          <li>Evans Smith</li>
          <li>Keishon Boose</li>
          <li>Rabindra Giri</li>
          <li>Oluwajomiloju Adejumo</li>
        </ul>
      </section>
    </main>
  );
}
