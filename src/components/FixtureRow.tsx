import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Fixture } from "@/types";
import { Tag } from "@/components/Tag";
import { getScorelineForJaguars } from "@/data/fixtures";

export function FixtureRow({ fixture, ribbon = false }: { fixture: Fixture; ribbon?: boolean }) {
  const score = getScorelineForJaguars(fixture);
  const scoreLabel = score ? `${score[0]}–${score[1]}` : "—";
  const stateLabel = fixture.status === "upcoming" ? "Upcoming" : fixture.result ?? "Completed";
  return <div className={`fixture-row ${ribbon ? "fixture-row--ribbon" : ""} fixture-row--${fixture.result?.toLowerCase() ?? fixture.status}`}>
    <div className="fixture-row__date"><span>{fixture.date.split(" ")[0]}</span><small>{fixture.date.split(" ").slice(1).join(" ")}</small></div>
    <div className="fixture-row__competition"><Tag tone={fixture.competitionCode === "UCL" ? "gold" : "default"}>{fixture.competitionCode}</Tag><span>{fixture.location}</span></div>
    <div className="fixture-row__teams"><span>London Jaguars</span><strong className="fixture-row__score">{fixture.status === "upcoming" ? "vs" : scoreLabel}</strong><span>{fixture.opponent}</span></div>
    <div className="fixture-row__status"><span>{stateLabel}</span><Link href={`/matches#${fixture.id}`} aria-label={`View ${fixture.opponent} fixture`}><ArrowUpRight size={16} /></Link></div>
  </div>;
}
