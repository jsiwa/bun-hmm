import { readFileSync } from 'node:fs';
import { Trie } from './Trie';
import { HMMModel, tags, idx2tag } from './types';
import { loadModel, viterbi } from './HMM';

// 加载HMM模型
const model: HMMModel = loadModel('hmm_model.json');

// 加载字典并构建前缀树
const trie = new Trie();
const dictionary = readFileSync('dictionary.txt', 'utf-8').split('\n');
dictionary.forEach(word => trie.insert(word.trim()));

// 分词函数
function segment(text: string): string[] {
  const observations = text.split('');
  const states = viterbi(observations, tags, model.startProb, model.transitionMatrix, model.emissionMatrix);

  const result: string[] = [];
  let i = 0;

  while (i < text.length) {
    const match = trie.getLongestMatch(text, i);
    if (match) {
      result.push(match);
      i += match.length;
    } else {
      let word = '';
      while (i < text.length && (states[i] !== 'E' && states[i] !== 'S')) {
        word += text[i];
        i++;
      }
      word += text[i];
      result.push(word);
      i++;
    }
  }

  return result;
}

// 测试分词
const text = "我爱编程和开源项目";
const result = segment(text);
console.log("分词结果:", result);
