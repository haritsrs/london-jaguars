import { clubProfile } from "@/data/club";

export const coachingStaff = [
  {
    kind: "manager",
    name: clubProfile.manager.name,
    role: clubProfile.manager.role,
    image: clubProfile.manager.image,
    imageAlt: clubProfile.manager.imageAlt,
    description: clubProfile.manager.description,
  },
  {
    kind: "coach",
    name: "Daniel Mercer",
    role: "Assistant coach · Defensive unit",
    description: "Mercer works with Shanahan on the team’s out-of-possession structure, building the distances and pressing cues that keep the Jaguars compact without losing their edge.",
  },
  {
    kind: "coach",
    name: "Rafael Costa",
    role: "Assistant coach · Attacking unit",
    description: "Costa leads the attacking detail on the training ground, from rotations in the half-spaces to the final pass that turns control into chances.",
  },
  {
    kind: "coach",
    name: "Maya Bennett",
    role: "First-team coach",
    description: "Bennett links the training plan to the demands of the matchday squad, preparing players to step into the team with clarity and responsibility.",
  },
  {
    kind: "coach",
    name: "Jonas Pettersson",
    role: "Goalkeeping coach",
    description: "Pettersson works with the goalkeepers on their starting position, distribution and command of the penalty area.",
  },
];
