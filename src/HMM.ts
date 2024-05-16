import fs from 'node:fs';
import { HMMModel, tags, tag2idx } from './types';

// 归一化函数
export function normalize(arr: number[]): number[] {
  const sum = arr.reduce((a, b) => a + b, 0);
  return arr.map(x => (sum === 0 ? 0 : x / sum));
}

// 保存模型到文件
export function saveModel(model: HMMModel, filePath: string) {
  fs.writeFileSync(filePath, JSON.stringify(model));
}

// 从文件加载模型
export function loadModel(filePath: string): HMMModel {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

// Viterbi算法
export function viterbi(observations: string[], states: string[], startProb: number[], transitionProb: number[][], emissionProb: { [key: string]: number[] }): string[] {
  const T = observations.length;
  const N = states.length;
  const viterbi = Array.from({ length: T }, () => Array(N).fill(-Infinity));
  const backpointer = Array.from({ length: T }, () => Array(N).fill(0));

  for (let s = 0; s < N; s++) {
    const key = `BOS->${tags[s]}`;
    viterbi[0][s] = startProb[s] + (emissionProb[observations[0]] ? emissionProb[observations[0]][s] : 0);
  }

  for (let t = 1; t < T; t++) {
    for (let s = 0; s < N; s++) {
      const maxTransition = Math.max(...states.map((_, sPrime) => viterbi[t - 1][sPrime] + (transitionProb[sPrime][s] || 0)));
      const maxState = states.findIndex((_, sPrime) => viterbi[t - 1][sPrime] + (transitionProb[sPrime][s] || 0) === maxTransition);
      viterbi[t][s] = maxTransition + (emissionProb[observations[t]] ? emissionProb[observations[t]][s] : 0);
      backpointer[t][s] = maxState;
    }
  }

  const bestPathProb = Math.max(...viterbi[T - 1]);
  const bestLastState = viterbi[T - 1].findIndex(p => p === bestPathProb);

  const bestPath = [];
  let bestState = bestLastState;
  for (let t = T - 1; t >= 0; t--) {
    bestPath.unshift(tags[bestState]);
    bestState = backpointer[t][bestState];
  }

  return bestPath;
}
