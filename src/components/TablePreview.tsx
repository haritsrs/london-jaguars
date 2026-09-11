import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fixtures } from "@/data/fixtures";

const rows = Array.from(new Set(fixtures.map((fixture) => fixture.competition))).map((competition) => {
  const matches = fixtures.filter((fixture) => fixture.competition === competition);
  const completed = matches.filter((fixture) => fixture.status === "completed");
  const wins = completed.filter((fixture) => fixture.result === "Win").length;
  const draws = completed.filter((fixture) => fixture.result === "Draw").length;
  const losses = completed.filter((fixture) => fixture.result === "Loss").length;
  return { competition, played: completed.length, upcoming: matches.length - completed.length, record: `${wins}–${draws}–${losses}` };
});

export function TablePreview() {
  return <section className="table-preview"><div className="table-preview__header"><div><p className="eyebrow">01 / Current campaign</p><h2>Matches by competition</h2></div><Link className="text-link" href="/matches">View all fixtures <ArrowUpRight size={16} /></Link></div><div className="table-wrap"><table><thead><tr><th>Competition</th><th>Played</th><th>Upcoming</th><th>Record</th></tr></thead><tbody>{rows.slice(0, 5).map((row) => <tr key={row.competition}><td><strong>{row.competition}</strong></td><td>{row.played}</td><td>{row.upcoming}</td><td>{row.record}</td></tr>)}</tbody></table></div></section>;
}
