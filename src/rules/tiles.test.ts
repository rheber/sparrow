import {generateTileset} from "./tiles";

describe("Tileset logic", () => {
  it("generates 136 tiles excluding bonuses", () => {
    const tiles = generateTileset({ includeBonus: false });
    expect(tiles).toHaveLength(136);
  });

  it("generates 144 tiles including bonuses", () => {
    const tiles = generateTileset({ includeBonus: true });
    expect(tiles).toHaveLength(144);
  });
});
