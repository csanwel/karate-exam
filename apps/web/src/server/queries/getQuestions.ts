/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use server";

import { env } from "~/env";
import { AirtableBase } from "~/services/airtable/base";

export async function getQuestions(
  type: "kumite" | "kata",
): Promise<{ No: string; A: string; Q: string }[]> {
  const baseId = "appLCB8iofonyJBHF";
  const table = AirtableBase[type];

  const resp = await fetch(
    `https://api.airtable.com/v0/${baseId}/${table.tableName}?maxRecords=300&view=${table.views.all}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
      },
    },
  );

  const questions = await resp.json();

  return questions.records.map((question: any) => ({
    No: question.fields["#"],
    A: question.fields.A,
    Q: question.fields.Q,
  }));
}
