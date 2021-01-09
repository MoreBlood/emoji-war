/* eslint-disable @typescript-eslint/no-parameter-properties */
import { action, computed, observable } from 'mobx';

import { SavedSettingProperty } from '../helpers/localStorage';
import { StoreItem } from '../types/storeItem';
import { numberToEmojiString } from '../helpers/emojis';
import { ShopStore } from './shopStore';
import { initAd } from '../helpers/admob';
import { GameStore } from './gameStore';

export enum GameModes {
  REGULAR_GAME_MODE,
  TARANTINO_GAME_MODE,
  COVID_GAME_MODE,
  PEW_GAME_MODE,
}

export class SettingsStore {
  @observable
  public platform: string = 'DEFAULT_BROWSER';

  public constructor(private shopStore: ShopStore) {
    this.shopStore.settingsStore = this;
    this.shopStore = shopStore;
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOMContentLoaded');
      document.addEventListener(
        'deviceready',
        () => {
          console.log('deviceready');
          this.platform = window.device.platform;

          window.ga.startTrackerWithId(process.env.REACT_APP_GA_UA_ID);
          // initAd();
        },
        false,
      );
    });
  }

  private static gameSizes = [2, 3, 4];

  @observable
  public gameSize: number = SettingsStore.gameSizes[0];

  @computed
  public get gameSizeEmoji(): string {
    return numberToEmojiString(this.gameSize).join('');
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
    const item = this.shopStore.storeItems.get(GameModes[value as number]);
    return item;
  }

  @observable public isDemo = false;

  @action
  public setMode(mode: string): void {
    if (mode === 'demo') {
      this.isDemo = true;
    }
  }

  @computed
  public get time(): number {
    const additionalTime = this.isDemo ? 10 : 0;
    return 2 * this.gameSize + 1 + additionalTime;
  }

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

  public switchLGBTFriendly(): void {
    this.LGBTFriendly = !this.LGBTFriendly;
  }

  public switchSwipesDisabled(): void {
    this.swipesDisabled = !this.swipesDisabled;
  }

  @action
  public switchGameSize(): void {
    const currentGameSizeIndex = SettingsStore.gameSizes.indexOf(this.gameSize);
    const nextGameSize = (currentGameSizeIndex + 1) % SettingsStore.gameSizes.length;
    this.gameSize = SettingsStore.gameSizes[nextGameSize];
  }

  @action
  public resetGameSize(): void {
    this.gameSize = SettingsStore.gameSizes[0];
  }

  @action
  public switchGameMode(): void {
    const avaible: GameModes[] = [GameModes.REGULAR_GAME_MODE];

    if (this.shopStore.storeItems.get(GameModes[GameModes.TARANTINO_GAME_MODE]).bought) {
      avaible.push(GameModes.TARANTINO_GAME_MODE);
    }
    if (this.shopStore.storeItems.get(GameModes[GameModes.COVID_GAME_MODE]).bought) {
      avaible.push(GameModes.COVID_GAME_MODE);
    }
    if (this.shopStore.storeItems.get(GameModes[GameModes.PEW_GAME_MODE]).bought) {
      avaible.push(GameModes.PEW_GAME_MODE);
    }
    const currentGameSizeIndex = avaible.indexOf(this.gameMode);
    const nextGameSize = (currentGameSizeIndex + 1) % avaible.length;
    this.gameMode = avaible[nextGameSize];
  }

  @action
  public setGameMode(mode: GameModes): void {
    this.gameMode = mode;
  }

  public reset(): void {
    for (var key in window.localStorage) {
      if (key.indexOf(SavedSettingProperty.appPrefix) == 0) {
        window.localStorage.removeItem(key);
      }
    }
    window.location.reload();
  }
}
