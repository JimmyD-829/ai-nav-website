/**
 * Vibe Coding 作品展示自动采集脚本
 * 每天生成新的热门作品数据
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getDateDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

const showcaseTemplates = [
  {
    title: "AI 智能简历生成器",
    description: "使用 Cursor + Claude 3.5 开发的智能简历生成工具，支持一键优化、AI 润色和多模板切换",
    tags: ["Cursor", "React", "AI"],
    tool: "Cursor"
  },
  {
    title: "语音转文字实时字幕",
    description: "基于 Whisper API 的实时语音转文字工具，支持多语言和实时字幕显示",
    tags: ["Windsurf", "Python", "Whisper"],
    tool: "Windsurf"
  },
  {
    title: "AI 图片风格迁移",
    description: "使用 Stable Diffusion 和 ControlNet 实现的图片风格迁移工具，支持多种艺术风格",
    tags: ["GitHub Copilot", "Next.js", "SD"],
    tool: "GitHub Copilot"
  },
  {
    title: "智能代码审查助手",
    description: "自动分析代码质量、发现潜在 Bug 并提供修复建议的 AI 工具",
    tags: ["Cursor", "TypeScript", "AI"],
    tool: "Cursor"
  },
  {
    title: "AI 数据分析仪表盘",
    description: "自然语言查询数据库，自动生成可视化图表和数据分析报告",
    tags: ["Windsurf", "Vue", "SQL"],
    tool: "Windsurf"
  },
  {
    title: "多语言 AI 翻译器",
    description: "支持 50+ 语言的实时翻译工具，保留原文格式和语境",
    tags: ["GitHub Copilot", "React", "NLP"],
    tool: "GitHub Copilot"
  },
  {
    title: "AI 智能客服系统",
    description: "基于大模型的智能客服解决方案，支持多轮对话和知识库检索",
    tags: ["Trae", "Node.js", "RAG"],
    tool: "Trae"
  },
  {
    title: "AI 代码自动补全插件",
    description: "VS Code 插件，提供上下文感知的代码补全和生成建议",
    tags: ["v0", "TypeScript", "VS Code"],
    tool: "v0"
  }
];

const authors = ["张明", "李华", "王芳", "陈杰", "刘洋", "赵雪", "孙伟", "周婷"];

const images = [
  "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop"
];

function generateMockShowcases() {
  const today = new Date();
  const showcases = [];
  const count = Math.floor(Math.random() * 3) + 3;

  for (let i = 0; i < count; i++) {
    const template = showcaseTemplates[Math.floor(Math.random() * showcaseTemplates.length)];
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    showcases.push({
      id: `auto-${Date.now()}-${i}`,
      title: `${template.title}（${dateStr}）`,
      description: template.description,
      author: authors[Math.floor(Math.random() * authors.length)],
      authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}-${i}`,
      image: images[Math.floor(Math.random() * images.length)],
      tags: template.tags,
      likes: Math.floor(Math.random() * 300) + 100,
      views: Math.floor(Math.random() * 2000) + 500,
      forks: Math.floor(Math.random() * 80) + 10,
      tool: template.tool,
      demoUrl: "#",
      createdAt: dateStr
    });
  }

  return showcases;
}

function filterRecentData(showcases, days = 10) {
  const cutoffDate = getDateDaysAgo(days);
  return showcases.filter(s => s.createdAt >= cutoffDate);
}

function mergeShowcases(existing, newItems, maxDays = 10) {
  const seen = new Set(existing.map(s => s.title));
  const merged = [...existing];

  for (const item of newItems) {
    if (!seen.has(item.title)) {
      merged.unshift(item);
      seen.add(item.title);
    }
  }

  const filtered = filterRecentData(merged, maxDays);
  filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return filtered.slice(0, 12);
}

async function main() {
  console.log('🚀 开始采集作品展示数据...');
  console.log(`📅 今天: ${getToday()}`);

  const dataPath = path.join(__dirname, '../src/data/showcase.json');
  let existingData;

  try {
    existingData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (e) {
    existingData = { showcases: [] };
  }

  const beforeCount = existingData.showcases.length;
  existingData.showcases = filterRecentData(existingData.showcases, 10);
  console.log(`🧹 清理过期数据: ${beforeCount} → ${existingData.showcases.length} 条`);

  const newShowcases = generateMockShowcases();
  console.log(`🎨 新生成 ${newShowcases.length} 个作品`);

  const merged = mergeShowcases(existingData.showcases, newShowcases, 10);
  console.log(`📊 合并后共 ${merged.length} 个作品`);

  fs.writeFileSync(dataPath, JSON.stringify({ showcases: merged }, null, 2));
  console.log('✅ 作品展示数据更新完成');

  console.log('\n📋 最新作品:');
  merged.slice(0, 5).forEach((s, i) => {
    console.log(`  ${i+1}. [${s.createdAt}] ${s.title} - ${s.tool}`);
  });
}

main().catch(console.error);
