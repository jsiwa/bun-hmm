export class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
  }
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return node.isEndOfWord;
  }

  getLongestMatch(text: string, start: number): string {
    let node = this.root;
    let longestMatch = "";
    let currentMatch = "";

    for (let i = start; i < text.length; i++) {
      const char = text[i];
      if (node.children.has(char)) {
        currentMatch += char;
        node = node.children.get(char)!;
        if (node.isEndOfWord) {
          longestMatch = currentMatch;
        }
      } else {
        break;
      }
    }

    return longestMatch;
  }
}
