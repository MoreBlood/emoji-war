export class StoreItem {
  public icon: string;
  public description?: string;
  public name: string = '';
  public price: number;
  public id: string;
  public bought: boolean;
  public hidden: boolean = false;
  public inDev: boolean = false;

  public constructor(init?: Partial<StoreItem>) {
    Object.assign(this, init);
  }
}
