export type PositionCode = "GK" | "LB" | "CB" | "RB" | "CDM" | "LM" | "CM" | "CAM" | "RM" | "LW" | "RW" | "ST";
export type PositionGroup = "Goalkeeper" | "Defender" | "Midfielder" | "Forward";

export type Player = {
  slug: string;
  imageKey: string;
  name: string;
  firstName: string;
  position: PositionGroup;
  shortPosition: PositionCode;
  sourcePosition: PositionCode;
  age: number;
  number?: number;
  nationality?: string;
  country?: string;
  foot?: "Right" | "Left";
  appearances?: number;
  goals?: number;
  assists?: number;
  cleanSheets?: number;
  ovr?: number;
  role?: string;
  valueM?: number;
  wageKPerWeek?: number;
  contractRemaining?: string;
  bio?: string;
  accent: "green" | "gold" | "burgundy";
};

export type CanonicalPlayerSeason = {
  season: string;
  position: PositionCode;
  player: string;
  age: number;
  startOvr?: number;
  ovrGrowth?: number;
  endOrCurrentOvr?: number;
  role?: string;
  appearances?: number;
  goals?: number;
  assists?: number;
  cleanSheets?: number;
  valueM?: number;
  wageKPerWeek?: number;
  contractRemaining?: string;
  sourceFile: string;
  sourceSheet: string;
  interpretation: string;
};

export type CanonicalSeasonSummary = {
  season: string;
  playerRecords?: number;
  avgOvr?: number;
  avgAge?: number;
  squadValueM?: number;
  weeklyWagesK?: number;
  appearances?: number;
  goals?: number;
  assists?: number;
  cleanSheets?: number;
  interpretation: string;
};

export type TransferRecord = {
  listedDirection: "Outgoings" | "Incomings";
  date: string;
  player: string;
  otherTeam: string;
  feeM: number;
  reliabilityNote: string;
};

export type ScheduleRecord = {
  id: string;
  date: string;
  competitionCode: string;
  opponent: string;
  score?: string;
  location: "Home" | "Away" | "Neutral";
  result?: "Win" | "Draw" | "Loss";
  status: "Completed" | "Upcoming";
  season: string;
  interpretation: string;
};

export type Fixture = {
  id: string;
  date: string;
  dateIso: string;
  time?: string;
  competition: string;
  competitionCode: string;
  opponent: string;
  opponentShort: string;
  location: "Home" | "Away" | "Neutral";
  home: boolean;
  status: "upcoming" | "completed";
  result?: "Win" | "Draw" | "Loss";
  score?: string;
  note?: string;
};

export type NewsItem = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  lead: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
  quote?: string;
  date: string;
  readingTime: string;
  tone: "green" | "paper" | "burgundy" | "gold";
  image?: string;
  imageAlt?: string;
  featured?: boolean;
};

export type Honour = {
  competition: string;
  count: number;
  latest: string;
  note: string;
};

export type Season = {
  year: string;
  position?: string;
  record?: string;
  topScorer?: string;
  goals?: number;
  appearances?: number;
  assists?: number;
  cleanSheets?: number;
  playerRecords?: number;
  avgOvr?: number;
  avgAge?: number;
  squadValueM?: number;
  weeklyWagesK?: number;
  trophies: string[];
  story: string;
  current?: boolean;
};
