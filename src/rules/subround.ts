import {Tile, generateTileset, Rank, Suit, isSimple} from "./tile";

class EmptyWall extends Error {};
class Impossibility extends Error {};

type Meld = Sequence | Quad | Triple | Pair | Tile;

class Sequence {
  high: Rank;
  suit: Suit;

  constructor(high: Rank, suit: Suit) {
    this.high = high;
    this.suit = suit;
  }
}

class Quad {
  tile: Tile;

  constructor(tile: Tile) {
    this.tile = tile;
  }
}

class Triple {
  tile: Tile;

  constructor(tile: Tile) {
    this.tile = tile;
  }
}

class Pair {
  tile: Tile;

  constructor(tile: Tile) {
    this.tile = tile;
  }
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

  noClaim = () => {
    this.playerToAct = ((this.playerToAct + 1) % 4) as SeatNumber;
  };

  claimSequence = (claimant: SeatNumber, highRank: Rank) => {
    const lastDiscard = this.seatToAct().discardPile.pop();
    this.playerToAct = claimant;
    if (!lastDiscard || !isSimple(lastDiscard)) {
      throw new Impossibility();
    }
    const suit = lastDiscard.suit;
    if (lastDiscard.rank === highRank) {
      const idxFirstMatch = this.seatToAct().hand.concealed.indexOf(
        { rank: highRank - 1 as Rank, suit }
      );
      this.seatToAct().hand.concealed.splice(idxFirstMatch, 1);
      const idxSecondMatch = this.seatToAct().hand.concealed.indexOf(
        { rank: highRank - 2 as Rank, suit }
      );
      this.seatToAct().hand.concealed.splice(idxSecondMatch, 1);
    } else if (lastDiscard.rank === highRank - 1) {
      const idxFirstMatch = this.seatToAct().hand.concealed.indexOf(lastDiscard);
      this.seatToAct().hand.concealed.splice(idxFirstMatch, 1);
      const idxSecondMatch = this.seatToAct().hand.concealed.indexOf(
        { rank: highRank - 2 as Rank, suit }
      );
      this.seatToAct().hand.concealed.splice(idxSecondMatch, 1);
    } else {
      const idxFirstMatch = this.seatToAct().hand.concealed.indexOf(lastDiscard);
      this.seatToAct().hand.concealed.splice(idxFirstMatch, 1);
      const idxSecondMatch = this.seatToAct().hand.concealed.indexOf(
        { rank: highRank - 1 as Rank, suit }
      );
      this.seatToAct().hand.concealed.splice(idxSecondMatch, 1);
    }
    this.seatToAct().hand.exposed.push(new Sequence(highRank, suit));
  }

  claimTriple = (claimant: SeatNumber) => {
    const lastDiscard = this.seatToAct().discardPile.pop();
    if (!lastDiscard) {
      throw new Impossibility();
    }
    this.playerToAct = claimant;
    const idxFirstMatch = this.seatToAct().hand.concealed.indexOf(lastDiscard);
    this.seatToAct().hand.concealed.splice(idxFirstMatch, 1);
    const idxSecondMatch = this.seatToAct().hand.concealed.indexOf(lastDiscard);
    this.seatToAct().hand.concealed.splice(idxSecondMatch, 1);
    this.seatToAct().hand.exposed.push(new Triple(lastDiscard));
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
