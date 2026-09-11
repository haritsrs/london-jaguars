import type { Metadata } from "next";
import { FixtureList } from "@/components/FixtureList";

export const metadata: Metadata = { title: "Fixtures & Results" };

export default function MatchesPage() {
  return <div className="page-shell"><div className="site-frame"><div className="page-intro page-intro--split"><div><p className="eyebrow">2028/29 season</p><h1>Fixtures<br />and results.</h1></div><p>Every match carries its own demand. Follow the Premier League, Champions League and cup campaigns.</p></div><FixtureList /></div></div>;
}
