import {generateTileset} from "./tiles";
import {deal, draw} from "./deal";

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

  it("decrements the size the wall after drawing a tile", () => {
    const tiles = generateTileset({ includeBonus: false });
    const subround = deal(tiles);
    const wallSizeBeforeDraw = subround.wall.length;
    draw(subround);
    expect(subround.wall).toHaveLength(wallSizeBeforeDraw - 1);
  });

  it("increments the size of the player to act's hand after drawing a tile", () => {
    const tiles = generateTileset({ includeBonus: false });
    const subround = deal(tiles);
    const handSizeBeforeDraw = subround.seats[subround.playerToAct].hand.concealed.length;
    draw(subround);
    expect(
      subround.seats[subround.playerToAct].hand.concealed
    ).toHaveLength(handSizeBeforeDraw + 1);
  });
});
