import manifest from "@/data/logoManifest.json";

const aliases: Record<string, string> = {
  "ac milan": "ac-milan",
  "aek athens": "aek-athens",
  "athletic bilbao": "athletic-bilbao",
  "barcelona": "barcelona",
  "borussia monchengladbach": "borussia-monchengladbach",
  "bristol city": "bristol-city",
  coventry: "coventry",
  "crystal palace": "crystal-palace",
  fenerbahce: "fenerbahce",
  "inter milan": "inter-milan",
  "olympique lyon": "olympique-lyon",
  psg: "psg",
  rangers: "rangers",
  "real betis": "real-betis",
  villarreal: "villarreal",
  arsenal: "arsenal",
  "aston villa": "aston-villa",
  bournemouth: "bournemouth",
  brentford: "brentford",
  brighton: "brighton",
  chelsea: "chelsea",
  everton: "everton",
  leeds: "leeds",
  leicester: "leicester",
  liverpool: "liverpool",
  "man city": "man-city",
  "man united": "manchester-united",
  "man utd": "manchester-united",
  newcastle: "newcastle",
  "nottingham forest": "nottingham-forest",
  southampton: "southampton",
  spurs: "spurs",
  "west ham": "west-ham",
};

export const clubLogoFor = (name: string) => {
  const key = aliases[name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()] as keyof typeof manifest | undefined;
  return key ? manifest[key]?.path : undefined;
};
export const competitionLogoFor = (code: string) => {
  const key = code as keyof typeof manifest;
  return manifest[key]?.path;
};
