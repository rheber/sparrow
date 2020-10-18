import {Tile, generateTileset, Rank, Suit} from "./tile";

class EmptyWall extends Error {};

type Meld = Sequence | Quad | Triple | Pair | Tile;

interface Sequence {
  high: Rank;
  suit: Suit;
}

interface Quad {
  tile: Tile;
}

interface Triple {
  tile: Tile;
}

interface Pair {
  tile: Tile;
}

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

class Subround {
  playerToAct: SeatNumber;
  seats: Seat[];
  tileset: Tile[];
  wall: Tile[];

  constructor() {
    this.tileset = generateTileset({ includeBonus: false });
    const tiles = Array.from(this.tileset);
    this.shuffle(tiles);
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
    this.playerToAct = 0;
    this.seats = [
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
    ];
    this.wall = tiles;
  }

  draw = () => {
    if (this.wall.length < 1) {
      throw new EmptyWall();
    }
    const drawnTile = this.wall[0];
    this.wall.shift();
    this.seatToAct().hand.concealed.push(drawnTile);
  };

  discard = (idx: number) => {
    const tileToDiscard = this.seatToAct().hand.concealed[idx];
    this.seatToAct().hand.concealed.splice(idx, 1);
    this.seatToAct().discardPile.push(tileToDiscard);
  }

  seatToAct = (): Seat => {
    return this.seats[this.playerToAct];
  };

  // Fisher-Yates in-place. https://stackoverflow.com/a/6274381
  private shuffle = (a: any[]) => {
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
  };
}

export { EmptyWall, Subround };
