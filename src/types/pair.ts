import { skin, colorable } from '../helpers/emojis';
import { randomInteger } from '../helpers/math';

export class Pair {
  private originalPair: string[][] = [];
  public pair: string[][] = [];

  public constructor(pair: string[][] = []) {
    this.originalPair = pair;
    this.shuffle();
  }

  public get hash(): string {
    let hash = '';

    for (let i = 0; i < this.originalPair.length; i += 1) {
      for (let u = 0; u < this.originalPair[i].length; u += 1) {
        hash += this.originalPair[i][u];
      }
    }

    return hash;
  }

  private shuffle(): void {
    const shuffled = [];
    for (let i = 0; i < this.originalPair.length; i += 1) {
      for (let u = 0; u < this.originalPair[i].length; u += 1) {
        shuffled.push(this.originalPair[i][u]);
      }
    }

    shuffled.sort(() => Math.random() - 0.5);
    let counter = 0;

    for (let i = 0; i < this.originalPair.length; i += 1) {
      if (!Array.isArray(this.pair[i])) {
        this.pair[i] = [];
      }
      for (let u = 0; u < this.originalPair[i].length; u += 1) {
        const skinModifier = colorable.includes(shuffled[counter])
          ? skin[randomInteger(0, skin.length)]
          : '';
        this.pair[i][u] = shuffled[counter] + skinModifier;
        counter += 1;
      }
    }
  }
}
