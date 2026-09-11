import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const sourcePath = "D:/Downloads/London_Jaguars_AI_Readable_Master_With_Schedule.xlsx";
const outputDir = "D:/Code Projects 2026/london-jaguars/outputs/past-players";
const publicDir = "D:/Code Projects 2026/london-jaguars/public/data";
const fileName = "London_Jaguars_Past_Players.xlsx";

const source = await FileBlob.load(sourcePath);
const sourceWorkbook = await SpreadsheetFile.importXlsx(source);
const values = sourceWorkbook.worksheets.getItem("Player_Seasons").getUsedRange().values;
const headers = values[0].map((value) => String(value ?? ""));
const index = Object.fromEntries(headers.map((header, position) => [header, position]));
const rows = values.slice(1).filter((row) => row[index.Season]);

const clean = (value) => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const slugify = (value) => clean(value).replace(/(^-|-$)/g, "");
const currentKeys = new Set(rows.filter((row) => row[index.Season] === "2028/29").map((row) => clean(row[index.Player])));
const historical = new Map();

for (const row of rows) {
  const key = clean(row[index.Player]);
  if (row[index.Season] === "2028/29" || currentKeys.has(key)) continue;
  const season = String(row[index.Season]);
  const existing = historical.get(key) ?? {
    player: String(row[index.Player]),
    firstSeason: season,
    lastSeason: season,
    positions: new Set(),
    seasons: new Set(),
    appearances: 0,
    goals: 0,
    assists: 0,
    cleanSheets: 0,
    latestRole: String(row[index.Role] ?? "") || "Historical squad member",
  };
  existing.firstSeason = existing.firstSeason < season ? existing.firstSeason : season;
  existing.lastSeason = existing.lastSeason > season ? existing.lastSeason : season;
  existing.positions.add(String(row[index.Position] ?? ""));
  existing.seasons.add(season);
  existing.appearances += Number(row[index.Apps] ?? 0);
  existing.goals += Number(row[index.Goals] ?? 0);
  existing.assists += Number(row[index.Assists] ?? 0);
  existing.cleanSheets += Number(row[index["Clean Sheets"]] ?? 0);
  existing.latestRole = String(row[index.Role] ?? existing.latestRole) || existing.latestRole;
  historical.set(key, existing);
}

const outputRows = Array.from(historical.values()).sort((a, b) => a.player.localeCompare(b.player)).map((player) => [
  player.player,
  player.firstSeason,
  player.lastSeason,
  Array.from(player.positions).join(", "),
  Array.from(player.seasons).sort().join(", "),
  player.appearances,
  player.goals,
  player.assists,
  player.cleanSheets,
  player.latestRole,
  `/players/past/${slugify(player.player)}.png`,
]);

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Past Players");
sheet.showGridLines = false;
sheet.tabColor = "#0F4032";
sheet.getRange("A1").values = [["London Jaguars · Past Players"]];
sheet.getRange("A2").values = [["Derived from Player_Seasons in London_Jaguars_AI_Readable_Master_With_Schedule.xlsx. 2028/29 current-squad names were excluded after normalized-name comparison."]];
sheet.getRange("A4:K4").values = [["Player", "First recorded season", "Last recorded season", "Position(s)", "Seasons recorded", "Appearances", "Goals", "Assists", "Clean sheets", "Latest recorded role", "Portrait slot"]];
sheet.getRange(`A5:K${outputRows.length + 4}`).values = outputRows;
sheet.getRange(`A1:K${outputRows.length + 4}`).format.font = { name: "Arial", size: 10, color: "#071612" };
sheet.getRange("A1").format.font = { name: "Arial", size: 16, bold: true, color: "#0F4032" };
sheet.getRange("A2").format.font = { name: "Arial", size: 9, italic: true, color: "#68736D" };
sheet.getRange("A4:K4").format = { fill: "#0F4032", font: { name: "Arial", size: 10, bold: true, color: "#FFFFFF" }, verticalAlignment: "center", wrapText: false };
sheet.getRange(`A5:K${outputRows.length + 4}`).format.verticalAlignment = "center";
sheet.getRange(`F5:I${outputRows.length + 4}`).format.numberFormat = "#,##0";
sheet.getRange("A1:K1").format.rowHeight = 28;
sheet.getRange("A2:K2").format.rowHeight = 25;
sheet.getRange("A4:K4").format.rowHeight = 30;
sheet.getRange(`A1:K${outputRows.length + 4}`).format.autofitColumns();
sheet.getRange("A:A").format.columnWidth = 24;
sheet.getRange("B:C").format.columnWidth = 19;
sheet.getRange("D:E").format.columnWidth = 18;
sheet.getRange("F:I").format.columnWidth = 13;
sheet.getRange("J:J").format.columnWidth = 22;
sheet.getRange("K:K").format.columnWidth = 34;
sheet.freezePanes.freezeRows(4);
const table = sheet.tables.add(`A4:K${outputRows.length + 4}`, true, "PastPlayersTable");
table.style = "TableStyleMedium2";
table.showFilterButton = true;

workbook.recalculate();
const check = await workbook.inspect({ kind: "table", sheetId: "Past Players", range: `A1:K${Math.min(outputRows.length + 4, 10)}`, include: "values,formulas", tableMaxRows: 10, tableMaxCols: 11, maxChars: 6000 });
console.log(check.ndjson);
const preview = await workbook.render({ sheetName: "Past Players", range: `A1:K${Math.min(outputRows.length + 4, 18)}`, scale: 1, format: "png" });
await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(publicDir, { recursive: true });
await fs.writeFile(`${outputDir}/past-players-preview.png`, new Uint8Array(await preview.arrayBuffer()));
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/${fileName}`);
await fs.copyFile(`${outputDir}/${fileName}`, `${publicDir}/${fileName}`);
console.log(JSON.stringify({ pastPlayers: outputRows.length, output: `${outputDir}/${fileName}`, publicCopy: `${publicDir}/${fileName}` }));
