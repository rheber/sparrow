export type Tile = Simple | Honor | Bonus;

interface Simple {
  rank: Rank;
  suit: Suit;
}

interface Honor {
  value: Dragon | Wind;
}

interface Bonus {
  value: Flower | Season;
}

type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type Suit = 'bam' | 'dot' | 'crc';

type Dragon = 'green' | 'red' | 'white';

type Wind = 'east' | 'south' | 'west' | 'north';

type Flower = 'plum' | 'orchid' | 'chrysanthemum' | 'bamboo';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type Meld = Sequence | Quad | Triple | Pair | Tile;

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

interface TilesetOptions {
  includeBonus: boolean;
}

const generateTileset = (options: TilesetOptions): Tile[] => {
  const bams = [
    ...Array(4).fill({ rank: 1, suit: 'bam' }),
    ...Array(4).fill({ rank: 2, suit: 'bam' }),
    ...Array(4).fill({ rank: 3, suit: 'bam' }),
    ...Array(4).fill({ rank: 4, suit: 'bam' }),
    ...Array(4).fill({ rank: 5, suit: 'bam' }),
    ...Array(4).fill({ rank: 6, suit: 'bam' }),
    ...Array(4).fill({ rank: 7, suit: 'bam' }),
    ...Array(4).fill({ rank: 8, suit: 'bam' }),
    ...Array(4).fill({ rank: 9, suit: 'bam' }),
  ];
  const crcs = [
    ...Array(4).fill({ rank: 1, suit: 'crc' }),
    ...Array(4).fill({ rank: 2, suit: 'crc' }),
    ...Array(4).fill({ rank: 3, suit: 'crc' }),
    ...Array(4).fill({ rank: 4, suit: 'crc' }),
    ...Array(4).fill({ rank: 5, suit: 'crc' }),
    ...Array(4).fill({ rank: 6, suit: 'crc' }),
    ...Array(4).fill({ rank: 7, suit: 'crc' }),
    ...Array(4).fill({ rank: 8, suit: 'crc' }),
    ...Array(4).fill({ rank: 9, suit: 'crc' }),
  ];
  const dots = [
    ...Array(4).fill({ rank: 1, suit: 'dot' }),
    ...Array(4).fill({ rank: 2, suit: 'dot' }),
    ...Array(4).fill({ rank: 3, suit: 'dot' }),
    ...Array(4).fill({ rank: 4, suit: 'dot' }),
    ...Array(4).fill({ rank: 5, suit: 'dot' }),
    ...Array(4).fill({ rank: 6, suit: 'dot' }),
    ...Array(4).fill({ rank: 7, suit: 'dot' }),
    ...Array(4).fill({ rank: 8, suit: 'dot' }),
    ...Array(4).fill({ rank: 9, suit: 'dot' }),
  ];
  const dragons = [
    ...Array(4).fill({ value: 'green' }),
    ...Array(4).fill({ value: 'red' }),
    ...Array(4).fill({ value: 'white' }),
  ];
  const winds = [
    ...Array(4).fill({ value: 'east' }),
    ...Array(4).fill({ value: 'south' }),
    ...Array(4).fill({ value: 'west' }),
    ...Array(4).fill({ value: 'north' }),
  ];
  const standardTileset = [
    ...bams,
    ...crcs,
    ...dots,
    ...dragons,
    ...winds,
  ];
  if (options.includeBonus) {
    const flowers = [
      { value: 'plum' },
      { value: 'orchid' },
      { value: 'chrysanthemum' },
      { value: 'bamboo' },
    ];
    const seasons = [
      { value: 'spring' },
      { value: 'summer' },
      { value: 'autumn' },
      { value: 'winter' },
    ];
    return [
      ...standardTileset,
      ...flowers,
      ...seasons,
    ];
  }
  return standardTileset;
}

export { generateTileset };