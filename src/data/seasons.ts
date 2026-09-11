import type { Season } from "@/types";
import { canonicalSeasonSummaries } from "@/data/canonical";

const seasonStories: Record<string, string> = {
  "2026/27": "Baseline first-team and scouting season.",
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
  trophies: summary.season === "2027/28" ? ["Premier League", "UEFA Champions League", "FA Cup"] : [],
  story: seasonStories[summary.season] ?? summary.interpretation,
  current: summary.season === "2028/29",
}));
