import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://london-jaguars.vercel.app"),
  title: { default: "London Jaguars FC", template: "%s · London Jaguars" },
  description: "The official website of London Jaguars Football Club, with first-team news, fixtures, results and club history.",
  openGraph: {
    type: "website",
    siteName: "London Jaguars FC",
    title: "London Jaguars FC",
    description: "The official website of London Jaguars Football Club.",
    url: "https://london-jaguars.vercel.app",
    images: [{ url: "/Treble winners.png", alt: "London Jaguars treble winners" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "London Jaguars FC",
    description: "The official website of London Jaguars Football Club.",
    images: ["/Treble winners.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main>{children}</main><Footer /></body></html>;
}
