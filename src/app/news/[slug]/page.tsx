import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { StoryCard } from "@/components/StoryCard";
import { news, getNews } from "@/data/news";

export function generateStaticParams() { return news.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = getNews((await params).slug);
  return { title: item?.title ?? "Story" };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const item = getNews((await params).slug);
  if (!item) notFound();
  return <article className="article-page"><header className={`article-hero article-hero--${item.tone}`}><div className={`site-frame ${item.image ? "article-hero__grid" : ""}`}><div className="article-hero__copy"><Link className="back-link back-link--light" href="/news"><ArrowLeft size={16} /> Back to news</Link><div className="article-hero__meta"><span>{item.category}</span><span>{item.date} · {item.readingTime}</span></div><h1>{item.title}</h1><p>{item.excerpt}</p></div>{item.image ? <div className="article-hero__media"><Image src={item.image} alt={item.imageAlt ?? item.title} fill sizes="(max-width: 760px) 100vw, 55vw" priority /></div> : null}</div></header><div className="site-frame article-layout"><div className="article-body"><p className="article-lead">{item.lead}</p>{item.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}{item.quote ? <blockquote>“{item.quote}”</blockquote> : null}<div className="article-signoff"><span>London Jaguars editorial desk</span><Link className="text-link" href="/matches">See the next match <ArrowUpRight size={16} /></Link></div></div><aside className="article-aside"><p className="eyebrow">Continue reading</p>{news.filter((story) => story.slug !== item.slug).slice(0, 3).map((story) => <StoryCard key={story.slug} item={story} compact />)}</aside></div></article>;
}
