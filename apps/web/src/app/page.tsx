import { Suspense } from "react";

import { getQuestions } from "~/server/queries/getQuestions";
import { QuestionPage } from "./_components/QuestionPage";
import { QuestionSection } from "./_components/QuestionSection";

export const runtime = "edge";

export default async function HomePage() {
  return QuestionPage("kumite");

  const questions = await getQuestions("kumite");

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Karate <span className="text-primary">T3</span> Question Test
        </h1>
        <div className="w-full max-w-2xl overflow-y-scroll">
          <Suspense
            fallback={<div className="flex w-full flex-col gap-4"></div>}
          >
            {/* {JSON.stringify(questions)} */}
            <QuestionSection questions={questions} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
