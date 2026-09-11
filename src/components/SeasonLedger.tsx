import Link from "next/link";
import { ArrowUpRight, Trophy } from "lucide-react";
import { seasons } from "@/data/seasons";

export function SeasonLedger({ compact = false }: { compact?: boolean }) {
  return <div className={`season-ledger ${compact ? "season-ledger--compact" : ""}`}>{seasons.map((season) => <article className={`season-ledger__row ${season.current ? "season-ledger__row--current" : ""}`} key={season.year}><div className="season-ledger__year"><span>{season.year}</span>{season.current ? <small>Current season</small> : null}</div><div className="season-ledger__record"><strong>{season.playerRecords ?? "—"}</strong></div><div className="season-ledger__story"><h3>{season.story}</h3><p>{season.goals !== undefined ? `${season.goals} goals · ${season.appearances ?? "—"} appearances` : season.playerRecords === undefined ? "League finish recorded" : "Season in progress"}</p></div><div className="season-ledger__trophies">{season.trophies.length ? season.trophies.map((trophy) => <span key={trophy}><Trophy size={14} />{trophy}</span>) : <span className="season-ledger__empty">{season.current ? "Season in progress" : "No major honours"}</span>}</div><Link className="season-ledger__arrow" href="/club#archive" aria-label={`View ${season.year} season archive`}><ArrowUpRight size={18} /></Link></article>)}</div>;
}
