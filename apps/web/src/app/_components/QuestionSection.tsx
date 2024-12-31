"use client";

import { useState } from "react";

import { cn } from "@csanwel/ui";
import { Alert, AlertDescription } from "@csanwel/ui/alert";
import { Button } from "@csanwel/ui/button";
import { toast } from "@csanwel/ui/toast";

import type { Question } from "~/type";
import { DEFAULT_TRACK_PROPERTIES, track } from "~/services/amplitude";

interface Props {
  questions: Question[];
}

interface State {
  correct: number;
  incorrect: number;
  currentNo: number;
  answered: {
    no: number;
    answer: boolean;
    isCorrect: boolean;
  }[];
}

function getRandomInteger(max: number) {
  return Math.floor(Math.random() * max);
}

export function QuestionSection({ questions }: Props) {
  const [state, setState] = useState<State>({
    correct: 0,
    incorrect: 0,
    currentNo: getRandomInteger(questions.length),
    answered: [],
  });

  const currentQuestion = questions[state.currentNo];
  const { Q, A } = currentQuestion ?? {};

  function answer(ans: boolean) {
    if (ans && A === "True") {
      toast.success("Correct");
      setState((s) => ({
        correct: s.correct + 1,
        incorrect: s.incorrect,
        currentNo: getRandomInteger(questions.length),
        answered: [
          ...s.answered,
          { no: s.currentNo + 1, answer: ans, isCorrect: true },
        ],
      }));

      track("answer", {
        ...DEFAULT_TRACK_PROPERTIES,
        no: String(state.currentNo),
        answer: ans,
        isCorrect: true,
      });
    } else if (!ans && A === "False") {
      toast.success("Correct");
      setState((s) => ({
        correct: s.correct + 1,
        incorrect: s.incorrect,
        currentNo: getRandomInteger(questions.length),
        answered: [
          ...s.answered,
          { no: s.currentNo + 1, answer: ans, isCorrect: true },
        ],
      }));

      track("answer", {
        ...DEFAULT_TRACK_PROPERTIES,
        no: String(state.currentNo),
        answer: ans,
        isCorrect: true,
      });
    } else {
      toast.error("Incorrect");
      setState((s) => ({
        correct: s.correct,
        incorrect: s.incorrect + 1,
        currentNo: getRandomInteger(questions.length),
        answered: [
          ...s.answered,
          { no: s.currentNo + 1, answer: ans, isCorrect: false },
        ],
      }));

      track("answer", {
        ...DEFAULT_TRACK_PROPERTIES,
        no: String(state.currentNo),
        answer: ans,
        isCorrect: false,
      });
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <Alert className="h-48">
        <AlertDescription>{Q}</AlertDescription>
      </Alert>

      <div className="space-x-2">
        <Button onClick={() => answer(true)}>True</Button>
        <Button onClick={() => answer(false)}>False</Button>
      </div>

      <div>Correct: {state.correct}</div>
      <div>Incorrect: {state.incorrect}</div>

      <div className="flex flex-wrap space-x-2">
        <span>Answered Questions:</span>
        {state.answered.map((answer, i) => {
          return (
            <span
              key={i}
              className={cn(
                "text-red-700",
                answer.isCorrect && "text-green-700",
              )}
            >
              {answer.no}
            </span>
          );
        })}
      </div>
    </div>
  );
}
