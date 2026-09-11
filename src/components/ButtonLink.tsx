import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  return <Link className={`button button--${variant}`} href={href}>{children}<ArrowRight size={17} /></Link>;
}
