import { observable, action, computed, toJS } from 'mobx';
import { randomInteger, yes } from '../helpers/math';
import { emoticons, skin, colorable, sadEmoticons, happyEmoticons, numberToEmojiString } from '../helpers/emojis';
import { Pair } from '../types/pair';
import { SavedSettingProperty } from '../helpers/localStorage';

export enum GameState {
  gameOver,
  pause,
  playing,
}

export class GameStore {
  private gameSizes = [2, 3, 4];
  private _gameSize = new SavedSettingProperty('gameSize', 2, 'number');

  @computed
  public get gameSize(): number {
    const { value } = this._gameSize;
    return value as number;
  }

  public set gameSize(value: number) {
    this._gameSize.value = value;
  }

  @observable
  public gameState: GameState = GameState.playing;

  @observable
  public gameLifes = 3;

  @computed
  private get time(): number {
    return 2 * this.gameSize + 1;
  }

  @observable
  public lifes: number = this.gameLifes;

  private _LGBTFriendly = new SavedSettingProperty('LGBTFriendly', true, 'bool');

  @computed
  public get LGBTFriendly(): boolean {
    const { value } = this._LGBTFriendly;
    return value as boolean;
  }

  public set LGBTFriendly(value: boolean) {
    this._LGBTFriendly.value = value;
  }

  private _swipesDisabled = new SavedSettingProperty('swipesDisabled', false, 'bool');

  @computed
  public get swipesDisabled(): boolean {
    const { value } = this._swipesDisabled;
    return value as boolean;
  }

  public set swipesDisabled(value: boolean) {
    this._swipesDisabled.value = value;
  }

  private _highScore = new SavedSettingProperty('highScore', 0, 'number');

  @computed
  public get highScore(): number {
    const { value } = this._highScore;
    return value as number;
  }

  public set highScore(value: number) {
    if (value > this._highScore.value) {
      this._highScore.value = value;
    }
  }

  @computed
  public get gameSizeEmoji(): string {
    return numberToEmojiString(this.gameSize).join('');
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

  public switchSwipesDisabled(): void {
    this.swipesDisabled = !this.swipesDisabled;
  }

  @computed
  public get isPlaying(): boolean {
    return this.gameState === GameState.playing;
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
        first[i][u] = this.randomEmoji();
        second[i][u] = first[i][u];
      }
    }

    if (yes()) {
      const randomRow = randomInteger(0, this.gameSize);
      const randomColoumn = randomInteger(0, this.gameSize);

      second[randomRow][randomColoumn] = this.randomEmoji();
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

  @action
  public switchGameMode(): void {
    const currentGameSizeIndex = this.gameSizes.indexOf(this.gameSize);
    const nextGameSize = (currentGameSizeIndex + 1) % this.gameSizes.length;
    this.gameSize = this.gameSizes[nextGameSize];
    this.restart();
  }

  private stop(): void {
    if (this.timerUpdater) {
      clearInterval(this.timerUpdater);
      this.timer = 0;
    }
    this.gameState = GameState.gameOver;
  }

  public get randomEmoticon(): string {
    const emojis = this.LGBTFriendly ? emoticons : sadEmoticons;
    return emojis[randomInteger(0, emojis.length)];
  }

  public get randomSadOrHappyEmoticon(): string {
    const emojis = this.LGBTFriendly ? happyEmoticons : sadEmoticons;
    return emojis[randomInteger(0, emojis.length)];
  }

  private randomEmoji(): string {
    if (yes()) {
      return colorable[randomInteger(0, colorable.length)];
    } else {
      return this.randomEmoticon;
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
    if (this.gameState !== GameState.playing) return;

    if (this.comparePairs === vote) {
      this.scoreRight += this.gameSize;
      this.highScore = this.scoreRight;
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
