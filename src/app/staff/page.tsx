import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { coachingStaff } from "@/data/staff";

export default function StaffPage() {
  const manager = coachingStaff[0];
  const coaches = coachingStaff.slice(1);
  if (!manager.image || !manager.imageAlt) throw new Error("Manager profile image is missing");

  return <div className="archive-page"><section className="archive-hero archive-hero--dark"><div className="site-frame"><p className="eyebrow eyebrow--gold">Club archive · 03</p><h1>Coaching<br /><em>staff</em></h1><p className="archive-hero__intro">The staff preparing the first team for Premier League, Champions League and cup matchdays.</p></div></section><section className="site-frame staff-page"><div className="section-header"><div><p className="eyebrow">First-team leadership</p><h2>The staff<br />behind matchday</h2></div><p className="archive-list__aside">Kyle Shanahan leads the published first-team staff record.</p></div><article className="staff-feature"><div className="staff-feature__media"><Image src={manager.image} alt={manager.imageAlt} fill sizes="(max-width: 760px) 100vw, 55vw" /></div><div className="staff-feature__copy"><p className="eyebrow eyebrow--gold">{manager.role}</p><h3>{manager.name}</h3><p>{manager.description}</p><p>Shanahan prepares a team that can control a match, press with purpose and stay composed when the decisive moment arrives.</p><Link className="text-link" href="/club#manager">Read about club leadership <ArrowUpRight size={16} /></Link></div></article><div className="staff-list"><div className="section-header"><div><p className="eyebrow">Matchday staff</p><h2>The group around<br />the manager</h2></div></div><div className="staff-list__grid">{coaches.map((member) => <article className="staff-card" key={member.name}><p className="eyebrow eyebrow--gold">{member.role}</p><h3>{member.name}</h3><p>{member.description}</p></article>)}</div></div></section><section className="archive-link-band archive-link-band--light"><div className="site-frame"><Link href="/club">Read about the club <ArrowUpRight size={18} /></Link><Link href="/team">View the first team <ArrowUpRight size={18} /></Link></div></section></div>;
}
