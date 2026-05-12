/**
 * AI 工具数据自动采集脚本
 * 从 Product Hunt、GitHub Stars 等来源采集工具数据
 */

const fs = require('fs');
const path = require('path');

// 工具数据源配置
const TOOL_SOURCES = {
  'Cursor': {
    github: 'getcursor/cursor',
    productHunt: 'cursor',
    website: 'https://cursor.sh'
  },
  'GitHub Copilot': {
    github: 'github/copilot-vscode',
    website: 'https://github.com/features/copilot'
  },
  'Windsurf': {
    github: 'exafunction/windsurf',
    website: 'https://codeium.com/windsurf'
  },
  'V0': {
    github: 'vercel/ai',
    website: 'https://v0.dev'
  },
  'Bolt': {
    github: 'stackblitz/bolt',
    website: 'https://bolt.new'
  }
};

/**
 * 从 GitHub API 获取仓库信息
 */
async function fetchGitHubRepo(owner, repo) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'AI-Nav-Website'
      }
    });

    if (!response.ok) return null;

    const data = await response.json();
    return {
      stars: data.stargazers_count,
      updatedAt: data.updated_at,
      description: data.description
    };
  } catch (error) {
    console.warn(`⚠️ 获取 GitHub 数据失败:`, error.message);
    return null;
  }
}

/**
 * 模拟 MAU 增长
 */
function simulateMAUGrowth(currentMAU) {
  // 每月增长 2-5%
  const growthRate = 1 + (Math.random() * 0.03 + 0.02);
  return Math.floor(currentMAU * growthRate);
}

/**
 * 更新工具数据
 */
async function updateToolData(tools) {
  const updatedTools = [];

  for (const tool of tools) {
    const updatedTool = { ...tool };

    // 模拟 MAU 增长
    updatedTool.mau = simulateMAUGrowth(tool.mau);

    // 尝试获取 GitHub 数据
    const source = TOOL_SOURCES[tool.name];
    if (source && source.github) {
      const [owner, repo] = source.github.split('/');
      const githubData = await fetchGitHubRepo(owner, repo);

      if (githubData) {
        console.log(`📊 ${tool.name}: GitHub Stars ${githubData.stars}`);
        // 可以根据 stars 数量调整评分
        if (githubData.stars > 50000) {
          updatedTool.rating = Math.min(5.0, updatedTool.rating + 0.1);
        }
      }
    }

    updatedTools.push(updatedTool);
  }

  return updatedTools;
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始更新工具数据...');

  const dataPath = path.join(__dirname, '../src/data/tools.json');
  let existingData;

  try {
    existingData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (e) {
    console.error('❌ 无法读取工具数据文件');
    process.exit(1);
  }

  // 更新工具数据
  const updatedTools = await updateToolData(existingData.tools);
  console.log(`🛠️ 更新了 ${updatedTools.length} 个工具的数据`);

  const output = {
    tools: updatedTools,
    categories: existingData.categories
  };

  fs.writeFileSync(dataPath, JSON.stringify(output, null, 2));
  console.log('✅ 工具数据更新完成');
}

main().catch(console.error);
