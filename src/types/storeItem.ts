import { ListItemInterface } from './listItem';

export class StoreItem implements ListItemInterface {
  public icon: string;
  public description?: string;
  public name: string = '';
  public id: string;
  public bought: boolean;
  public hidden: boolean = false;
  public inDev: boolean = false;
  public price: number;
  public onClick(): void {}

  public constructor(init?: Partial<StoreItem>) {
    Object.assign(this, init);
    if (!init.onClick) {
      this.onClick = null;
    }
  }

  public get disabled(): boolean {
    return this.bought || this.inDev || !this.onClick;
  }

  public get number(): string {
    return this.bought ? '🤑' : `${this.price} 💵`;
  }
}
