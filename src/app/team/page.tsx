import type { Metadata } from "next";
import { PlayerCard } from "@/components/PlayerCard";
import { players } from "@/data/players";

export const metadata: Metadata = { title: "Men’s First Team" };
const groups = ["Goalkeeper", "Defender", "Midfielder", "Forward"] as const;
const groupLabels: Record<(typeof groups)[number], string> = { Goalkeeper: "Goalkeepers", Defender: "Defenders", Midfielder: "Midfielders", Forward: "Forwards" };

export default function TeamPage() {
  return <div className="page-shell"><div className="site-frame"><div className="page-intro page-intro--split"><div><p className="eyebrow">Men’s first team · 2028/29</p><h1>The 2028/29<br />squad</h1></div><p>The first-team group for the Premier League, Champions League and cup campaigns, organised by position.</p></div><div className="team-groups">{groups.map((group) => <section className="team-group" key={group}><div className="team-group__heading"><p className="eyebrow">{group === "Goalkeeper" ? "01" : group === "Defender" ? "02" : group === "Midfielder" ? "03" : "04"} / Squad</p><h2>{groupLabels[group]}</h2><span>{players.filter((player) => player.position === group).length} players</span></div><div className="team-grid">{players.filter((player) => player.position === group).map((player) => <PlayerCard key={player.slug} player={player} />)}</div></section>)}</div></div></div>;
}
