import { observable, action, computed, toJS, ObservableMap } from 'mobx';
import { randomInteger, yes } from '../helpers/math';
import {
  emoticons,
  skin,
  colorable,
  sadEmoticons,
  happyEmoticons,
  numberToEmojiString,
  pewEmoticons,
  tarantinoEmoticons,
} from '../helpers/emojis';
import { Pair } from '../types/pair';
import { SavedSettingProperty } from '../helpers/localStorage';
import { StoreItem } from '../types/storeItem';
import { inGameStoreItems } from './data/inGameStoreItems';

export enum GameState {
  gameOver,
  pause,
  playing,
}

export enum GameModes {
  REGULAR_GAME_MODE,
  TARANTINO_GAME_MODE,
  PEW_GAME_MODE,
}

export class GameStore {
  private gameSizes = [2, 3, 4];
  private gameModes = Object.keys(GameModes);

  private _gameSize = new SavedSettingProperty('gameSize', 2, 'number');

  @computed
  public get gameSize(): number {
    const { value } = this._gameSize;
    return value as number;
  }

  public set gameSize(value: number) {
    this._gameSize.value = value;
  }

  private _gameMode = new SavedSettingProperty('gameMode', GameModes.REGULAR_GAME_MODE, 'number');

  @computed
  public get gameMode(): GameModes {
    const { value } = this._gameMode;
    return value as number;
  }

  public set gameMode(value: GameModes) {
    this._gameMode.value = value;
  }

  @computed
  public get gameModeItem(): StoreItem {
    const { value } = this._gameMode;
    const item = this.storeItems.get(GameModes[value as number]);
    return item;
  }

  @observable
  public gameState: GameState = GameState.playing;

  @computed
  public get gameLifes(): number {
    const purchased = this.storeItems.get('EXTRA_LIFE').bought;

    return purchased ? 4 : 3;
  }

  @computed
  private get time(): number {
    return 2 * this.gameSize + 1;
  }

  @observable
  public lifes: number;

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

  public constructor() {
    this.initStore();
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

  @observable
  public storeItems: Map<string, StoreItem> = new Map();

  private _boughtItems = new SavedSettingProperty('boughtItems', [], 'array');

  @computed
  public get boughtItems(): string[] {
    const { value } = this._boughtItems;
    return value as string[];
  }

  public set boughtItems(value: string[]) {
    console.log(value);
    this._boughtItems.value = value;
  }

  private _money = new SavedSettingProperty('money', 20, 'number');

  @computed
  public get money(): number {
    const { value } = this._money;
    return value as number;
  }

  public set money(value: number) {
    this._money.value = value;
  }

  @action
  public initStore(): void {
    inGameStoreItems.forEach(item => {
      this.storeItems.set(item.id, item);
    });

    this.boughtItems.forEach(item => {
      this.storeItems.get(item).bought = true;
    });
  }

  @action
  public buyItem(id: string): void {
    const item = this.storeItems.get(id);
    if (item && this.money >= item.price && !item.bought) {
      item.bought = true;
      this.money -= item.price;
      const newBought = [...this.boughtItems, id];
      this.boughtItems = newBought;
    }
  }

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

  @action
  public switchGameSize(): void {
    const currentGameSizeIndex = this.gameSizes.indexOf(this.gameSize);
    const nextGameSize = (currentGameSizeIndex + 1) % this.gameSizes.length;
    this.gameSize = this.gameSizes[nextGameSize];
    this.restart();
  }

  @action
  public switchGameMode(): void {
    const avaible = [GameModes.REGULAR_GAME_MODE];

    if (this.storeItems.get('TARANTINO_GAME_MODE').bought) {
      avaible.push(GameModes.TARANTINO_GAME_MODE);
    }
    if (this.storeItems.get('PEW_GAME_MODE').bought) {
      avaible.push(GameModes.PEW_GAME_MODE);
    }
    const currentGameSizeIndex = avaible.indexOf(this.gameMode);
    const nextGameSize = (currentGameSizeIndex + 1) % avaible.length;
    this.gameMode = avaible[nextGameSize];
    this.restart();
  }

  private stop(): void {
    this.gameState = GameState.gameOver;
    this.timer = 0;
    if (this.timerUpdater) {
      clearInterval(this.timerUpdater);
    }
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
      return this.randomEmoticon;
    }
    switch (this.gameMode) {
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

  @action
  public voteForPairs(vote: boolean): void {
    if (this.gameState !== GameState.playing) return;

    if (this.comparePairs === vote) {
      this.scoreRight += this.gameSize;
      this.highScore = this.scoreRight;
      this.money += 1;
    } else {
      this.scoredWrong = 1;
    }
    this.generate();
  }

  @computed
  public get comparePairs(): boolean {
    return this.firstPair.hash === this.secondPair.hash;
  }

  public reset(): void {
    for (var key in window.localStorage) {
      if (key.indexOf('EMOJI_WAR_') == 0) {
        window.localStorage.removeItem(key);
      }
    }
    window.location.reload();
  }
}

export const store = new GameStore();
