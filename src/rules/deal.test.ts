import {generateTileset} from "./tiles";
import {deal} from "./deal";

describe("Dealing logic", () => {
  it("deals every tile to either the wall or the hands", () => {
    const tiles = generateTileset({ includeBonus: false });
    const subround = deal(tiles);
    const amtTilesAfterDeal =
      subround.wall.length +
      subround.hands[0].concealed.length +
      subround.hands[1].concealed.length +
      subround.hands[2].concealed.length +
      subround.hands[3].concealed.length;
    expect(amtTilesAfterDeal).toEqual(tiles.length);
  });
});
