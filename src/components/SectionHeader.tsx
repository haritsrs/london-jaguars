import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SectionHeader({ index, eyebrow, title, href, linkLabel = "View all" }: { index: string; eyebrow: string; title: string; href?: string; linkLabel?: string }) {
  return <div className="section-header"><div><p className="eyebrow">{index} / {eyebrow}</p><h2>{title}</h2></div>{href ? <Link className="text-link" href={href}>{linkLabel}<ArrowUpRight size={16} /></Link> : null}</div>;
}
