import { HMMModel, tags, idx2tag } from './types';
import { loadModel, viterbi } from './HMM';

// 加载HMM模型
const model: HMMModel = loadModel('hmm_model.json');

// 分词函数
function segment(text: string): string[] {
  const observations = text.split('');
  const states = viterbi(observations, tags, model.startProb, model.transitionMatrix, model.emissionMatrix);

  const result: string[] = [];
  let word = '';

  for (let i = 0; i < text.length; i++) {
    word += text[i];
    if (states[i] === 'E' || states[i] === 'S') {
      result.push(word);
      word = '';
    }
  }

  if (word) {
    result.push(word);
  }

  return result;
}

// 测试分词
const text = "我爱编程和开源项目";
const result = segment(text);
console.log("分词结果:", result);
