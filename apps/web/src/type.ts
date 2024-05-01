import { getQuestions } from "./server/queries/getQuestions";

export type Question = Awaited<ReturnType<typeof getQuestions>>[number];
