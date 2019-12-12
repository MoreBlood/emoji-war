import { observable, computed } from 'mobx';

type Storable = boolean | number | object | any[] | string;

export class SavedSettingProperty {
  public name: string;
  public type: string;

  @observable
  private _value: Storable;

  private static appPrefix = 'EMOJI_WAR_';

  public constructor(name: string, defaultValue: Storable, type = 'string', hard = false) {
    this.name = SavedSettingProperty.appPrefix + name;
    this.type = type;

    if (window.localStorage.getItem(this.name) === null || hard) {
      this.value = defaultValue;
    }
  }

  @computed
  public get value(): Storable {
    const item = window.localStorage.getItem(this.name);

    if (this._value) {
      return this._value;
    }

    if (item === null) return null;

    try {
      switch (this.type) {
        case 'bool':
          return item === 'true';
        case 'number':
          return +item;
        case 'object':
        case 'array':
          return JSON.parse(item);
        default:
          return item;
      }
    } catch (err) {
      console.error(err);
      return item;
    }
  }

  public set value(value: Storable) {
    this._value = value;
    window.localStorage.setItem(this.name, JSON.stringify(value));
  }
}
