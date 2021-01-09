/* eslint-disable @typescript-eslint/no-parameter-properties */
import { observable, action, computed } from 'mobx';
import { Parser } from '../helpers/enum';

import { SavedSettingProperty } from '../helpers/localStorage';
import { StoreItem } from '../types/storeItem';
import { inGameStoreItems } from './data/inGameStoreItems';
import { GameModes, SettingsStore } from './settingsStore';

export class ShopStore {
  public settingsStore!: SettingsStore;

  public constructor() {
    this.initStore();
  }

  @observable
  public storeItems: Map<string, StoreItem> = new Map();

  private _boughtItems = new SavedSettingProperty('boughtItems', [], 'array');

  @computed
  public get boughtItems(): string[] {
    const { value } = this._boughtItems;
    return value as string[];
  }

  public set boughtItems(value: string[]) {
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
      window.ga?.trackView('Store');
      item.bought = true;
      this.money -= item.price;
      const newBought = [...this.boughtItems, id];
      this.boughtItems = newBought;

      if (Object.keys(GameModes).includes(item.id)) {
        this.settingsStore.setGameMode(Parser.parseEnum(item.id, GameModes));
      }
    }
  }
}
