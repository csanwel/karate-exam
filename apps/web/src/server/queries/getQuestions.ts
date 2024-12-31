/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use server";

import { env } from "~/env";
import { AirtableBase } from "~/services/airtable/base";

async function getQuestionsPage(type: "kumite" | "kata", offset?: string) {
  const baseId = "appLCB8iofonyJBHF";
  const table = AirtableBase[type];

  const url = `https://api.airtable.com/v0/${baseId}/${table.tableName}?view=${table.views.all}`;
  const resp = await fetch(offset ? url + `&offset=${offset}` : url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
    },
  });

  const questions = await resp.json();

  return questions;
}

export async function getQuestions(
  type: "kumite" | "kata",
): Promise<{ No: string; A: string; Q: string }[]> {
  const resp = await getQuestionsPage(type);

  let questions = resp.records.map((question: any) => ({
    id: question.id,
    No: question.fields["#"],
    A: question.fields.A,
    Q: question.fields.Q,
  }));
  let offset: string = resp.offset;

  while (offset) {
    const resps = await getQuestionsPage(type, offset);
    const newQs = resps.records.map((question: any) => ({
      No: question.fields["#"],
      A: question.fields.A,
      Q: question.fields.Q,
    }));

    offset = resps.offset;
    questions = [...questions, ...newQs];
  }

  return questions;
}
