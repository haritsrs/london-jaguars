"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ClubMark } from "@/components/ClubMark";

const navigation = [
  { label: "News", href: "/news" },
  { label: "Matches", href: "/matches" },
  { label: "Team", href: "/team" },
  { label: "Table", href: "/table" },
  { label: "Stats", href: "/stats" },
  { label: "Club", href: "/club" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="site-frame utility-bar__inner">
          <span>London, England · Est. 1994</span>
          <nav aria-label="Utility navigation">
            <Link href="/kits">Shop</Link>
            <Link href="/matches">Match centre</Link>
          </nav>
        </div>
      </div>
      <div className="main-nav">
        <div className="site-frame main-nav__inner">
          <Link href="/" aria-label="London Jaguars home" onClick={() => setOpen(false)}><ClubMark compact /></Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return <Link key={item.href} href={item.href} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined}>{item.label}</Link>;
            })}
          </nav>
          <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={22} /> : <Menu size={22} />}
            <span>Menu</span>
          </button>
        </div>
      </div>
      <div className={`mobile-menu ${open ? "mobile-menu--open" : ""}`} aria-hidden={!open}>
        <div className="site-frame mobile-menu__inner">
          <p className="eyebrow">The standard is victory</p>
          <nav aria-label="Mobile navigation">
            {navigation.map((item, index) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return <Link key={item.href} href={item.href} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}</Link>;
            })}
          </nav>
          <div className="mobile-menu__utility"><Link href="/kits" onClick={() => setOpen(false)}>Shop the kits</Link><Link href="/club" onClick={() => setOpen(false)}>Our identity</Link></div>
        </div>
      </div>
    </header>
  );
}
