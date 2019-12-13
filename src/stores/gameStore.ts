import { observable, action, computed } from 'mobx';
import { randomInteger, yes } from '../helpers/math';
import {
  emoticons,
  skin,
  colorable,
  sadEmoticons,
  happyEmoticons,
  pewEmoticons,
  tarantinoEmoticons,
} from '../helpers/emojis';
import { Pair } from '../types/pair';
import { SettingsStore, GameModes } from './settingsStore';
import { ShopStore } from './shopStore';

export enum GameState {
  gameOver,
  pause,
  playing,
}

export class GameStore {
  private settingsStore: SettingsStore;
  private shopStore: ShopStore;

  public constructor(settingsStore: SettingsStore, shopStore: ShopStore) {
    this.settingsStore = settingsStore;
    this.shopStore = shopStore;
  }

  @observable
  public gameState: GameState = GameState.playing;

  @computed
  public get gameLifes(): number {
    const purchased = this.shopStore.storeItems.get('EXTRA_LIFE').bought;

    return purchased ? 4 : 3;
  }

  @observable
  public lifes: number;

  @observable
  public firstPair: Pair = new Pair();

  @observable
  public secondPair: Pair = new Pair();

  @observable
  public scoreRight: number = 0;

  @observable
  public scoreWrong: number = 0;

  @observable
  public timer: number = this.settingsStore.time;

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

  @computed
  public get isPlaying(): boolean {
    return this.gameState === GameState.playing;
  }

  @computed
  public get isPaused(): boolean {
    return this.gameState === GameState.pause;
  }

  @action
  private generate(): void {
    if (this.lifes === 0) {
      return this.stop();
    }
    const first: string[][] = [];
    const second: string[][] = [];
    for (let i = 0; i < this.settingsStore.gameSize; i += 1) {
      if (!Array.isArray(first[i])) {
        first[i] = [];
        second[i] = [];
      }
      for (let u = 0; u < this.settingsStore.gameSize; u += 1) {
        first[i][u] = this.randomEmoji();
        second[i][u] = first[i][u];
      }
    }

    if (yes()) {
      const randomRow = randomInteger(0, this.settingsStore.gameSize);
      const randomColoumn = randomInteger(0, this.settingsStore.gameSize);

      second[randomRow][randomColoumn] = this.randomEmoji();
    }

    this.firstPair = new Pair(first);
    this.secondPair = new Pair(second);
    this.skinColor = randomInteger(0, skin.length);
    this.timer = this.settingsStore.time;
    this.initTimer();
    this.gameState = GameState.playing;
  }

  public restart(): void {
    this.scoreWrong = 0;
    this.scoreRight = 0;
    this.lifes = this.gameLifes;
    this.generate();
  }

  public switchPause(): void {
    if (this.gameState === GameState.playing) {
      if (this.timerUpdater) {
        clearInterval(this.timerUpdater);
      }
      this.gameState = GameState.pause;
    } else if (this.gameState !== GameState.gameOver) {
      this.gameState = GameState.playing;
      this.decrease(); // anti-abuse pause super system
      this.initTimer();
    }
  }

  private stop(): void {
    this.gameState = GameState.gameOver;
    this.timer = 0;
    if (this.timerUpdater) {
      clearInterval(this.timerUpdater);
    }
  }

  public get randomEmoticon(): string {
    const emojis = this.settingsStore.LGBTFriendly ? emoticons : sadEmoticons;
    return emojis[randomInteger(0, emojis.length)];
  }

  public get randomSadOrHappyEmoticon(): string {
    const emojis = this.settingsStore.LGBTFriendly ? happyEmoticons : sadEmoticons;
    return emojis[randomInteger(0, emojis.length)];
  }

  private randomEmoji(): string {
    if (yes()) {
      return this.randomEmoticon;
    }
    switch (this.settingsStore.gameMode) {
      case GameModes.PEW_GAME_MODE:
        return pewEmoticons[randomInteger(0, pewEmoticons.length)];
      case GameModes.TARANTINO_GAME_MODE:
        return tarantinoEmoticons[randomInteger(0, tarantinoEmoticons.length)];
      default:
        return colorable[randomInteger(0, colorable.length)];
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

  private checkLogic(): void {
    if (this.scoreRight === 30 || this.scoreRight === 75) {
      this.settingsStore.switchGameSize();
      if (this.lifes < this.gameLifes) {
        this.lifes += 1;
      }
    }
  }

  @action
  public voteForPairs(vote: boolean): void {
    if (this.gameState !== GameState.playing) return;

    if (this.comparePairs === vote) {
      this.scoreRight += this.settingsStore.gameSize;
      this.shopStore.money += this.settingsStore.gameSize;
      this.settingsStore.highScore = this.scoreRight;
    } else {
      this.scoredWrong = 1;
    }
    this.checkLogic();
    this.generate();
  }

  @computed
  public get comparePairs(): boolean {
    return this.firstPair.hash === this.secondPair.hash;
  }
}
