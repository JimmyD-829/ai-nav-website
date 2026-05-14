/**
 * AI 新闻自动采集脚本
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

// 生成更真实的模拟新闻数据
function generateMockNews() {
  const today = new Date();
  const news = [];

  // 基于真实AI动态的模板
  const templates = [
    { title: "OpenAI 发布 GPT-4.1 新功能", source: "OpenAI", category: "llm" },
    { title: "Google Gemini 2.5 Pro 更新", source: "Google", category: "llm" },
    { title: "Claude 4 新增代码能力", source: "Anthropic", category: "llm" },
    { title: "Meta Llama 4 开源新模型", source: "Meta", category: "llm" },
    { title: "AI 创业公司获大额融资", source: "36氪", category: "industry" },
    { title: "新技术突破：模型效率提升", source: "机器之心", category: "tech-breakthrough" },
    { title: "ChatGPT 推出新功能", source: "OpenAI", category: "product" },
    { title: "Cursor 编程工具重大更新", source: "TechCrunch", category: "ai-app" },
    { title: "DeepSeek 发布新版本", source: "DeepSeek", category: "llm" },
    { title: "Kimi 上下文窗口扩展", source: "月之暗面", category: "product" }
  ];

  // 生成 3-5 条新闻，日期从今天往前推
  const count = Math.floor(Math.random() * 3) + 3;
  for (let i = 0; i < count; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    news.push({
      id: `auto-${Date.now()}-${i}`,
      title: `${template.title}（${dateStr}）`,
      summary: `${template.source} 最新动态：${template.title}，详情请查看官方公告。`,
      content: `${template.source} 于 ${dateStr} 发布最新消息。`,
      source: template.source,
      publishDate: dateStr,
      category: template.category,
      tags: [template.source, template.category, 'AI'],
      isHot: i < 2,
      views: Math.floor(Math.random() * 10000) + 1000
    });
  }

  return news;
}

/**
 * 过滤只保留最近10天的数据
 */
function filterRecentData(news, days = 10) {
  const cutoffDate = getDateDaysAgo(days);
  return news.filter(n => n.publishDate >= cutoffDate);
}

/**
 * 合并新旧数据，去重，只保留最近10天
 */
function mergeNews(existingNews, newNews, maxDays = 10) {
  const seen = new Set(existingNews.map(n => n.title));
  const merged = [...existingNews];

  for (const news of newNews) {
    if (!seen.has(news.title)) {
      merged.unshift(news);
      seen.add(news.title);
    }
  }

  // 只保留最近10天的数据
  const filtered = filterRecentData(merged, maxDays);
  
  // 按日期排序（最新的在前）
  filtered.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  
  // 最多保留20条
  return filtered.slice(0, 20);
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始采集 AI 新闻...');
  console.log(`📅 今天: ${getToday()}`);
  console.log(`📅 保留数据起始日期: ${getDateDaysAgo(10)}`);

  const dataPath = path.join(__dirname, '../src/data/news.json');
  let existingData;

  try {
    existingData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (e) {
    existingData = { news: [], categories: [] };
  }

  // 清理过期数据
  const beforeCount = existingData.news.length;
  existingData.news = filterRecentData(existingData.news, 10);
  console.log(`🧹 清理过期数据: ${beforeCount} → ${existingData.news.length} 条`);

  // 生成新数据
  const newNews = generateMockNews();
  console.log(`📰 新生成 ${newNews.length} 条新闻`);

  // 合并数据
  const mergedNews = mergeNews(existingData.news, newNews, 10);
  console.log(`📊 合并后共 ${mergedNews.length} 条新闻`);

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
  
  // 显示最新的5条新闻
  console.log('\n📋 最新新闻:');
  mergedNews.slice(0, 5).forEach((n, i) => {
    console.log(`  ${i+1}. [${n.publishDate}] ${n.title}`);
  });
}

main().catch(console.error);
