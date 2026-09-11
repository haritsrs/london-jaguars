import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fixtures, formatMatchDate, getScorelineForJaguars, scheduleReferenceDate } from "@/data/fixtures";

export const metadata: Metadata = { title: "League Table" };
const completedLeagueMatches = fixtures.filter((fixture) => fixture.competitionCode === "EPL" && fixture.status === "completed");
const leagueRecord = completedLeagueMatches.reduce((record, fixture) => {
  const score = getScorelineForJaguars(fixture);
  if (fixture.result === "Win") record.wins += 1;
  if (score) { record.goalsFor += score[0]; record.goalsAgainst += score[1]; }
  return record;
}, { wins: 0, goalsFor: 0, goalsAgainst: 0 });

export default function TablePage() {
  return <div className="page-shell"><div className="site-frame"><div className="page-intro page-intro--split"><div><p className="eyebrow">Premier League · 2028/29</p><h1>Premier League<br />table.</h1></div><p>The official standings are awaiting their first published update. Follow the opening weeks through fixtures and results while the campaign begins to take shape.</p></div><div className="standings"><div className="standings__header"><h2>Premier League</h2><span>Season update · {formatMatchDate(scheduleReferenceDate)}</span></div><section className="standings-pending"><div><p className="eyebrow">Standings update</p><h2>The league table will appear here when the official standings are published.</h2></div><div className="standings-pending__record"><span><strong>{completedLeagueMatches.length}</strong><small>Played</small></span><span><strong>{leagueRecord.wins}</strong><small>Won</small></span><span><strong>{leagueRecord.goalsFor}</strong><small>Goals for</small></span><span><strong>{leagueRecord.goalsAgainst}</strong><small>Goals against</small></span></div></section><div className="standings__legend"><Link href="/matches">Fixtures and results <ArrowUpRight size={16} /></Link><Link href="/stats">Season stats <ArrowUpRight size={16} /></Link></div></div></div></div>;
}
