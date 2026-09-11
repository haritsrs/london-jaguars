import type { Metadata } from "next";
import { KitShowcase } from "@/components/KitShowcase";

export const metadata: Metadata = { title: "Kits" };

export default function KitsPage() {
  return <div className="kits-page"><div className="site-frame"><div className="page-intro page-intro--split"><div><p className="eyebrow">Nike · 2028/29</p><h1>The colours<br />of London.</h1></div><p>Three expressions of the same standard. The home shirt carries the crest forward; the away and third kits take the club into new ground.</p></div><KitShowcase /><section className="kit-notes"><div><p className="eyebrow">01 / Home</p><h2>Deep jaguar green.</h2><p>Modern, controlled and instantly recognisable. The home kit is the clearest expression of the club.</p></div><div><p className="eyebrow">02 / Away</p><h2>Metropolitan burgundy.</h2><p>Rich, serious and distinct from home without abandoning the visual language.</p></div><div><p className="eyebrow">03 / Third</p><h2>Archive gold.</h2><p>A Nike archive reference with antique gold, near-black green and minimal white.</p></div></section></div></div>;
}
