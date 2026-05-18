/**
 * VibeCoding 作品自动采集脚本
 * 每天从 GitHub 获取最新的 VibeCoding 相关热门项目
 * 搜索关键词轮换，确保多样性
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// VibeCoding 相关搜索关键词池（每天轮换）
const searchQueries = [
  { q: 'vibe-coding stars:>5', name: 'VibeCoding' },
  { q: 'ai-generated-app stars:>5', name: 'AI生成应用' },
  { q: 'cursor-ai-project stars:>5', name: 'Cursor项目' },
  { q: 'windsurf-project stars:>5', name: 'Windsurf项目' },
  { q: 'copilot-generated stars:>5', name: 'Copilot生成' },
  { q: 'ai-coding-demo stars:>5', name: 'AI编码演示' },
  { q: 'no-code-ai stars:>5', name: '无代码AI' },
  { q: 'prompt-engineering-app stars:>5', name: 'Prompt应用' },
  { q: 'chatgpt-built stars:>5', name: 'ChatGPT构建' },
  { q: 'claude-built stars:>5', name: 'Claude构建' },
  { q: 'ai-product-demo stars:>5', name: 'AI产品演示' },
  { q: 'llm-powered-app stars:>5', name: 'LLM驱动应用' },
  { q: 'generated-website stars:>5', name: '生成式网站' },
  { q: 'ai-tool-showcase stars:>5', name: 'AI工具展示' },
];

// 语言颜色映射
const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Ruby: '#701516',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  PHP: '#4F5D95',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Dart: '#00B4AB',
  Scala: '#c22d40',
  Elixir: '#6e4a7e',
  Jupyter: '#DA5B0B',
  Unknown: '#8b949e',
};

// 从 GitHub API 搜索项目
async function searchGitHubRepos(query, perPage = 10) {
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=updated&order=desc&per_page=${perPage}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'VibeCoding-Collector/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API 请求失败: ${response.status}`);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error(`❌ 搜索失败 "${query}":`, error.message);
    return [];
  }
}

// 转换项目数据
function transformRepoToShowcase(repo, index, category) {
  const today = getToday();
  const language = repo.language || 'Unknown';
  const color = languageColors[language] || '#8b949e';

  let description = repo.description || `${repo.name} - VibeCoding 作品`;
  if (description.length > 120) {
    description = description.substring(0, 117) + '...';
  }

  const tags = [category];
  if (repo.topics && repo.topics.length > 0) {
    tags.push(...repo.topics.slice(0, 2));
  }

  return {
    id: `vc-${repo.id}`,
    title: repo.name,
    fullName: repo.full_name,
    description: description,
    author: repo.owner.login,
    authorAvatar: repo.owner.avatar_url,
    authorUrl: repo.owner.html_url,
    image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
    tags: tags,
    likes: repo.stargazers_count,
    views: repo.watchers_count,
    forks: repo.forks_count,
    language: language,
    languageColor: color,
    repoUrl: repo.html_url,
    homepage: repo.homepage,
    createdAt: repo.created_at ? repo.created_at.split('T')[0] : today,
    updatedAt: repo.updated_at ? repo.updated_at.split('T')[0] : today,
    collectedAt: today,
    rank: index + 1,
    openIssues: repo.open_issues_count,
  };
}

// 去重（基于 fullName）
function deduplicate(items) {
  const seen = new Set();
  return items.filter(item => {
    if (seen.has(item.fullName)) return false;
    seen.add(item.fullName);
    return true;
  });
}

async function main() {
  console.log('🚀 开始采集 VibeCoding 作品...');
  console.log(`📅 今天: ${getToday()}`);

  const dayOfYear = getDayOfYear();
  const allRepos = [];

  // 每天轮换使用不同的搜索词组合（3个）
  const startIndex = dayOfYear % searchQueries.length;
  const dailyQueries = [];
  for (let i = 0; i < 3; i++) {
    const idx = (startIndex + i) % searchQueries.length;
    dailyQueries.push(searchQueries[idx]);
  }

  console.log(`\n🔍 今日搜索关键词:`);
  dailyQueries.forEach((q, i) => console.log(`  ${i + 1}. ${q.name} (${q.q})`));

  // 并行搜索
  for (const query of dailyQueries) {
    console.log(`\n⏳ 搜索: ${query.name}...`);
    const repos = await searchGitHubRepos(query.q, 8);
    console.log(`  ✅ 找到 ${repos.length} 个项目`);

    repos.forEach((repo, idx) => {
      allRepos.push(transformRepoToShowcase(repo, allRepos.length, query.name));
    });
  }

  // 去重
  const uniqueRepos = deduplicate(allRepos);
  console.log(`\n📊 去重后: ${uniqueRepos.length} 个唯一项目`);

  // 取前 20 个
  const finalRepos = uniqueRepos.slice(0, 20);

  // 构建数据
  const data = {
    meta: {
      source: 'github-vibecoding',
      totalCount: finalRepos.length,
      collectedAt: getToday(),
      description: 'GitHub 上最新的 VibeCoding 相关热门项目',
      searchQueries: dailyQueries.map(q => q.name),
    },
    showcases: finalRepos,
  };

  // 写入文件
  const dataPath = path.join(__dirname, '../src/data/vibecoding.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  console.log('\n✅ VibeCoding 作品数据更新完成');
  console.log(`📊 共采集 ${finalRepos.length} 个项目`);
  console.log('\n🏆 前 5 名项目:');
  finalRepos.slice(0, 5).forEach((s, i) => {
    console.log(`  ${i + 1}. ⭐ ${s.likes.toLocaleString()} | ${s.fullName} - ${s.tags[0]}`);
  });
}

main().catch(console.error);
