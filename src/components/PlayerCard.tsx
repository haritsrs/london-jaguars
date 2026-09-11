import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Player } from "@/types";
import { PlayerVisual } from "@/components/PlayerVisual";

export function PlayerCard({ player }: { player: Player }) {
  return <Link className="player-card" href={`/team/${player.slug}`}>
    <div className="player-card__portrait">
      <div className="player-card__top"><span className="player-card__number">{player.sourcePosition}</span><span className="player-card__season">2028/29</span></div>
      <PlayerVisual imageKey={player.imageKey} initials={`${player.firstName.slice(0, 1)}${player.name.split(" ").slice(-1)[0].slice(0, 1)}`} name={player.name} />
      <small>London Jaguars · Men&apos;s first team</small>
    </div>
    <div className="player-card__bottom"><div><p className="eyebrow">{player.position} · Age {player.age}</p><h3>{player.name}</h3></div><ArrowUpRight size={19} /></div>
  </Link>;
}
