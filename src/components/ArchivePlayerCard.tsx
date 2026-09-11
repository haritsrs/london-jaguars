import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PlayerVisual } from "@/components/PlayerVisual";

type ArchiveCardPlayer = {
  slug: string;
  imageKey: string;
  name: string;
  position: string;
  shortPosition: string;
  role: string;
  age?: number;
  era?: string;
  firstSeason?: string;
  lastSeason?: string;
  appearances?: number;
  note?: string;
};

const positionInitial = (position: string) => position === "Goalkeeper" ? "G" : position.slice(0, 1).toUpperCase();
const initials = (name: string) => {
  const clean = name.replace(/[^A-Za-zÀ-ÿ ]/g, "").trim().split(/\s+/);
  return `${clean[0]?.slice(0, 1) ?? "L"}${clean.at(-1)?.slice(0, 1) ?? "J"}`.toUpperCase();
};

export function ArchivePlayerCard({ player, archive, href }: { player: ArchiveCardPlayer; archive: "legends" | "past"; href?: string }) {
  const tag = `${archive === "legends" ? "L" : "P"}${positionInitial(player.position)}${initials(player.name)}`;
  const season = player.era ?? `${player.firstSeason}–${player.lastSeason}`;
  const content = <><div className="archive-player-card__portrait"><div className="archive-player-card__top"><span>{tag}</span><span>{season}</span></div><PlayerVisual imageKey={player.imageKey} initials={initials(player.name)} name={player.name} /><small>London Jaguars · Club archive</small></div><div className="archive-player-card__bottom"><div><p className="eyebrow">{player.shortPosition} · {player.position}</p><h3>{player.name}</h3><span>{player.role}{player.appearances !== undefined ? ` · ${player.appearances} appearances` : ""}</span></div>{href ? <ArrowUpRight size={18} /> : null}</div>{player.note ? <p className="archive-player-card__note">{player.note}</p> : null}</>;

  return href ? <Link className="archive-player-card" href={href}>{content}</Link> : <article className="archive-player-card">{content}</article>;
}
