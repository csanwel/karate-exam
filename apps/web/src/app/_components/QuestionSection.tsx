"use client";

import { useState } from "react";
import { Button } from "@csanwel/ui/button";

import type { Question } from "~/type";

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
  }[];
}

function getRandom(max: number) {
  return Math.floor(Math.random() * max);
}

export function QuestionSection({ questions }: Props) {
  const [state, setState] = useState<State>({
    correct: 0,
    incorrect: 0,
    currentNo: getRandom(questions.length),
    answered: [],
  });

  const currentQuestion = questions[0];
  const { Q, A } = currentQuestion ?? {};

  function answer(ans: boolean) {
    if (ans && A === "True") {
      setState((s) => ({
        correct: s.correct + 1,
        incorrect: s.incorrect,
        currentNo: getRandom(questions.length),
        answered: [...s.answered, { no: s.currentNo, answer: ans }],
      }));
    } else if (!ans && A === "False") {
      setState((s) => ({
        correct: s.correct + 1,
        incorrect: s.incorrect,
        currentNo: getRandom(questions.length),
        answered: [...s.answered, { no: s.currentNo, answer: ans }],
      }));
    } else {
      setState((s) => ({
        correct: s.correct,
        incorrect: s.incorrect + 1,
        currentNo: getRandom(questions.length),
        answered: [...s.answered, { no: s.currentNo, answer: ans }],
      }));
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <span>{Q}</span>
      <div className="space-x-2">
        <Button onClick={() => answer(true)}>True</Button>
        <Button onClick={() => answer(false)}>False</Button>
      </div>

      <div>Correct: {state.correct}</div>
      <div>Incorrect: {state.incorrect}</div>
    </div>
  );
}
