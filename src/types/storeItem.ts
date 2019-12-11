export class StoreItem {
  public icon: string;
  public description?: string;
  public name: string = '';
  public price: number;
  public id: string;

  public constructor(init?: Partial<StoreItem>) {
    Object.assign(this, init);
  }
}
