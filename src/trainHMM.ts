import fs from 'node:fs';
import { HMMModel, tags, tag2idx } from './types';
import { normalize, saveModel } from './HMM';

// 初始化HMM模型参数
const numTags = tags.length;
let transitionMatrix = Array.from({ length: numTags }, () => Array(numTags).fill(0));
let emissionMatrix: { [key: string]: number[] } = {};
let startProb = Array(numTags).fill(0);

// 加载训练数据
const data = fs.readFileSync('train.txt', 'utf-8').split('\n');

data.forEach(line => {
  const tokens = line.trim().split(' ');
  tokens.forEach((token, index) => {
    const [word, tag] = token.split('/') as [string, keyof typeof tag2idx];
    const tagIdx = tag2idx[tag];

    // 统计初始状态分布
    if (index === 0) startProb[tagIdx]++;

    // 统计转移概率
    if (index > 0) {
      const prevTag = tokens[index - 1].split('/')[1] as keyof typeof tag2idx;
      const prevTagIdx = tag2idx[prevTag];
      transitionMatrix[prevTagIdx][tagIdx]++;
    }

    // 统计发射概率
    if (!emissionMatrix[word]) emissionMatrix[word] = Array(numTags).fill(0);
    emissionMatrix[word][tagIdx]++;
  });
});

// 归一化概率分布
startProb = normalize(startProb);
transitionMatrix = transitionMatrix.map(normalize);
Object.keys(emissionMatrix).forEach(word => {
  emissionMatrix[word] = normalize(emissionMatrix[word]);
});

// 输出模型参数
console.log("Start Probability:", startProb);
console.log("Transition Matrix:", transitionMatrix);
console.log("Emission Matrix:", emissionMatrix);

// 保存模型
const model: HMMModel = { startProb, transitionMatrix, emissionMatrix };
saveModel(model, 'hmm_model.json');
