import type { Season } from "@/types";
import { canonicalSeasonSummaries } from "@/data/canonical";

const seasonStories: Record<string, string> = {
  "2026/27": "The second competitive season: third in the league, with the Carabao Cup and UEFA Conference League secured. The first season had finished seventh without a trophy; the response was immediate.",
  "2027/28": "The treble season: Premier League, UEFA Champions League and FA Cup.",
  "2028/29": "The current campaign: opening fixtures underway.",
};

export const seasons: Season[] = canonicalSeasonSummaries.map((summary) => ({
  year: summary.season,
  playerRecords: summary.playerRecords,
  avgOvr: summary.avgOvr,
  avgAge: summary.avgAge,
  squadValueM: summary.squadValueM,
  weeklyWagesK: summary.weeklyWagesK,
  appearances: summary.appearances,
  goals: summary.goals,
  assists: summary.assists,
  cleanSheets: summary.cleanSheets,
  trophies: summary.season === "2027/28" ? ["Premier League", "UEFA Champions League", "FA Cup"] : summary.season === "2026/27" ? ["Carabao Cup", "UEFA Conference League"] : [],
  story: seasonStories[summary.season] ?? summary.interpretation,
  current: summary.season === "2028/29",
}));
