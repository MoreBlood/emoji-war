import { observable, action, computed, toJS } from 'mobx';
import { randomInteger, yes } from '../helpers/math';
import { emoticons } from '../helpers/emojis';

export class GameStore {
  public gameSize = 2;

  @observable
  public firstPair: string[][] = [];

  @observable
  public secondPair: string[][] = [];

  @observable
  public score: number = 0;

  public constructor() {
    this.generate();
  }

  @action
  private generate(): void {
    for (let i = 0; i < this.gameSize; i += 1) {
      if (!Array.isArray(this.firstPair[i])) {
        this.firstPair[i] = [];
        this.secondPair[i] = [];
      }
      for (let u = 0; u < this.gameSize; u += 1) {
        this.firstPair[i][u] = GameStore.randomEmoji();
        this.secondPair[i][u] = this.firstPair[i][u];
      }
    }

    if (yes()) {
      const randomRow = randomInteger(0, this.gameSize);
      const randomColoumn = randomInteger(0, this.gameSize);

      this.secondPair[randomRow][randomColoumn] = GameStore.randomEmoji();
    }
  }

  public static randomEmoji(): string {
    return emoticons[randomInteger(0, emoticons.length)];
  }

  @action
  public voteForPairs(vote: boolean): void {
    if (this.comparePairs === vote) {
      this.score += 1;
    }
    this.generate();
  }

  @computed
  public get comparePairs(): boolean {
    for (let i = 0; i < this.gameSize; i += 1) {
      for (let u = 0; u < this.gameSize; u += 1) {
        if (this.firstPair[i][u] !== this.secondPair[i][u]) return false;
      }
    }

    return true;
  }
}

export const store = new GameStore();
