export type ClubLegend = {
  slug: string;
  imageKey: string;
  name: string;
  era: string;
  role: string;
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
  shortPosition: string;
  note: string;
};

export const clubLegends: ClubLegend[] = [
  { slug: "vangelis-pavlidis", imageKey: "legends/vangelis-pavlidis", name: "Vangelis Pavlidis", era: "Founding years", role: "Early talisman", position: "Forward", shortPosition: "ST", note: "The striker who gave the early Jaguars their first genuine match-winner and set the level for the rise that followed." },
  { slug: "mateo-kovacic", imageKey: "legends/mateo-kovacic", name: "Mateo Kovačić", era: "Founding years", role: "Founding captain", position: "Midfielder", shortPosition: "CM", note: "The experienced captain who led the first generation and brought international standards to a young Jaguars team." },
  { slug: "mamadou-sangare", imageKey: "legends/mamadou-sangare", name: "Mamadou Sangaré", era: "The first rise", role: "Midfield original", position: "Midfielder", shortPosition: "CDM", note: "The original midfield jewel, a foundational player in the early side and one of the club’s defining talents." },
  { slug: "james-trafford", imageKey: "legends/james-trafford", name: "James Trafford", era: "The climb", role: "Treble goalkeeper", position: "Goalkeeper", shortPosition: "GK", note: "Trafford grew from the first Jaguars squad into the goalkeeper who lifted the treble, completing one of the club’s finest development stories." },
  { slug: "djed-spence", imageKey: "legends/djed-spence", name: "Djed Spence", era: "The climb", role: "Two-era full-back", position: "Defender", shortPosition: "RB", note: "Spence started in the original Jaguars side and was still there for the treble, linking the club’s first team to its greatest season." },
  { slug: "assane-diao", imageKey: "legends/assane-diao", name: "Assane Diao", era: "Peak Jaguars", role: "Peak-era attacker", position: "Forward", shortPosition: "RW", note: "The attacking face of peak Jaguars, Diao brought pace, goals and decisive moments to the treble-winning generation." },
  { slug: "emanuel-emegha", imageKey: "legends/emanuel-emegha", name: "Emanuel Emegha", era: "2027/28", role: "The treble striker", position: "Forward", shortPosition: "ST", note: "Emegha led the line through the treble season, scoring 39 goals and supplying 12 assists in 53 games." },
  { slug: "goncalo-inacio", imageKey: "legends/goncalo-inacio", name: "Gonçalo Inácio", era: "2027/28", role: "Defensive captain", position: "Defender", shortPosition: "CB", note: "The defensive captain of the treble side, Inácio made 55 appearances and set the tone at the heart of the team." },
  { slug: "ismael-saibari", imageKey: "legends/ismael-saibari", name: "Ismaël Saibari", era: "The rise", role: "First-team regular", position: "Midfielder", shortPosition: "CM", note: "Saibari started in the opening Jaguars campaign and remained part of the squad through the treble, bridging the club’s competitive rise." },
  { slug: "johan-bakayoko", imageKey: "legends/johan-bakayoko", name: "Johan Bakayoko", era: "The climb", role: "Right-wing competitor", position: "Forward", shortPosition: "RW", note: "Bakayoko won the right-wing place, adapted when Diao took it and stayed a trusted part of the treble squad." },
];
