import { observable, action, computed, toJS } from 'mobx';
import { randomInteger, yes } from '../helpers/math';
import { emoticons, skin, colorable } from '../helpers/emojis';
import { Pair } from '../types/pair';

export enum GameState {
  gameOver,
  pause,
  playing,
}

export class GameStore {
  @observable
  public gameSize = 2;

  @observable
  public gameState: GameState = GameState.playing;

  @observable
  public gameLifes = 3;

  @computed
  private get time(): number {
    return 2 * this.gameSize;
  }

  @observable
  public lifes: number = this.gameLifes;

  @observable
  public LGBTFriendly = true;

  @computed
  public get gameSizeEmoji(): string {
    switch (this.gameSize) {
      case 2:
        return '2️⃣';
      case 3:
        return '3️⃣';
      default:
        return '';
    }
  }

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

  @action
  private decrease(): void {
    this.timer -= 1;
    if (this.timer < 0) {
      this.scoredWrong = 1;
      this.generate();
    }
  }

  private initTimer(): void {
    if (this.timerUpdater) {
      clearInterval(this.timerUpdater);
    }
    this.timerUpdater = setInterval(() => this.decrease(), 1000);
  }

  public switchLGBTFriendly(): void {
    this.LGBTFriendly = !this.LGBTFriendly;
  }

  @action
  private generate(): void {
    if (this.lifes === 0) {
      return this.stop();
    }
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
    this.gameState = GameState.playing;
  }

  public restart(): void {
    this.scoreWrong = 0;
    this.scoreRight = 0;
    this.lifes = this.gameLifes;
    this.generate();
  }

  public switchGameMode(): void {
    if (this.gameSize === 2) {
      this.gameSize = 3;
    } else {
      this.gameSize = 2;
    }
    this.restart();
  }

  private stop(): void {
    if (this.timerUpdater) {
      clearInterval(this.timerUpdater);
      this.timer = 0;
    }
    this.gameState = GameState.gameOver;
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

    if (this.lifes > 0) {
      this.lifes -= value;
    }
  }

  @action
  public voteForPairs(vote: boolean): void {
    if (this.comparePairs === vote) {
      this.scoreRight += this.gameSize;
    } else {
      this.scoredWrong = 1;
    }
    this.generate();
  }

  @computed
  public get comparePairs(): boolean {
    return this.firstPair.hash === this.secondPair.hash;
  }
}

export const store = new GameStore();
