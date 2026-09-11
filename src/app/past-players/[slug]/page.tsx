import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { PlayerVisual } from "@/components/PlayerVisual";
import { getPastPlayer, pastPlayers } from "@/data/pastPlayers";

export function generateStaticParams() { return pastPlayers.map((player) => ({ slug: player.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const player = getPastPlayer((await params).slug); return { title: player?.name ?? "Past player" }; }

export default async function PastPlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const player = getPastPlayer((await params).slug);
  if (!player) notFound();
  return <div className="player-page"><div className="site-frame"><Link className="back-link" href="/past-players"><ArrowLeft size={16} /> Back to past players</Link><div className="player-profile player-profile--green"><div className="player-profile__portrait"><PlayerVisual imageKey={player.imageKey} initials={`${player.name.replace(/[^A-Za-zÀ-ÿ]/g, "").slice(0, 1)}${player.name.split(" ").slice(-1)[0].replace(/[^A-Za-zÀ-ÿ]/g, "").slice(0, 1)}`} name={player.name} priority /><strong>{player.shortPosition}</strong></div><div className="player-profile__copy"><p className="eyebrow eyebrow--gold">Club archive · Past player</p><h1>{player.name}</h1><p className="player-profile__bio">A recorded member of the London Jaguars story, remembered here as part of the work that carried the club forward.</p><div className="player-profile__facts"><span><small>Position</small><strong>{player.position}</strong></span><span><small>Seasons</small><strong>{player.firstSeason}–{player.lastSeason}</strong></span><span><small>Role</small><strong>{player.role}</strong></span><span><small>Portrait</small><strong>Add `/players/past/{player.slug}.png`</strong></span></div></div></div><section className="player-stat-section"><div><p className="eyebrow">Club record</p><h2>Contribution across the archive.</h2><p className="player-stat-section__note">Figures are aggregated from the workbook’s recorded season rows.</p></div><div className="player-stats"><div><strong>{player.appearances}</strong><span>Appearances</span></div><div><strong>{player.goals}</strong><span>Goals</span></div><div><strong>{player.assists}</strong><span>Assists</span></div></div></section><section className="related-players"><div className="section-header"><div><p className="eyebrow">The archive</p><h2>More past players.</h2></div><Link className="text-link" href="/past-players">Full archive <ArrowUpRight size={16} /></Link></div></section></div></div>;
}
