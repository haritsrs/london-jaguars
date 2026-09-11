import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { HomeKitRotator } from "@/components/HomeKitRotator";
import { KitCard } from "@/components/KitCard";
import { MatchRibbon } from "@/components/MatchRibbon";
import { PlayerCard } from "@/components/PlayerCard";
import { SeasonLedger } from "@/components/SeasonLedger";
import { SeasonSnapshot } from "@/components/SeasonSnapshot";
import { SectionHeader } from "@/components/SectionHeader";
import { StoryCard } from "@/components/StoryCard";
import { TablePreview } from "@/components/TablePreview";
import { upcomingFixtures } from "@/data/fixtures";
import { featuredPlayers } from "@/data/players";
import { news } from "@/data/news";

export default function HomePage() {
  const nextHomeFixture = upcomingFixtures.find((fixture) => fixture.home) ?? upcomingFixtures[0]!;

  return <>
    <section className="home-hero"><div className="site-frame home-hero__grid"><div className="home-hero__copy"><p className="eyebrow eyebrow--gold">2028/29 schedule snapshot · 15 Aug 2028</p><h1>The standard<br /><em>begins again.</em></h1><p className="home-hero__standfirst">Six matches are recorded in the current schedule. Five wins, one draw. The work continues with the same expectation: compete for every major honour.</p><ButtonLink href="/matches">Follow the season</ButtonLink><div className="home-hero__signature"><span>Control without caution</span><span>London Jaguars FC</span></div></div><HomeKitRotator /></div></section>
    <MatchRibbon />
    <section className="section section--latest"><div className="site-frame"><SectionHeader index="01" eyebrow="Latest" title="What matters now." href="/news" linkLabel="All news" /><div className="latest-grid"><StoryCard item={news[0]} featured /><div className="latest-grid__stack"><StoryCard item={news[1]} compact /><StoryCard item={news[2]} compact /></div><aside className="latest-match-note"><p className="eyebrow">Next at Everbank Park</p><span className="latest-match-note__competition">{nextHomeFixture.competition}</span><h3>London Jaguars <em>vs</em> {nextHomeFixture.opponent}</h3><span className="latest-match-note__date">{nextHomeFixture.date}</span><Link className="text-link" href="/matches">Match centre <ArrowUpRight size={16} /></Link></aside></div></div></section>
    <SeasonSnapshot />
    <section className="section section--squad"><div className="site-frame"><SectionHeader index="02" eyebrow="First team" title="Places are earned." href="/team" linkLabel="Meet the squad" /><div className="squad-grid">{featuredPlayers.map((player) => <PlayerCard key={player.slug} player={player} />)}</div></div></section>
    <section className="treble-feature"><div className="site-frame treble-feature__grid"><div className="treble-feature__mark"><span>27</span><span>/28</span></div><div className="treble-feature__copy"><p className="eyebrow eyebrow--gold">The defining season</p><h2>One year.<br /><em>Three trophies.</em></h2><p>Premier League. UEFA Champions League. FA Cup. The 2027/28 treble proved London Jaguars belonged at the highest level. It established the standard. It did not satisfy it.</p><Link className="text-link text-link--light" href="/club#history">Enter the archive <ArrowUpRight size={16} /></Link></div><div className="treble-feature__trophies"><div><strong>PL</strong><span>Champions of England</span></div><div><strong>UCL</strong><span>Champions of Europe</span></div><div><strong>FAC</strong><span>Wembley winners</span></div></div></div></section>
    <section className="section section--lower"><div className="site-frame lower-grid"><TablePreview /><Link className="place-feature" href="/club#stadium"><div className="place-feature__media"><Image src="/Everbank Park.jpg" alt="Everbank Park, home of London Jaguars" fill sizes="(max-width: 760px) 100vw, 40vw" /></div><div className="place-feature__copy"><p className="eyebrow">Club · Everbank Park</p><h3>Our home in London.</h3><span className="text-link">Discover Everbank Park <ArrowUpRight size={16} /></span></div></Link></div></section>
    <section className="section section--kits"><div className="site-frame"><SectionHeader index="03" eyebrow="Club shop" title="The colours of London." href="/kits" linkLabel="View all kits" /><div className="kit-grid"><KitCard name="Home" image="/Home Kit.png" className="kit-card--large" /><KitCard name="Away" image="/Away Kit.png" /><KitCard name="Third" image="/Third Kit.png" /></div></div></section>
    <section className="section section--archive"><div className="site-frame"><SectionHeader index="04" eyebrow="Season archive" title="History is a standard." href="/club#archive" linkLabel="Club history" /><SeasonLedger compact /></div></section>
  </>;
}
