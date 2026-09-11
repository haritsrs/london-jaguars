import { canonicalTransfers } from "@/data/canonical";

export const pastPlayers = Array.from(
  new Map(canonicalTransfers.map((record) => [record.player, record])).values(),
).sort((a, b) => a.player.localeCompare(b.player));
