"use client";

import { useMemo, useState } from "react";
import { fixtureFilters, fixtures } from "@/data/fixtures";
import { FixtureRow } from "@/components/FixtureRow";

export function FixtureList() {
  const [filter, setFilter] = useState("All");
  const visible = useMemo(() => filter === "All" ? fixtures : fixtures.filter((fixture) => fixture.competition === filter), [filter]);
  const upcoming = visible.filter((fixture) => fixture.status === "upcoming");
  const results = visible.filter((fixture) => fixture.status !== "upcoming");
  return <div><div className="filter-bar" aria-label="Fixture competitions">{fixtureFilters.map((item) => <button key={item} type="button" aria-pressed={filter === item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="fixture-list-section"><div className="fixture-list-section__heading"><p className="eyebrow">2028/29 · Match calendar</p><h2>Upcoming</h2></div>{upcoming.length ? upcoming.map((fixture) => <FixtureRow fixture={fixture} key={fixture.id} />) : <p className="empty-state">No upcoming fixtures in this competition.</p>}</div><div className="fixture-list-section"><div className="fixture-list-section__heading"><p className="eyebrow">2028/29 · Match calendar</p><h2>Results</h2></div>{results.length ? results.map((fixture) => <FixtureRow fixture={fixture} key={fixture.id} />) : <p className="empty-state">No completed results in this competition.</p>}</div></div>;
}
