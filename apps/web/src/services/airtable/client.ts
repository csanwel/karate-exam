import Airtable from "airtable";

import { env } from "~/env";

export const airtable = new Airtable({ apiKey: env.AIRTABLE_API_KEY }).base(
  "appLCB8iofonyJBHF",
);
