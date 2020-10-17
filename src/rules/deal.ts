import {Tile, Meld} from "./tiles";

export interface Hand {
  concealed: Tile[];
  exposed: Meld[];
}

export type DiscardPile = Tile[];

export interface Player {
  name: string;
  id: number;
}

export interface Subround {
  discardPiles: DiscardPile[];
  hands: Hand[];
  wall: Tile[];
}

/*
interface Match {
  players: Player[];
  subround: Subround;
}

const match: Match = {
  players: [],
  subround: {
    discardPiles: [],
    hands: [],
    wall: [],
  },
};
*/

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
    discardPiles: [[], [], [], []],
    hands: [hand1, hand2, hand3, hand4],
    wall: tiles,
  };
}

export { deal };
