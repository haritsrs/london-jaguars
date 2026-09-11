import { CalendarDays, MapPin } from "lucide-react";
import { getScorelineForJaguars, upcomingFixtures, previousFixtures } from "@/data/fixtures";
import { ButtonLink } from "@/components/ButtonLink";

export function MatchRibbon() {
  const next = upcomingFixtures[0];
  const following = upcomingFixtures[1];
  const last = previousFixtures.at(-1);
  if (!next || !following || !last) return null;
  const lastScore = getScorelineForJaguars(last);
  return <section className="match-ribbon" aria-label="Matchday context"><div className="site-frame match-ribbon__inner">
    <div className="match-ribbon__previous"><p className="eyebrow eyebrow--gold">Last result</p><div className="match-ribbon__mini"><span>{last.opponentShort}</span><strong>{lastScore ? `${lastScore[0]}–${lastScore[1]}` : "—"}</strong><span>LJ</span></div><small>{last.competition} · {last.date}</small></div>
    <div className="match-ribbon__next"><div className="match-ribbon__next-label"><p className="eyebrow eyebrow--gold">Next match</p><span>{next.competition}</span></div><div className="match-ribbon__teams"><span>London<br />Jaguars</span><strong>VS</strong><span>{next.opponent}</span></div><div className="match-ribbon__meta"><span><CalendarDays size={15} /> {next.date} · Time TBC</span><span><MapPin size={15} /> {next.location}</span></div><ButtonLink href="/matches">Match centre</ButtonLink></div>
    <div className="match-ribbon__following"><p className="eyebrow eyebrow--gold">Following</p><div className="match-ribbon__mini"><span>LJ</span><strong>vs</strong><span>{following.opponentShort}</span></div><small>{following.competition} · {following.date}</small></div>
  </div></section>;
}
