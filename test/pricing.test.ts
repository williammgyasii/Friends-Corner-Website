import assert from "node:assert/strict";
import { test } from "node:test";
import { pricingLook } from "../app/pricing.ts";

test("pricing links to the game and names the allowances", () => {
  const cards = pricingLook();

  assert.deepEqual(
    cards.map((card) => [card.name, card.price, card.href, card.allowances]),
    [
      ["Free", 0, "https://play.friendscorner.app", null],
      ["Corner", 15, "https://play.friendscorner.app/?plan=corner", [30, 8, 8, 4]],
      ["Table", 20, "https://play.friendscorner.app/?plan=table", [90, 24, 24, 12]],
      ["House", 50, "https://play.friendscorner.app/?plan=house", "unlimited"],
    ],
  );
  assert.equal(JSON.stringify(cards).includes("/billing"), false);
});
