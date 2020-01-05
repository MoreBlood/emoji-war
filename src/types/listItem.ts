export interface ListItemInterface {
  icon: string;
  name: string;
  number: string;
  id: string;
  disabled: boolean;
  onClick?(): void;
}
