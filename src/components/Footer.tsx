import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const columns = [
  { title: "Club", links: [["Our identity", "/club"], ["Honours", "/club#honours"], ["History", "/club#history"], ["Stadium", "/club#stadium"], ["Legends", "/legends"], ["Past players", "/past-players"], ["Coaching staff", "/staff"]] },
  { title: "Football", links: [["News", "/news"], ["Matches", "/matches"], ["First team", "/team"], ["League table", "/table"]] },
  { title: "Explore", links: [["Season stats", "/stats"], ["Club archive", "/club#archive"], ["The kits", "/kits"], ["First-team manager", "/club#manager"]] },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-frame site-footer__top">
        <div className="site-footer__brand">
          <Image src="/logo.png" alt="London Jaguars crest" width={84} height={84} />
          <p className="eyebrow eyebrow--gold">London · 1994</p>
          <h2>The standard<br />is victory.</h2>
        </div>
        <div className="site-footer__links">
          {columns.map((column) => <div key={column.title}><p className="eyebrow eyebrow--gold">{column.title}</p><ul>{column.links.map(([label, href]) => <li key={href}><Link href={href}>{label}<ArrowUpRight size={14} /></Link></li>)}</ul></div>)}
        </div>
      </div>
      <div className="site-footer__base">
        <div className="site-frame site-footer__base-inner"><span>© 2028 London Jaguars Football Club</span><span>Official club website · Coca-Cola partner</span><span>Privacy · Accessibility</span></div>
      </div>
    </footer>
  );
}
