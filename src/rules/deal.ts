import {Tile, Meld} from "./tiles";

class EmptyWall extends Error {};

export interface Hand {
  concealed: Tile[];
  exposed: Meld[];
}

export type DiscardPile = Tile[];

export interface Seat {
  discardPile: DiscardPile;
  hand: Hand;
}

export type SeatNumber = 0 | 1 | 2 | 3;

export interface Subround {
  playerToAct: SeatNumber;
  seats: Seat[];
  wall: Tile[];
}

const deal = (tileset: Tile[]): Subround => {
  // Fisher-Yates in-place. https://stackoverflow.com/a/6274381
  const shuffle = (a: any[]) => {
    let j: number;
    let x: any;
    let i: number;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

  const tiles = Array.from(tileset);
  shuffle(tiles);
  const hand1 = {
    concealed: tiles.splice(0, 13),
    exposed: [],
  }
  const hand2 = {
    concealed: tiles.splice(0, 13),
    exposed: [],
  }
  const hand3 = {
    concealed: tiles.splice(0, 13),
    exposed: [],
  }
  const hand4 = {
    concealed: tiles.splice(0, 13),
    exposed: [],
  }
  return {
    playerToAct: 0,
    seats: [
      {
        discardPile: [],
        hand: hand1,
      },
      {
        discardPile: [],
        hand: hand2,
      },
      {
        discardPile: [],
        hand: hand3,
      },
      {
        discardPile: [],
        hand: hand4,
      },
    ],
    wall: tiles,
  };
}

const draw = (subround: Subround) => {
  if (subround.wall.length < 1) {
    throw new EmptyWall();
  }
  const drawnTile = subround.wall[0];
  subround.wall.shift();
  subround.seats[subround.playerToAct].hand.concealed.push(drawnTile);
}

export { deal, draw, EmptyWall };
