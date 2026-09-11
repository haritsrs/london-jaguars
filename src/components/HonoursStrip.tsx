import { Trophy } from "lucide-react";
import { honours } from "@/data/honours";

export function HonoursStrip() {
  return <div className="honours-strip">{honours.map((honour) => <div className="honour" key={honour.competition}><Trophy size={20} /><strong>{String(honour.count).padStart(2, "0")}</strong><span>{honour.competition}</span><small>{honour.latest}</small></div>)}</div>;
}
