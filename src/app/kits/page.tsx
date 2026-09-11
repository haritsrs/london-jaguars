import type { Metadata } from "next";
import { KitShowcase } from "@/components/KitShowcase";

export const metadata: Metadata = { title: "Kits" };

export default function KitsPage() {
  return <div className="kits-page"><div className="site-frame"><div className="page-intro page-intro--split"><div><p className="eyebrow">Nike · 2028/29</p><h1>Three kits<br />for London</h1></div><p>The home, away and third shirts give the 2028/29 squad three distinct matchday looks, all built around the Jaguars crest.</p></div><KitShowcase /><section className="kit-notes"><div><p className="eyebrow">01 / Home</p><h2>Home colours</h2><p>Deep jaguar green with white and gold detailing. The shirt worn at Everbank Park.</p></div><div><p className="eyebrow">02 / Away</p><h2>The away strip</h2><p>Deep burgundy with cream-gold detailing for the club’s away fixtures.</p></div><div><p className="eyebrow">03 / Third</p><h2>The third kit</h2><p>Antique gold and near-black green give the third shirt its own place in the collection.</p></div></section></div></div>;
}
