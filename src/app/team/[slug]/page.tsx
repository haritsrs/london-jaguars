import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { PlayerCard } from "@/components/PlayerCard";
import { PlayerVisual } from "@/components/PlayerVisual";
import { canonicalPlayerSeasons } from "@/data/canonical";
import { players, getPlayer } from "@/data/players";

export function generateStaticParams() { return players.map((player) => ({ slug: player.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const player = getPlayer((await params).slug); return { title: player?.name ?? "Player" }; }

export default async function PlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const player = getPlayer((await params).slug);
  if (!player) notFound();
  const related = players.filter((item) => item.position === player.position && item.slug !== player.slug).slice(0, 3);
  const history = canonicalPlayerSeasons.filter((row) => row.player === player.name);
  const latestComplete = history.find((row) => row.season === "2027/28");
  const thirdStatLabel = player.position === "Goalkeeper" ? "Clean sheets" : "Assists";
  const thirdStatValue = player.position === "Goalkeeper" ? latestComplete?.cleanSheets : latestComplete?.assists;

  return <div className="player-page"><div className="site-frame"><Link className="back-link" href="/team"><ArrowLeft size={16} /> Back to first team</Link><div className="player-profile player-profile--green"><div className="player-profile__portrait"><PlayerVisual imageKey={player.imageKey} initials={`${player.firstName.slice(0, 1)}${player.name.split(" ").slice(-1)[0].slice(0, 1)}`} name={player.name} priority /><strong>{player.sourcePosition}</strong></div><div className="player-profile__copy"><p className="eyebrow eyebrow--gold">Men&apos;s first team · 2028/29</p><h1>{player.name}</h1><p className="player-profile__bio">{player.name} is part of the London Jaguars men&apos;s first-team squad for the 2028/29 season.</p><div className="player-profile__facts"><span><small>Position</small><strong>{player.position}</strong></span><span><small>Age</small><strong>{player.age}</strong></span><span><small>Season</small><strong>2028/29</strong></span><span><small>Team</small><strong>Men&apos;s first team</strong></span></div></div></div><section className="player-stat-section"><div><p className="eyebrow">2027/28 record</p><h2>Last complete season.</h2><p className="player-stat-section__note">Performance figures from the treble-winning campaign.</p></div><div className="player-stats"><div><strong>{latestComplete?.appearances ?? "—"}</strong><span>Appearances</span></div><div><strong>{latestComplete?.goals ?? "—"}</strong><span>Goals</span></div><div><strong>{thirdStatValue ?? "—"}</strong><span>{thirdStatLabel}</span></div></div></section><section className="stats-detail player-history"><div className="section-header"><div><p className="eyebrow">Player history</p><h2>Season by season.</h2></div></div><div className="stats-detail__list">{history.map((row) => <div key={`${row.season}-${row.position}`}><span>{row.season}</span><strong>{row.position}</strong><small>{row.age} years</small><b>{row.appearances ?? "—"} apps</b><b>{row.position === "GK" ? `${row.cleanSheets ?? "—"} clean sheets` : `${row.goals ?? "—"} goals · ${row.assists ?? "—"} assists`}</b></div>)}</div></section><section className="related-players"><div className="section-header"><div><p className="eyebrow">The group</p><h2>More {player.position.toLowerCase()}s.</h2></div><Link className="text-link" href="/team">Full squad <ArrowUpRight size={16} /></Link></div><div className="team-grid team-grid--related">{related.map((item) => <PlayerCard key={item.slug} player={item} />)}</div></section></div></div>;
}
