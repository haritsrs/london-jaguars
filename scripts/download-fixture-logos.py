from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen
import json
import re

ROOT = Path(__file__).resolve().parents[1]
LOGO_DIR = ROOT / "public" / "club-logos"
COMPETITION_DIR = ROOT / "public" / "competition-logos"
LOGO_DIR.mkdir(parents=True, exist_ok=True)
COMPETITION_DIR.mkdir(parents=True, exist_ok=True)

teams = {
    "ac-milan": "AC Milan",
    "aek-athens": "AEK Athens",
    "athletic-bilbao": "Athletic Bilbao",
    "barcelona": "Barcelona",
    "borussia-monchengladbach": "Borussia Mönchengladbach",
    "bristol-city": "Bristol City",
    "coventry": "Coventry City",
    "fenerbahce": "Fenerbahçe",
    "inter-milan": "Inter Milan",
    "olympique-lyon": "Olympique Lyonnais",
    "psg": "Paris Saint-Germain",
    "rangers": "Rangers",
    "real-betis": "Real Betis",
    "villarreal": "Villarreal",
    "bournemouth": "AFC Bournemouth",
    "leeds": "Leeds United",
    "leicester": "Leicester City",
    "liverpool": "Liverpool",
    "man-city": "Manchester City",
    "manchester-united": "Manchester United",
    "newcastle": "Newcastle United",
    "nottingham-forest": "Nottingham Forest",
    "southampton": "Southampton",
    "spurs": "Tottenham Hotspur",
    "west-ham": "West Ham United",
}

premier_league_names = {
    "Arsenal": "arsenal",
    "Aston Villa": "aston-villa",
    "AFC Bournemouth": "bournemouth",
    "Brentford": "brentford",
    "Brighton and Hove Albion": "brighton",
    "Chelsea": "chelsea",
    "Crystal Palace": "crystal-palace",
    "Everton": "everton",
    "Leeds United": "leeds",
    "Leicester City": "leicester",
    "Liverpool": "liverpool",
    "Manchester City": "man-city",
    "Manchester United": "manchester-united",
    "Newcastle United": "newcastle",
    "Nottingham Forest": "nottingham-forest",
    "Southampton": "southampton",
    "Tottenham Hotspur": "spurs",
    "West Ham United": "west-ham",
}

fixed_team_ids = {
    "bournemouth": "134301",
    "psg": "133714",
}

def fetch_json(url):
    request = Request(url, headers={"User-Agent": "LondonJaguars/1.0"})
    with urlopen(request, timeout=30) as response:
        return json.load(response)

def download(url, destination):
    request = Request(url, headers={"User-Agent": "LondonJaguars/1.0"})
    with urlopen(request, timeout=30) as response:
        destination.write_bytes(response.read())

def search_team(name):
    payload = fetch_json(f"https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t={quote(name)}")
    candidates = payload.get("teams") or []
    if not candidates:
        raise RuntimeError(f"No crest found for {name}")
    return candidates[0]

def lookup_team(team_id):
    payload = fetch_json(f"https://www.thesportsdb.com/api/v1/json/123/lookupteam.php?id={team_id}")
    candidates = payload.get("teams") or []
    if not candidates:
        raise RuntimeError(f"No crest found for team id {team_id}")
    return candidates[0]

manifest = {}
premier_teams = fetch_json("https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=English_Premier_League").get("teams") or []
for team in premier_teams:
    slug = premier_league_names.get(team.get("strTeam"))
    if slug and team.get("strBadge"):
        destination = LOGO_DIR / f"{slug}.png"
        download(team["strBadge"], destination)
        manifest[slug] = {"name": team.get("strTeam"), "path": f"/club-logos/{destination.name}", "source": team["strBadge"]}

for slug, name in teams.items():
    team = lookup_team(fixed_team_ids[slug]) if slug in fixed_team_ids else search_team(name)
    if not team.get("strBadge"):
        raise RuntimeError(f"No badge URL found for {name}")
    destination = LOGO_DIR / f"{slug}.png"
    download(team["strBadge"], destination)
    manifest[slug] = {"name": team.get("strTeam", name), "path": f"/club-logos/{destination.name}", "source": team["strBadge"]}

competitions = {
    "EPL": ("English Premier League", "4328"),
    "UCL": ("UEFA Champions League", "4480"),
    "FA Community Shield": ("FA Community Shield", "4571"),
    "Super Cup": ("UEFA Super Cup", "4512"),
}
for code, (name, league_id) in competitions.items():
    league = (fetch_json(f"https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id={league_id}").get("leagues") or [{}])[0]
    slug = re.sub(r"[^a-z0-9]+", "-", code.lower()).strip("-")
    destination = COMPETITION_DIR / f"{slug}.png"
    download(league["strBadge"], destination)
    manifest[code] = {"name": name, "path": f"/competition-logos/{destination.name}", "source": league["strBadge"]}

(ROOT / "src" / "data" / "logoManifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"clubs": len([key for key in manifest if key not in competitions]), "competitions": len(competitions), "manifest": "src/data/logoManifest.json"}))
