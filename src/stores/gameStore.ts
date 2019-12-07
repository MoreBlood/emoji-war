import { observable, action, computed, toJS } from 'mobx';
import { randomInteger, yes } from '../helpers/math';
import { emoticons, skin, colorable } from '../helpers/emojis';
import { Pair } from '../types/pair';

export class GameStore {
  public gameSize = 2;

  @observable
  public firstPair: Pair = new Pair();

  @observable
  public secondPair: Pair = new Pair();

  @observable
  public scoreRight: number = 0;

  @observable
  public scoreWrong: number = 0;

  public constructor() {
    this.generate();
  }

  @action
  private generate(): void {
    const first: string[][] = [];
    const second: string[][] = [];
    for (let i = 0; i < this.gameSize; i += 1) {
      if (!Array.isArray(first[i])) {
        first[i] = [];
        second[i] = [];
      }
      for (let u = 0; u < this.gameSize; u += 1) {
        first[i][u] = GameStore.randomEmoji();
        second[i][u] = first[i][u];
      }
    }

    if (yes()) {
      const randomRow = randomInteger(0, this.gameSize);
      const randomColoumn = randomInteger(0, this.gameSize);

      second[randomRow][randomColoumn] = GameStore.randomEmoji();
    }

    this.firstPair = new Pair(first);
    this.secondPair = new Pair(second);
  }

  public static randomEmoji(): string {
    if (yes()) {
      return colorable[randomInteger(0, colorable.length)];
    } else {
      return emoticons[randomInteger(0, emoticons.length)];
    }
  }

  @action
  public voteForPairs(vote: boolean): void {
    if (this.comparePairs === vote) {
      this.scoreRight += 1;
    } else {
      this.scoreWrong += 1;
    }
    this.generate();
  }

  @computed
  public get comparePairs(): boolean {
    return this.firstPair.hash === this.secondPair.hash;
  }
}

export const store = new GameStore();
