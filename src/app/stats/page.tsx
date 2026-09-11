import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { canonicalPlayerSeasons } from "@/data/canonical";
import { seasons } from "@/data/seasons";

export const metadata: Metadata = { title: "Season Stats" };

const completeSeason = canonicalPlayerSeasons.filter((row) => row.season === "2027/28");
const leaderFor = (label: string, key: "goals" | "assists" | "appearances" | "cleanSheets") => {
  const player = completeSeason.reduce((leader, row) => (row[key] ?? -1) > (leader[key] ?? -1) ? row : leader, completeSeason[0]);
  return { label, value: String(player[key] ?? "—").padStart(2, "0"), player: player.player, detail: `${player.position} · 2027/28` };
};
const statLeaders = [leaderFor("Goals", "goals"), leaderFor("Assists", "assists"), leaderFor("Appearances", "appearances"), leaderFor("Clean sheets", "cleanSheets")];
export default function StatsPage() {
  return <div className="page-shell"><div className="site-frame"><div className="page-intro page-intro--split"><div><p className="eyebrow">Men&apos;s first team</p><h1>The numbers<br />behind the work.</h1></div><p>The latest complete individual performance record is the 2027/28 treble season. Current results remain available in the match centre as the new campaign develops.</p></div><section className="stats-leaders"><div className="stats-leaders__intro"><p className="eyebrow">Latest complete season · 2027/28</p><h2>The standard<br /><em>in numbers.</em></h2></div>{statLeaders.map((item) => <div className="leader" key={item.label}><span className="stat-number">{item.value}</span><span className="stat-label">{item.label}</span><strong>{item.player}</strong><small>{item.detail}</small></div>)}</section><section className="stats-detail stats-detail--summary"><div className="section-header"><div><p className="eyebrow">Season archive</p><h2>The record by campaign.</h2></div><Link className="text-link" href="/team">View the squad <ArrowUpRight size={16} /></Link></div><div className="stats-detail__list">{seasons.map((season) => <div key={season.year}><span>{season.year}</span><strong>{season.story}</strong><small>Average age {season.avgAge.toFixed(1)}</small><b>{season.appearances !== undefined ? `${season.appearances} apps` : "Season in progress"}</b><b>{season.goals !== undefined ? `${season.goals} goals` : "Results only"}</b></div>)}</div><p className="stats-detail__footnote">2028/29 individual player totals will appear when the complete record is published.</p></section></div></div>;
}
