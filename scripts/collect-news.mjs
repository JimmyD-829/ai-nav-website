/**
 * AI 新闻自动采集脚本
 * 从多个 RSS 源和 API 采集最新 AI 新闻
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 模拟 RSS 数据源（实际部署时可替换为真实 API）
const NEWS_SOURCES = [
  {
    name: "机器之心",
    url: "https://www.jiqizhixin.com/rss",
    category: "llm"
  },
  {
    name: "36氪 AI",
    url: "https://36kr.com/search/articles/AI",
    category: "industry"
  },
  {
    name: "TechCrunch AI",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    category: "tech-breakthrough"
  }
];

// 关键词分类映射
const CATEGORY_MAP = {
  'llm': ['GPT', 'Claude', 'Gemini', 'Llama', '大模型', 'LLM', '模型发布'],
  'ai-app': ['应用', 'App', '产品', '工具', '助手'],
  'tech-breakthrough': ['突破', '论文', '研究', '算法', '技术'],
  'industry': ['融资', '收购', '合作', '市场', '行业'],
  'product': ['发布', '上线', '推出', '新版', '更新']
};

/**
 * 根据标题自动分类
 */
function autoCategorize(title) {
  for (const [category, keywords] of Object.entries(CATEGORY_MAP)) {
    if (keywords.some(kw => title.toLowerCase().includes(kw.toLowerCase()))) {
      return category;
    }
  }
  return 'industry';
}

/**
 * 生成模拟新闻数据（实际部署时替换为真实 API 调用）
 */
function generateMockNews() {
  const today = new Date();
  const news = [];

  const templates = [
    { title: "OpenAI 发布新功能", source: "OpenAI", category: "llm" },
    { title: "Google Gemini 更新", source: "Google", category: "llm" },
    { title: "Claude 新增能力", source: "Anthropic", category: "llm" },
    { title: "AI 创业公司融资", source: "36氪", category: "industry" },
    { title: "新技术突破", source: "机器之心", category: "tech-breakthrough" },
    { title: "产品发布", source: "TechCrunch", category: "product" }
  ];

  // 生成 3-5 条新闻
  const count = Math.floor(Math.random() * 3) + 3;
  for (let i = 0; i < count; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    news.push({
      id: `auto-${Date.now()}-${i}`,
      title: `${template.title} - ${date.toLocaleDateString('zh-CN')}`,
      summary: `这是自动采集的新闻摘要，来源：${template.source}。实际部署时将替换为真实 RSS 数据。`,
      content: `详细内容待从 ${template.source} 的 RSS 源获取。`,
      source: template.source,
      publishDate: date.toISOString().split('T')[0],
      category: template.category,
      tags: [template.source, template.category, 'AI'],
      isHot: i < 2,
      views: Math.floor(Math.random() * 10000) + 1000
    });
  }

  return news;
}

/**
 * 合并新旧数据，去重
 */
function mergeNews(existingNews, newNews) {
  const seen = new Set(existingNews.map(n => n.title));
  const merged = [...existingNews];

  for (const news of newNews) {
    if (!seen.has(news.title)) {
      merged.unshift(news);
      seen.add(news.title);
    }
  }

  // 保留最近 20 条
  return merged.slice(0, 20);
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始采集 AI 新闻...');

  const dataPath = path.join(__dirname, '../src/data/news.json');
  let existingData;

  try {
    existingData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (e) {
    existingData = { news: [], categories: [] };
  }

  // 生成新数据（实际部署时替换为真实 API）
  const newNews = generateMockNews();
  console.log(`📰 采集到 ${newNews.length} 条新闻`);

  // 合并数据
  const mergedNews = mergeNews(existingData.news, newNews);

  // 更新分类计数
  const categories = [
    { id: "all", name: "全部", count: mergedNews.length },
    { id: "llm", name: "大模型", count: mergedNews.filter(n => n.category === 'llm').length },
    { id: "ai-app", name: "AI应用", count: mergedNews.filter(n => n.category === 'ai-app').length },
    { id: "tech-breakthrough", name: "技术突破", count: mergedNews.filter(n => n.category === 'tech-breakthrough').length },
    { id: "industry", name: "业界动态", count: mergedNews.filter(n => n.category === 'industry').length },
    { id: "product", name: "产品发布", count: mergedNews.filter(n => n.category === 'product').length }
  ];

  const output = {
    news: mergedNews,
    categories
  };

  fs.writeFileSync(dataPath, JSON.stringify(output, null, 2));
  console.log('✅ 新闻数据更新完成');
}

main().catch(console.error);
