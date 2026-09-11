"use client";

import Image from "next/image";
import { useState } from "react";

type PlayerVisualProps = {
  imageKey: string;
  initials: string;
  name: string;
  className?: string;
  priority?: boolean;
};

export function PlayerVisual({ imageKey, initials, name, className = "", priority = false }: PlayerVisualProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return <>
    {!imageFailed ? <Image className={className} src={`/players/${imageKey}.png`} alt={`${name} portrait`} fill sizes="(max-width: 760px) 50vw, 25vw" priority={priority} onError={() => setImageFailed(true)} /> : null}
    <span className={`player-visual__fallback ${imageFailed ? "is-visible" : ""}`} aria-hidden="true">{initials}</span>
  </>;
}
