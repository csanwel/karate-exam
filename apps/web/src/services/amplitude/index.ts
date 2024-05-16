"use client";

import * as amplitude from "@amplitude/analytics-browser";

import { env } from "~/env";

amplitude.init(env.NEXT_PUBLIC_AMPLITUDE_API_KEY);

export const DEFAULT_TRACK_PROPERTIES = {
  project: "karate-exam",
};

export const track = amplitude.track;
