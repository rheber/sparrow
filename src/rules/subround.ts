import {Tile, generateTileset, Rank, isSimple} from "./tile";
import { Hand, Sequence, Triple } from './hand';
import { deleteFirstWhere } from '../util/array';

class EmptyWall extends Error {};
class Impossibility extends Error {};

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
      loose: tiles.splice(0, 13),
      concealedMelds: [],
      exposedMelds: [],
    }
    const hand2 = {
      loose: tiles.splice(0, 13),
      concealedMelds: [],
      exposedMelds: [],
    }
    const hand3 = {
      loose: tiles.splice(0, 13),
      concealedMelds: [],
      exposedMelds: [],
    }
    const hand4 = {
      loose: tiles.splice(0, 13),
      concealedMelds: [],
      exposedMelds: [],
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
    this.seatToAct().hand.loose.push(drawnTile);
  };

  discard = (idx: number) => {
    const tileToDiscard = this.seatToAct().hand.loose[idx];
    this.seatToAct().hand.loose.splice(idx, 1);
    this.seatToAct().discardPile.push(tileToDiscard);
  }

  noClaim = () => {
    this.playerToAct = ((this.playerToAct + 1) % 4) as SeatNumber;
  };

  claimSequence = (claimant: SeatNumber, highRank: Rank) => {
    const lastDiscardTile = this.seatToAct().discardPile.reverse()[0];
    const lastDiscard = lastDiscardTile.value;
    this.playerToAct = claimant;
    if (!lastDiscard || !isSimple(lastDiscard)) {
      throw new Impossibility();
    }
    lastDiscardTile.claimed = true;
    const suit = lastDiscard.suit;
    const rank = lastDiscard.rank;
    if (rank === highRank) {
      deleteFirstWhere(
        this.seatToAct().hand.loose,
        tile => tile.value === { rank: highRank - 1 as Rank, suit }
      );
      deleteFirstWhere(
        this.seatToAct().hand.loose,
        tile => tile.value === { rank: highRank - 2 as Rank, suit }
      );
    } else if (rank === highRank - 1) {
      deleteFirstWhere(
        this.seatToAct().hand.loose,
        tile => tile.value === lastDiscard
      );
      deleteFirstWhere(
        this.seatToAct().hand.loose,
        tile => tile.value === { rank: highRank - 2 as Rank, suit }
      );
    } else {
      deleteFirstWhere(
        this.seatToAct().hand.loose,
        tile => tile.value === lastDiscard
      );
      deleteFirstWhere(
        this.seatToAct().hand.loose,
        tile => tile.value === { rank: highRank - 1 as Rank, suit }
      );
    }
    this.seatToAct().hand.exposedMelds.push(new Sequence(highRank, suit));
  }

  claimTriple = (claimant: SeatNumber) => {
    const lastDiscardTile = this.seatToAct().discardPile.reverse()[0];
    const lastDiscard = lastDiscardTile.value
    if (!lastDiscard) {
      throw new Impossibility();
    }
    lastDiscardTile.claimed = true;
    this.playerToAct = claimant;
    deleteFirstWhere(
      this.seatToAct().hand.loose,
      tile => tile.value === lastDiscard
    );
    deleteFirstWhere(
      this.seatToAct().hand.loose,
      tile => tile.value === lastDiscard
    );
    this.seatToAct().hand.exposedMelds.push(new Triple(lastDiscard));
  }

  seatToAct = (): Seat => {
    return this.seats[this.playerToAct];
  };

  // Fisher-Yates in-place. https://stackoverflow.com/a/6274381
  private shuffle = <T>(a: T[]) => {
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
