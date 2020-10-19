import {Tile, TileValue, Rank, Suit} from "./tile";

type Meld = Sequence | Quad | Triple | Pair | TileValue;

export class Sequence {
  high: Rank;
  suit: Suit;

  constructor(high: Rank, suit: Suit) {
    this.high = high;
    this.suit = suit;
  }
}

class Quad {
  tile: TileValue;

  constructor(tile: TileValue) {
    this.tile = tile;
  }
}

export class Triple {
  tile: TileValue;

  constructor(tile: TileValue) {
    this.tile = tile;
  }
}

class Pair {
  tile: TileValue;

  constructor(tile: TileValue) {
    this.tile = tile;
  }
}

export interface Hand {
  loose: Tile[];
  concealedMelds: Meld[];
  exposedMelds: Meld[];
}
