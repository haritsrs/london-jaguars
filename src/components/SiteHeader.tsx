"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ClubMark } from "@/components/ClubMark";

const navigation = [
  { label: "News", href: "/news", children: [{ label: "News index", href: "/news" }] },
  { label: "Matches", href: "/matches", children: [{ label: "Fixtures & results", href: "/matches" }, { label: "Match centre", href: "/matches#upcoming" }] },
  { label: "Team", href: "/team", children: [{ label: "Men’s first team", href: "/team" }, { label: "Coaching staff", href: "/staff" }, { label: "Legends", href: "/legends" }, { label: "Past players", href: "/past-players" }] },
  { label: "Table", href: "/table", children: [{ label: "League table", href: "/table" }] },
  { label: "Stats", href: "/stats", children: [{ label: "Season stats", href: "/stats" }] },
  { label: "Club", href: "/club", children: [{ label: "Club identity", href: "/club" }, { label: "Honours", href: "/club#honours" }, { label: "Club history", href: "/club#history" }, { label: "Stadium", href: "/club#stadium" }, { label: "Kits", href: "/kits" }] },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
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
              const hasActiveChild = item.children.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`));
              return <div className={`nav-dropdown ${dropdown === item.label ? "is-open" : ""}`} key={item.href} onMouseEnter={() => setDropdown(item.label)} onMouseLeave={() => setDropdown(null)}><div className="nav-dropdown__trigger"><Link href={item.href} className={active || hasActiveChild ? "is-active" : ""} aria-current={active || hasActiveChild ? "page" : undefined}>{item.label}</Link><button type="button" aria-label={`Open ${item.label} menu`} aria-expanded={dropdown === item.label} onClick={() => setDropdown((value) => value === item.label ? null : item.label)}><ChevronDown size={14} /></button></div><div className="nav-dropdown__menu">{item.children.map((child) => <Link key={child.href} href={child.href} onClick={() => setDropdown(null)}>{child.label}<span>↗</span></Link>)}</div></div>;
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
          <p className="eyebrow">London Jaguars</p>
          <nav aria-label="Mobile navigation">
            {navigation.map((item, index) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return <div className="mobile-menu__group" key={item.href}><Link href={item.href} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}</Link><div className="mobile-menu__children">{item.children.filter((child) => child.href !== item.href).map((child) => <Link key={child.href} href={child.href} onClick={() => setOpen(false)}>{child.label}</Link>)}</div></div>;
            })}
          </nav>
          <div className="mobile-menu__utility"><Link href="/kits" onClick={() => setOpen(false)}>Shop the kits</Link><Link href="/club" onClick={() => setOpen(false)}>Club identity</Link></div>
        </div>
      </div>
    </header>
  );
}
