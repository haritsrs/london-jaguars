import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { NewsItem } from "@/types";
import { Tag } from "@/components/Tag";

const artDirection: Record<string, { number: string; stamp: string; label: string }> = {
  "First team": { number: "01", stamp: "THE STANDARD", label: "2028/29 · FIRST TEAM" },
  "Match report": { number: "5–2", stamp: "COVENTRY / AWAY", label: "PREMIER LEAGUE" },
  Features: { number: "90", stamp: "CONTROL / WITHOUT CAUTION", label: "TRAINING GROUND" },
  "Club news": { number: "18", stamp: "EVERY PLACE / EARNED", label: "CLUB NEWS" },
  History: { number: "27/28", stamp: "THE TREBLE / SEASON", label: "CLUB ARCHIVE" },
  Kits: { number: "28/29", stamp: "NIKE / LONDON", label: "KIT CULTURE" },
  Player: { number: "11", stamp: "THE NEXT / QUESTION", label: "PLAYER FEATURE" },
  Club: { number: "LDN", stamp: "A MODERN / POWER", label: "LONDON JAGUARS" },
};

export function StoryCard({ item, featured = false, compact = false }: { item: NewsItem; featured?: boolean; compact?: boolean }) {
  const art = artDirection[item.category] ?? { number: "LJ", stamp: "LONDON / JAGUARS", label: "OFFICIAL CLUB" };
  return <article className={`story-card story-card--${item.tone} ${featured ? "story-card--featured" : ""} ${compact ? "story-card--compact" : ""}`}>
    <Link href={`/news/${item.slug}`} className="story-card__link">
      {item.image ? <div className="story-card__art story-card__art--image"><Image src={item.image} alt={item.imageAlt ?? item.title} fill sizes={featured ? "(max-width: 760px) 100vw, 55vw" : "(max-width: 760px) 100vw, 28vw"} /><span className="story-card__art-label">{art.label}</span></div> : <div className="story-card__art"><span className="story-card__art-label">{art.label}</span><span className="story-card__number">{featured ? "01" : art.number}</span><span className="story-card__stamp">{art.stamp.split(" / ").map((line) => <span key={line}>{line}</span>)}</span></div>}
      <div className="story-card__body"><div className="story-card__meta"><Tag tone={item.tone === "gold" ? "gold" : "default"}>{item.category}</Tag><span>{item.date}</span></div><h3>{item.title}</h3>{featured ? <p>{item.excerpt}</p> : null}<span className="story-card__read">Read story <ArrowUpRight size={16} /></span><span className="story-card__time"><Clock3 size={13} /> {item.readingTime}</span></div>
    </Link>
  </article>;
}
