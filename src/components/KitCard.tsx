import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function KitCard({ name, image, className = "" }: { name: string; image: string; className?: string }) {
  return <Link className={`kit-card ${className}`} href="/kits"><div className="kit-card__media"><Image src={image} alt={`${name} London Jaguars kit presentation`} fill sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="kit-card__label"><span>{name}</span><ArrowUpRight size={17} /></div></Link>;
}
