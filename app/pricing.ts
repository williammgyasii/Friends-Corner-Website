const playUrl = "https://play.friendscorner.app";

export type PriceCard = {
  name: string;
  price: number;
  href: string;
  allowances: number[] | "unlimited" | null;
  color: string;
  edge: string;
  tagline: string;
  perks: string[];
};

const sharedPerk = "Friends on your link play free";

function allowanceLines(counts: number[] | "unlimited"): string[] {
  if (counts === "unlimited") {
    return allowanceNames.map((game) => `${game}: unlimited nights`);
  }
  return counts.map((count, index) => `${allowanceNames[index]}: ${count} nights/mo`);
}

export function pricingLook(): PriceCard[] {
  return [
    {
      name: "Free",
      price: 0,
      href: playUrl,
      allowances: null,
      color: "#5b8cff",
      edge: "#3d6fd4",
      tagline: "Open a room and send the link.",
      perks: [
        "A room for 2–4 people",
        "Camera and microphone",
        "Tic-tac-toe, chess, Letter Tiles, and Murder Mystery",
        "Easy or hard, together or race",
      ],
    },
    {
      name: "Corner",
      price: 15,
      href: `${playUrl}/?plan=corner`,
      allowances: [30, 8, 8, 4],
      color: "#5b8cff",
      edge: "#3d6fd4",
      tagline: "A cozy booth for close friends.",
      perks: [sharedPerk, ...allowanceLines([30, 8, 8, 4])],
    },
    {
      name: "Table",
      price: 20,
      href: `${playUrl}/?plan=table`,
      allowances: [90, 24, 24, 12],
      color: "#f0587f",
      edge: "#c73d62",
      tagline: "A bigger table for more game nights.",
      perks: [sharedPerk, ...allowanceLines([90, 24, 24, 12])],
    },
    {
      name: "House",
      price: 50,
      href: `${playUrl}/?plan=house`,
      allowances: "unlimited",
      color: "#d9a25f",
      edge: "#b8843f",
      tagline: "The whole arcade, no limits.",
      perks: [sharedPerk, ...allowanceLines("unlimited")],
    },
  ];
}

export const allowanceNames = ["Tic-tac-toe", "Chess", "Letter Tiles", "Murder Mystery"] as const;
