# bun-hmm

本项目实现了一个结合隐马尔科夫模型（HMM）和前缀树（Trie）的中文分词器，通过训练数据进行模型训练，并使用字典进行高效的词匹配。

To install dependencies:

```bash
bun install
```

### 运行代码

首先训练HMM模型：

```sh
bun run src/trainHMM.ts
```

然后使用训练好的模型进行分词：

```sh
bun run src/segmentHMM.ts
```

运行以下命令使用优化方法（结合 HMM 模型和前缀树）进行分词：
```sh
bun run src/segmentOptimized.ts
```

## 文件说明

- **dictionary.txt**: 包含常用词汇的字典，每行一个词。
- **hmm_model.json**: 训练好的 HMM 模型参数（由 `trainHMM.ts` 生成）。
- **segmentOptimized.ts**: 使用 HMM 和前缀树进行分词的主脚本。
- **trainHMM.ts**: 使用训练数据训练 HMM 模型的脚本。
- **segmentHMM.ts**: 仅使用 HMM 进行分词的脚本。
- **Trie.ts**: 前缀树（Trie）数据结构的实现。
- **types.ts**: 项目的类型定义文件。
- **tsconfig.json**: TypeScript 配置文件。
