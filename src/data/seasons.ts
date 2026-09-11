import type { Season } from "@/types";
import { canonicalSeasonSummaries } from "@/data/canonical";

const seasonStories: Record<string, string> = {
  "2026/27": "Seventh in the first season, then third with the Carabao Cup and UEFA Conference League",
  "2027/28": "Treble winners: Premier League, UEFA Champions League and FA Cup",
  "2028/29": "Six fixtures recorded through 15 August in the current campaign",
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
