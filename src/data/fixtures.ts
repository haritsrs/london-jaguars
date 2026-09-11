import type { Fixture } from "@/types";
import { canonicalSchedule, canonicalSource } from "@/data/canonical";

const competitionLabels: Record<string, string> = {
  EPL: "Premier League",
  UCL: "UEFA Champions League",
  Friendly: "Friendly",
  "FA Community Shield": "FA Community Shield",
  "Super Cup": "Super Cup",
  "Carabao Cup": "Carabao Cup",
};

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const competitionLabel = (code: string) => competitionLabels[code] ?? code;

export const formatMatchDate = (date: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));

export const fixtures: Fixture[] = canonicalSchedule.map((match) => ({
  id: match.id,
  date: formatMatchDate(match.date),
  dateIso: match.date,
  competition: competitionLabel(match.competitionCode),
  competitionCode: match.competitionCode,
  opponent: match.opponent,
  opponentShort: match.opponent,
  location: match.location,
  home: match.location === "Home",
  status: match.status === "Upcoming" ? "upcoming" : "completed",
  result: match.result,
  score: match.score,
}));

export const upcomingFixtures = fixtures.filter((fixture) => fixture.status === "upcoming");
export const previousFixtures = fixtures.filter((fixture) => fixture.status === "completed");
export const scheduleReferenceDate = canonicalSource.scheduleReferenceDate;
export const fixtureFilters = ["All", ...Array.from(new Set(fixtures.map((fixture) => fixture.competition)))];

export function getScorelineForJaguars(fixture: Fixture) {
  if (!fixture.score) return null;
  const match = fixture.score.match(/^(\d+)-(\d+)/);
  if (!match) return null;
  const score: readonly [number, number] = [Number(match[1]), Number(match[2])];
  return fixture.location === "Away" ? [score[1], score[0]] as const : score;
}

export const completedRecord = previousFixtures.reduce((record, fixture) => {
  if (fixture.result === "Win") record.wins += 1;
  if (fixture.result === "Draw") record.draws += 1;
  if (fixture.result === "Loss") record.losses += 1;
  return record;
}, { wins: 0, draws: 0, losses: 0 });

export const completedGoals = previousFixtures.reduce((totals, fixture) => {
  const score = getScorelineForJaguars(fixture);
  if (score) {
    totals.for += score[0];
    totals.against += score[1];
  }
  return totals;
}, { for: 0, against: 0 });

export const makeFixtureId = (date: string, opponent: string) => `${date}-${slugify(opponent)}`;
