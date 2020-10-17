import {generateTileset} from "./tiles";
import {deal} from "./deal";

describe("Dealing logic", () => {
  it("deals every tile to either the wall or the hands", () => {
    const tiles = generateTileset({ includeBonus: false });
    const subround = deal(tiles);
    const amtTilesAfterDeal =
      subround.wall.length +
      subround.seats[0].hand.concealed.length +
      subround.seats[1].hand.concealed.length +
      subround.seats[2].hand.concealed.length +
      subround.seats[3].hand.concealed.length;
    expect(amtTilesAfterDeal).toEqual(tiles.length);
  });
});
