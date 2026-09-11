import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { completedGoals, completedRecord, formatMatchDate, previousFixtures } from "@/data/fixtures";
import { canonicalSource } from "@/data/canonical";

export function SeasonSnapshot() {
  const form = previousFixtures.slice(-3).map((fixture) => fixture.result?.[0] ?? "—");
  const goalDifference = completedGoals.for - completedGoals.against;
  return <section className="season-snapshot"><div className="site-frame season-snapshot__inner"><div className="season-snapshot__intro"><p className="eyebrow eyebrow--gold">2028/29 season · {formatMatchDate(canonicalSource.scheduleReferenceDate)}</p><h2>The opening<br />record</h2><Link className="text-link text-link--light" href="/stats">Season stats <ArrowUpRight size={16} /></Link></div><div className="season-snapshot__stats"><div><span className="stat-number">{previousFixtures.length}</span><span className="stat-label">Matches recorded</span></div><div><span className="stat-number">{completedRecord.wins}–{completedRecord.draws}–{completedRecord.losses}</span><span className="stat-label">All competitions</span></div><div><span className="stat-number">{goalDifference >= 0 ? "+" : ""}{goalDifference}</span><span className="stat-label">Goal difference</span></div><div><span className="stat-number">{completedGoals.for}</span><span className="stat-label">Goals scored</span></div></div><div className="season-snapshot__form"><p className="eyebrow eyebrow--gold">Last three</p><div>{form.map((result, index) => <span key={`${result}-${index}`}>{result}</span>)}</div><small>Results from the last three completed fixtures.</small></div></div></section>;
}
