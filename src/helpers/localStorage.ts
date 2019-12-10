type Storable = boolean | number | object | any[] | string;

export class SavedSettingProperty {
  public name: string;
  public type: string;

  public constructor(name: string, defaultValue: Storable, type = 'string') {
    this.name = name;
    this.type = type;

    if (window.localStorage.getItem(this.name) === null) {
      this.value = defaultValue;
    }
  }

  public get value(): Storable {
    const item = window.localStorage.getItem(this.name);

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
    window.localStorage.setItem(this.name, JSON.stringify(value));
  }
}
