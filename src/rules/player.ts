import { SeatNumber } from './deal';

export interface Player {
  name: string;
  id: SeatNumber;
  score: number;
}

class GreedyAiPlayer implements Player {
  name: string;
  id: SeatNumber;
  score: number;

  constructor(name: string, id: SeatNumber) {
    this.name = name;
    this.id = id;
    this.score = 0;
  }
}

export { GreedyAiPlayer };
