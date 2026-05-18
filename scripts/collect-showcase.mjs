/**
 * GitHub 热门项目自动采集脚本
 * 每天获取 GitHub 上 stars 最多的前 20 个开源项目
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getToday() {
  return new Date().toISOString().split('T')[0];
}

// 语言颜色映射（用于标签展示）
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
};

// 从 GitHub API 获取 stars 最多的项目
async function fetchTopStarredRepos(count = 20) {
  console.log('🔍 正在从 GitHub API 获取热门项目...');

  const query = 'stars:>10000';
  const sort = 'stars';
  const order = 'desc';
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=${sort}&order=${order}&per_page=${count}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'VibeCoding-Showcase-Collector/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API 请求失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ 成功获取 ${data.items.length} 个项目`);
    return data.items;
  } catch (error) {
    console.error('❌ 获取 GitHub 数据失败:', error.message);
    throw error;
  }
}

// 将 GitHub 项目数据转换为展示格式
function transformRepoToShowcase(repo, index) {
  const today = getToday();
  const language = repo.language || 'Unknown';
  const color = languageColors[language] || '#8b949e';

  // 生成描述：优先使用仓库描述，否则基于名称生成
  let description = repo.description || `${repo.name} - 一个优秀的开源项目`;
  // 截断过长的描述
  if (description.length > 120) {
    description = description.substring(0, 117) + '...';
  }

  // 构建标签：语言 + 主题标签
  const tags = [language];
  if (repo.topics && repo.topics.length > 0) {
    // 取前2个主题
    tags.push(...repo.topics.slice(0, 2));
  }

  return {
    id: `github-${repo.id}`,
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

async function main() {
  console.log('🚀 开始采集 GitHub 热门项目...');
  console.log(`📅 今天: ${getToday()}`);

  try {
    // 从 GitHub API 获取数据
    const repos = await fetchTopStarredRepos(20);

    // 转换数据格式
    const showcases = repos.map((repo, index) => transformRepoToShowcase(repo, index));

    // 构建数据结构
    const data = {
      meta: {
        source: 'github',
        totalCount: showcases.length,
        collectedAt: getToday(),
        description: 'GitHub 上 Stars 最多的前 20 个开源项目',
      },
      showcases: showcases,
    };

    // 写入文件
    const dataPath = path.join(__dirname, '../src/data/showcase.json');
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    console.log('\n✅ 作品展示数据更新完成');
    console.log(`📊 共采集 ${showcases.length} 个项目`);
    console.log('\n🏆 前 5 名项目:');
    showcases.slice(0, 5).forEach((s, i) => {
      console.log(`  ${i + 1}. ⭐ ${s.likes.toLocaleString()} | ${s.fullName} - ${s.language}`);
    });
  } catch (error) {
    console.error('❌ 采集失败:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);
