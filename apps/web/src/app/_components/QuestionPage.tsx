import { Suspense } from "react";
import Link from "next/link";

import { Button } from "@csanwel/ui/button";

import { getQuestions } from "~/server/queries/getQuestions";
import { QuestionSection } from "./QuestionSection";

export async function QuestionPage(questionType: "kumite" | "kata") {
  const questions = await getQuestions(questionType);

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Karate <span className="text-primary">{questionType}</span> Question
          Test
        </h1>

        {questionType === "kata" && (
          <Link href="/">
            <Button variant="outline">Kumite Questions</Button>
          </Link>
        )}
        {questionType === "kumite" && (
          <Link href="/kata">
            <Button variant="outline">Kata Questions</Button>
          </Link>
        )}

        <div className="w-full max-w-2xl overflow-y-scroll">
          <Suspense
            fallback={<div className="flex w-full flex-col gap-4"></div>}
          >
            <QuestionSection questions={questions} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
