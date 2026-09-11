import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "London Jaguars FC", template: "%s · London Jaguars" },
  description: "The official website of London Jaguars Football Club, with first-team news, fixtures, results and club history.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main>{children}</main><Footer /></body></html>;
}
