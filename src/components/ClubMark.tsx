import Image from "next/image";

export function ClubMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`club-mark ${compact ? "club-mark--compact" : ""}`}>
      <Image src="/logo.png" alt="London Jaguars crest" width={compact ? 46 : 58} height={compact ? 46 : 58} priority />
      <span className="club-mark__wordmark">London Jaguars</span>
    </div>
  );
}
