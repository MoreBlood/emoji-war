export function randomInteger(min: number, max: number, includingMax = false): number {
  let rand = min - 0.5 + Math.random() * ((includingMax ? max : max - 1) - min + 1);
  return Math.round(rand);
}

export function yes(): boolean {
  return Math.random() > 0.5;
}
