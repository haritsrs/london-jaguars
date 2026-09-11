"use client";

import { useMemo, useState } from "react";
import { news } from "@/data/news";
import { StoryCard } from "@/components/StoryCard";

const filters = ["All", "First team", "Match report", "Features", "Club", "History", "Kits", "Player"];

export function NewsIndex() {
  const [filter, setFilter] = useState("All");
  const visible = useMemo(() => filter === "All" ? news : news.filter((item) => item.category === filter), [filter]);
  return <div><div className="filter-bar" aria-label="News categories">{filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="news-index">{visible.map((item, index) => <StoryCard key={item.slug} item={item} featured={index === 0 && filter === "All"} />)}</div></div>;
}
