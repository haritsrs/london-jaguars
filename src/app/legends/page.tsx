import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { clubLegends } from "@/data/legends";
import { ArchivePlayerCard } from "@/components/ArchivePlayerCard";

export default function LegendsPage() {
  return <div className="archive-page"><section className="archive-hero archive-hero--dark"><div className="site-frame"><p className="eyebrow eyebrow--gold">Club archive · 01</p><h1>The players<br /><em>who shaped us</em></h1><p className="archive-hero__intro">These ten players changed the course of London Jaguars, from the founding team to the 2027/28 treble.</p></div></section><section className="site-frame archive-list"><div className="section-header"><div><p className="eyebrow">Club legends</p><h2>Ten players<br />from our history</h2></div><p className="archive-list__aside">From the first Jaguars teams to the side that won three major trophies.</p></div><div className="legend-ledger legend-ledger--cards">{clubLegends.map((legend, index) => <article className="legend-row" key={legend.name}><span className="legend-row__number">{String(index + 1).padStart(2, "0")}</span><ArchivePlayerCard player={legend} archive="legends" variant="list" /></article>)}</div></section><section className="archive-link-band"><div className="site-frame"><p className="eyebrow eyebrow--gold">Club archive</p><Link href="/past-players">Browse past players <ArrowUpRight size={18} /></Link><Link href="/staff">Meet the coaching staff <ArrowUpRight size={18} /></Link></div></section></div>;
}
