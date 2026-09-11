"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const kits = [
  { name: "Home", image: "/Home Kit.png", partner: "Nike · Coca-Cola" },
  { name: "Away", image: "/Away Kit.png", partner: "Nike · Coca-Cola" },
  { name: "Third", image: "/Third Kit.png", partner: "Nike · Coca-Cola" },
];

export function HomeKitRotator() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % kits.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const kit = kits[active];

  return <div className="home-hero__media" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
    {kits.map((item, index) => <div className={`home-hero__slide ${index === active ? "is-active" : ""}`} key={item.name} aria-hidden={index !== active}>
      <Image src={item.image} alt={`${item.name} kit presentation`} fill priority={index === 0} sizes="(max-width: 768px) 100vw, 58vw" />
    </div>)}
    <div className="home-hero__media-caption"><span>2028/29 {kit.name} kit</span><span>{kit.partner}</span></div>
    <div className="home-hero__media-index"><span>{String(active + 1).padStart(2, "0")}</span><span>/</span><span>{String(kits.length).padStart(2, "0")}</span></div>
    <div className="home-hero__media-controls" role="tablist" aria-label="Featured kit">
      {kits.map((item, index) => <button key={item.name} type="button" role="tab" aria-label={`Show ${item.name} kit`} aria-selected={index === active} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item.name}</button>)}
    </div>
  </div>;
}
