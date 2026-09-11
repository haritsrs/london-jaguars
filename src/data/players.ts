import type { Player, PositionCode, PositionGroup } from "@/types";
import { canonicalPlayerSeasons } from "@/data/canonical";

const positionGroups: Record<PositionCode, PositionGroup> = {
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

const slugify = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const currentRows = canonicalPlayerSeasons.filter((row) => row.season === "2028/29");

export const players: Player[] = currentRows.map((row, index) => ({
  slug: slugify(row.player),
  imageKey: `${positionGroups[row.position][0]}${row.player.replace(/[^A-Za-zÀ-ÿ]/g, "").slice(0, 1).toUpperCase()}${row.player.split(" ").at(-1)?.replace(/[^A-Za-zÀ-ÿ]/g, "").slice(0, 1).toUpperCase() ?? ""}`,
  name: row.player,
  firstName: row.player.split(" ")[0],
  position: positionGroups[row.position],
  shortPosition: row.position,
  sourcePosition: row.position,
  age: row.age,
  appearances: row.appearances,
  goals: row.goals,
  assists: row.assists,
  cleanSheets: row.cleanSheets,
  ovr: row.endOrCurrentOvr,
  role: row.role,
  valueM: row.valueM,
  wageKPerWeek: row.wageKPerWeek,
  contractRemaining: row.contractRemaining,
  accent: (["green", "gold", "burgundy"] as const)[index % 3],
}));

const previousSeasonAppearances = new Map(
  canonicalPlayerSeasons
    .filter((row) => row.season === "2027/28")
    .map((row) => [row.player, row.appearances ?? -1]),
);

export const featuredPlayers = [...players]
  .sort((a, b) => (previousSeasonAppearances.get(b.name) ?? -1) - (previousSeasonAppearances.get(a.name) ?? -1))
  .slice(0, 4);

export const getPlayer = (slug: string) => players.find((player) => player.slug === slug);
