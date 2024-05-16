export interface HMMModel {
  startProb: number[];
  transitionMatrix: number[][];
  emissionMatrix: { [key: string]: number[] };
}

export const tags: string[] = ['B', 'M', 'E', 'S'];
export const tag2idx: { [key: string]: number } = { 'B': 0, 'M': 1, 'E': 2, 'S': 3 };
export const idx2tag: { [key: number]: string } = { 0: 'B', 1: 'M', 2: 'E', 3: 'S' };
