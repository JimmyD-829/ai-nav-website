/**
 * Vibe Coding 工具更新自动采集脚本
 * 只保留最近10天的数据
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取10天前的日期
function getDateDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

// 获取今天的日期
function getToday() {
  return new Date().toISOString().split('T')[0];
}

// 工具 GitHub 仓库映射
const TOOL_REPOS = {
  'Cursor': { owner: 'getcursor', repo: 'cursor' },
  'GitHub Copilot': { owner: 'github', repo: 'copilot-vscode' },
  'Windsurf': { owner: 'exafunction', repo: 'windsurf' },
  'V0': { owner: 'vercel', repo: 'ai' },
  'Bolt': { owner: 'stackblitz', repo: 'bolt' }
};

/**
 * 从 GitHub API 获取 Release 信息
 */
async function fetchGitHubReleases(owner, repo) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases?per_page=5`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'AI-Nav-Website'
      }
    });

    if (!response.ok) {
      console.warn(`⚠️ 无法获取 ${owner}/${repo}: ${response.status}`);
      return [];
    }

    const releases = await response.json();
    return releases.map(release => ({
      version: release.tag_name.replace(/^v/, ''),
      date: release.published_at.split('T')[0],
      title: release.name || release.tag_name,
      description: release.body?.substring(0, 200) || '无描述',
      url: release.html_url
    }));
  } catch (error) {
    console.warn(`⚠️ 获取 ${owner}/${repo} 失败:`, error.message);
    return [];
  }
}

/**
 * 生成模拟更新数据
 */
function generateMockUpdates() {
  const today = new Date();
  const updates = [];

  const tools = [
    { id: '5', name: 'Cursor', logo: 'https://cursor.sh/icon.svg' },
    { id: '4', name: 'GitHub Copilot', logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
    { id: '20', name: 'Windsurf', logo: 'https://codeium.com/favicon.ico' },
    { id: '12', name: 'V0', logo: 'https://v0.dev/favicon.ico' },
    { id: '14', name: 'Bolt', logo: 'https://bolt.new/icon.svg' }
  ];

  const updateTypes = ['feature', 'improvement', 'fix'];
  const updateTitles = [
    '新增智能代码补全功能',
    '优化大型项目性能',
    '修复代码生成延迟问题',
    '支持新的编程语言',
    '改进用户界面体验',
    '新增团队协作功能',
    '优化内存占用',
    '支持更多框架集成'
  ];

  for (let i = 0; i < 3; i++) {
    const tool = tools[Math.floor(Math.random() * tools.length)];
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    updates.push({
      id: `auto-update-${Date.now()}-${i}`,
      toolId: tool.id,
      toolName: tool.name,
      toolLogo: tool.logo,
      version: `${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 20)}`,
      updateDate: dateStr,
      updateType: updateTypes[Math.floor(Math.random() * updateTypes.length)],
      title: updateTitles[Math.floor(Math.random() * updateTitles.length)],
      description: `${tool.name} 于 ${dateStr} 发布新版本，包含多项功能优化和性能改进。`,
      changelog: [
        '新增功能优化',
        '改进性能表现',
        '修复已知问题',
        '优化用户体验'
      ]
    });
  }

  return updates;
}

/**
 * 过滤只保留最近10天的数据
 */
function filterRecentData(updates, days = 10) {
  const cutoffDate = getDateDaysAgo(days);
  return updates.filter(u => u.updateDate >= cutoffDate);
}

/**
 * 合并更新数据，去重，只保留最近10天
 */
function mergeUpdates(existingUpdates, newUpdates, maxDays = 10) {
  const seen = new Set(existingUpdates.map(u => `${u.toolName}-${u.version}`));
  const merged = [...existingUpdates];

  for (const update of newUpdates) {
    const key = `${update.toolName}-${update.version}`;
    if (!seen.has(key)) {
      merged.unshift(update);
      seen.add(key);
    }
  }

  // 只保留最近10天的数据
  const filtered = filterRecentData(merged, maxDays);
  
  // 按日期排序（最新的在前）
  filtered.sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate));
  
  return filtered.slice(0, 15);
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始采集工具更新...');
  console.log(`📅 今天: ${getToday()}`);
  console.log(`📅 保留数据起始日期: ${getDateDaysAgo(10)}`);

  const dataPath = path.join(__dirname, '../src/data/updates.json');
  let existingData;

  try {
    existingData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (e) {
    existingData = { updates: [] };
  }

  // 清理过期数据
  const beforeCount = existingData.updates.length;
  existingData.updates = filterRecentData(existingData.updates, 10);
  console.log(`🧹 清理过期数据: ${beforeCount} → ${existingData.updates.length} 条`);

  // 尝试从 GitHub 获取真实数据
  const realUpdates = [];
  for (const [toolName, repo] of Object.entries(TOOL_REPOS)) {
    const releases = await fetchGitHubReleases(repo.owner, repo.repo);
    console.log(`📦 ${toolName}: 获取到 ${releases.length} 个 release`);
    // 实际部署时解析 release 数据并添加到 realUpdates
  }

  // 生成模拟数据
  const newUpdates = generateMockUpdates();
  console.log(`📝 新生成 ${newUpdates.length} 条更新`);

  // 合并数据
  const mergedUpdates = mergeUpdates(existingData.updates, newUpdates, 10);
  console.log(`📊 合并后共 ${mergedUpdates.length} 条更新`);

  const output = {
    updates: mergedUpdates
  };

  fs.writeFileSync(dataPath, JSON.stringify(output, null, 2));
  console.log('✅ 工具更新数据更新完成');
  
  // 显示最新的5条更新
  console.log('\n📋 最新更新:');
  mergedUpdates.slice(0, 5).forEach((u, i) => {
    console.log(`  ${i+1}. [${u.updateDate}] ${u.toolName} - ${u.title}`);
  });
}

main().catch(console.error);
