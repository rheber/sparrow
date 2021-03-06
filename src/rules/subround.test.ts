import {Subround, EmptyWall} from "./subround";

describe("Subround logic", () => {
  it("deals every tile to either the wall or the hands", () => {
    const subround = new Subround();
    const amtTilesAfterDeal =
      subround.wall.length +
      subround.seats[0].hand.loose.length +
      subround.seats[1].hand.loose.length +
      subround.seats[2].hand.loose.length +
      subround.seats[3].hand.loose.length;
    expect(amtTilesAfterDeal).toEqual(subround.tileset.length);
  });

  it("decrements the size the wall after drawing a tile", () => {
    const subround = new Subround();
    const wallSizeBeforeDraw = subround.wall.length;
    subround.draw();
    expect(subround.wall).toHaveLength(wallSizeBeforeDraw - 1);
  });

  it("increments the size of the player to act's hand after drawing a tile", () => {
    const subround = new Subround();
    const handSizeBeforeDraw = subround.seats[subround.playerToAct].hand.loose.length;
    subround.draw();
    expect(
      subround.seatToAct().hand.loose
    ).toHaveLength(handSizeBeforeDraw + 1);
  });

  it("decrements the size of the player to act's hand after discarding", () => {
    const subround = new Subround();
    const handSizeBeforeDiscard = subround.seatToAct().hand.loose.length;
    subround.discard(0);
    expect(
      subround.seatToAct().hand.loose
    ).toHaveLength(handSizeBeforeDiscard - 1);
  });

  it("increments the size of the player to act's discard pile after discarding", () => {
    const subround = new Subround();
    const discardPileSizeBeforeDiscard = subround.seatToAct().discardPile.length;
    subround.discard(0);
    expect(
      subround.seatToAct().discardPile
    ).toHaveLength(discardPileSizeBeforeDiscard + 1);
  });

  it("changes the player to act after no claim", () => {
    const subround = new Subround();
    const playerToActBeforeNoClaim = subround.playerToAct;
    subround.noClaim();
    expect(subround.playerToAct).not.toEqual(playerToActBeforeNoClaim);
  });

  it("reverts to the original player to act after four consecutive no-claims", () => {
    const subround = new Subround();
    const playerToActBeforeNoClaim = subround.playerToAct;
    subround.noClaim();
    subround.noClaim();
    subround.noClaim();
    subround.noClaim();
    expect(subround.playerToAct).toEqual(playerToActBeforeNoClaim);
  });

  it("cannot draw from empty wall", () => {
    const subround = new Subround();
    subround.wall = [];
    expect(() => {
      subround.draw();
    }).toThrow(EmptyWall);
  });
});
