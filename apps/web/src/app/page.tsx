import { QuestionPage } from "./_components/QuestionPage";

export const runtime = "edge";

export default async function HomePage() {
  return QuestionPage("kumite");
}
