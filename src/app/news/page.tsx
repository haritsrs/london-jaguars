import type { Metadata } from "next";
import { NewsIndex } from "@/components/NewsIndex";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return <div className="page-shell"><div className="site-frame"><div className="page-intro"><p className="eyebrow">London Jaguars newsroom</p><h1>News and stories.</h1><p>First-team updates, match reports, player features and the stories that keep the club moving.</p></div><NewsIndex /></div></div>;
}
