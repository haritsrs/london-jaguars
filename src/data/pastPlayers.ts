import { canonicalPlayerSeasons } from "@/data/canonical";

const positionLabels: Record<string, string> = {
  GK: "Goalkeeper",
  LB: "Defender",
  CB: "Defender",
  RB: "Defender",
  CDM: "Midfielder",
  LM: "Midfielder",
  CM: "Midfielder",
  CAM: "Midfielder",
  RM: "Midfielder",
  LW: "Forward",
  RW: "Forward",
  ST: "Forward",
};

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const slugify = (value: string) => normalize(value);
const currentNames = new Set(canonicalPlayerSeasons.filter((row) => row.season === "2028/29").map((row) => normalize(row.player)));

export type PastPlayer = {
  slug: string;
  imageKey: string;
  name: string;
  position: string;
  shortPosition: string;
  firstSeason: string;
  lastSeason: string;
  seasons: string[];
  appearances: number;
  goals: number;
  assists: number;
  cleanSheets: number;
  age: number;
  role: string;
};

const archive = new Map<string, PastPlayer>();
for (const row of canonicalPlayerSeasons) {
  const key = normalize(row.player);
  if (row.season === "2028/29" || currentNames.has(key)) continue;
  const existing = archive.get(key);
  if (!existing) {
    archive.set(key, {
      slug: slugify(row.player),
      imageKey: `past/${slugify(row.player)}`,
      name: row.player,
      position: positionLabels[row.position] ?? row.position,
      shortPosition: row.position,
      firstSeason: row.season,
      lastSeason: row.season,
      seasons: [row.season],
      appearances: row.appearances ?? 0,
      goals: row.goals ?? 0,
      assists: row.assists ?? 0,
      cleanSheets: row.cleanSheets ?? 0,
      age: row.age,
      role: row.role ?? "Historical squad member",
    });
    continue;
  }
  existing.firstSeason = existing.firstSeason < row.season ? existing.firstSeason : row.season;
  existing.lastSeason = existing.lastSeason > row.season ? existing.lastSeason : row.season;
  if (!existing.seasons.includes(row.season)) existing.seasons.push(row.season);
  existing.appearances += row.appearances ?? 0;
  existing.goals += row.goals ?? 0;
  existing.assists += row.assists ?? 0;
  existing.cleanSheets += row.cleanSheets ?? 0;
  existing.age = row.age;
  existing.role = row.role ?? existing.role;
}

export const pastPlayers = Array.from(archive.values()).sort((a, b) => a.name.localeCompare(b.name));
export const getPastPlayer = (slug: string) => pastPlayers.find((player) => player.slug === slug);
