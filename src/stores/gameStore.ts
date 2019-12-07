import { observable, action, computed, toJS } from 'mobx';
import { randomInteger, yes } from '../helpers/math';
import { emoticons, skin, colorable } from '../helpers/emojis';
import { Pair } from '../types/pair';

export class GameStore {
  public gameSize = 2;
  private time = 3 * this.gameSize;

  @observable
  public firstPair: Pair = new Pair();

  @observable
  public secondPair: Pair = new Pair();

  @observable
  public scoreRight: number = 0;

  @observable
  public scoreWrong: number = 0;

  @observable
  public timer: number = this.time;

  @observable
  public skinColor: number = 0;

  private timerUpdater: NodeJS.Timeout = null;

  public constructor() {
    this.generate();
  }

  @action
  private decrease(): void {
    this.timer -= 1;
    if (this.timer === 0) {
      this.generate();
      this.scoredWrong += 1;
    }
  }

  private initTimer(): void {
    if (this.timerUpdater) {
      clearInterval(this.timerUpdater);
    }
    this.timerUpdater = setInterval(() => this.decrease(), 1000);
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
    this.skinColor = randomInteger(0, skin.length);
    this.timer = this.time;
    this.initTimer();
  }

  public static randomEmoji(): string {
    if (yes()) {
      return colorable[randomInteger(0, colorable.length)];
    } else {
      return emoticons[randomInteger(0, emoticons.length)];
    }
  }

  private set scoredWrong(value: number) {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(200);
    }

    this.scoreWrong = value;
  }

  private get scoredWrong(): number {
    return this.scoreWrong;
  }

  @action
  public voteForPairs(vote: boolean): void {
    if (this.comparePairs === vote) {
      this.scoreRight += 1;
    } else {
      this.scoredWrong += 1;
    }
    this.generate();
  }

  @computed
  public get comparePairs(): boolean {
    return this.firstPair.hash === this.secondPair.hash;
  }
}

export const store = new GameStore();
