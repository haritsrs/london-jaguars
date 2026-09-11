"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const kits = [
  { name: "Home", season: "2028/29", image: "/Home Kit.png", description: "Deep jaguar green with white and gold detailing for home fixtures." },
  { name: "Away", season: "2028/29", image: "/Away Kit.png", description: "Deep burgundy with cream-gold detailing for away fixtures." },
  { name: "Third", season: "2028/29", image: "/Third Kit.png", description: "Antique gold and near-black green, drawing on the club archive." },
];

export function KitShowcase() {
  const [active, setActive] = useState(0);
  const kit = kits[active];
  return <div className="kit-showcase"><div className="kit-showcase__tabs" role="tablist" aria-label="Kit selection">{kits.map((item, index) => <button type="button" key={item.name} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.name}</button>)}</div><div className="kit-showcase__main"><div className="kit-showcase__image"><Image src={kit.image} alt={`${kit.name} kit presentation`} fill priority={active === 0} sizes="(max-width: 768px) 100vw, 62vw" /></div><div className="kit-showcase__copy"><p className="eyebrow eyebrow--gold">Nike football · {kit.season}</p><h2>{kit.name}<br /><em>kit</em></h2><p>{kit.description}</p><div className="kit-showcase__details"><span>Match issue</span><strong>London Jaguars FC</strong></div><a className="text-link text-link--light" href="#shop">View the {kit.name.toLowerCase()} kit <ArrowUpRight size={16} /></a></div></div><div className="kit-showcase__note"><span>01–03</span><p>Home, away and third shirts for the 2028/29 campaign.</p></div></div>;
}
