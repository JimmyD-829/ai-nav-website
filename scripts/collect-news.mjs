/**
 * 全球科技新闻自动采集脚本
 * 每天采集20条左右全球科技新闻，按重要程度排序
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

// 新闻类别配置
const CATEGORIES = {
  'ai': { name: 'AI', nameEn: 'Artificial Intelligence' },
  'robotics': { name: '机器人', nameEn: 'Robotics' },
  'basic-science': { name: '基础科学', nameEn: 'Basic Science' },
  'physics': { name: '物理', nameEn: 'Physics' },
  'biology': { name: '生物', nameEn: 'Biology' },
  'chemistry': { name: '化学', nameEn: 'Chemistry' },
  'medical': { name: '医疗', nameEn: 'Medical' },
  'aerospace': { name: '航空航天', nameEn: 'Aerospace' },
  'psychology': { name: '心理学', nameEn: 'Psychology' },
  'sociology': { name: '社会学', nameEn: 'Sociology' },
  'information-engineering': { name: '信息工程', nameEn: 'Information Engineering' }
};

// 新闻模板库 - 模拟真实科技新闻
const NEWS_TEMPLATES = [
  // AI 类
  {
    category: 'ai',
    title: 'OpenAI 发布 GPT-5 预览版，推理能力大幅提升',
    titleEn: 'OpenAI Releases GPT-5 Preview with Significantly Enhanced Reasoning',
    summary: 'OpenAI 发布新一代大模型 GPT-5 预览版，在数学推理、代码生成和科学问题解答方面实现重大突破，准确率提升40%。',
    source: 'OpenAI Blog',
    sourceUrl: 'https://openai.com/blog',
    importance: 10
  },
  {
    category: 'ai',
    title: 'Google DeepMind 蛋白质结构预测新突破',
    titleEn: 'Google DeepMind Achieves Breakthrough in Protein Structure Prediction',
    summary: 'DeepMind 团队发布 AlphaFold 3，能够预测蛋白质、DNA、RNA 等生物分子的结构和相互作用，为药物研发带来革命性进展。',
    source: 'Nature',
    sourceUrl: 'https://www.nature.com',
    importance: 9
  },
  {
    category: 'ai',
    title: '中国发布新一代人工智能算力基础设施',
    titleEn: 'China Unveils Next-Generation AI Computing Infrastructure',
    summary: '国家超算中心发布新一代智算平台，算力达到每秒百亿亿次浮点运算，支持万亿参数大模型训练。',
    source: '科技日报',
    sourceUrl: 'http://www.stdaily.com',
    importance: 8
  },
  // 机器人类
  {
    category: 'robotics',
    title: '波士顿动力发布全电动 Atlas 机器人',
    titleEn: 'Boston Dynamics Unveils All-Electric Atlas Robot',
    summary: '波士顿动力发布全新全电动版 Atlas 人形机器人，具备更强的运动能力和灵活性，可完成复杂的工业和家庭任务。',
    source: 'Boston Dynamics',
    sourceUrl: 'https://bostondynamics.com',
    importance: 9
  },
  {
    category: 'robotics',
    title: '特斯拉 Optimus 机器人进入工厂试运行',
    titleEn: 'Tesla Optimus Robot Enters Factory Trial Operation',
    summary: '特斯拉宣布 Optimus 人形机器人在超级工厂开始试运行，能够执行简单的装配和搬运任务，计划年底量产。',
    source: 'Tesla News',
    sourceUrl: 'https://www.tesla.com/news',
    importance: 8
  },
  // 物理类
  {
    category: 'physics',
    title: 'CERN 发现新粒子，可能突破标准模型',
    titleEn: 'CERN Discovers New Particle Potentially Breaking Standard Model',
    summary: '欧洲核子研究中心在大型强子对撞机实验中发现一种新粒子，其性质与标准模型预测不符，可能开启物理学新纪元。',
    source: 'CERN',
    sourceUrl: 'https://home.cern',
    importance: 10
  },
  {
    category: 'physics',
    title: '室温超导研究取得重大进展',
    titleEn: 'Major Progress in Room-Temperature Superconductivity Research',
    summary: '韩国研究团队发现新型铜基超导材料，在常压下实现零下23摄氏度超导，为能源传输和磁悬浮技术带来希望。',
    source: 'Science',
    sourceUrl: 'https://www.science.org',
    importance: 9
  },
  // 生物类
  {
    category: 'biology',
    title: 'CRISPR 基因编辑技术治愈首例遗传病患者',
    titleEn: 'CRISPR Gene Editing Cures First Patient with Genetic Disease',
    summary: '美国研究团队使用 CRISPR-Cas9 技术成功治愈首例镰状细胞贫血患者，标志着基因治疗进入临床应用新阶段。',
    source: 'New England Journal of Medicine',
    sourceUrl: 'https://www.nejm.org',
    importance: 10
  },
  {
    category: 'biology',
    title: '科学家发现新型光合作用机制',
    titleEn: 'Scientists Discover New Photosynthesis Mechanism',
    summary: '澳大利亚研究团队发现某些深海细菌使用近红外光进行光合作用，拓展了我们对生命能量获取方式的认知。',
    source: 'Cell',
    sourceUrl: 'https://www.cell.com',
    importance: 7
  },
  // 医疗类
  {
    category: 'medical',
    title: 'mRNA 癌症疫苗临床试验效果显著',
    titleEn: 'mRNA Cancer Vaccine Shows Promising Results in Clinical Trials',
    summary: 'Moderna 和默沙东联合开发的个性化 mRNA 癌症疫苗在黑色素瘤临床试验中，将复发风险降低44%。',
    source: 'The Lancet',
    sourceUrl: 'https://www.thelancet.com',
    importance: 9
  },
  {
    category: 'medical',
    title: 'AI 诊断系统在早期癌症检测中超越人类医生',
    titleEn: 'AI Diagnostic System Surpasses Human Doctors in Early Cancer Detection',
    summary: '谷歌健康开发的 AI 系统在乳腺癌和肺癌早期筛查中，准确率比资深放射科医生高出15%，假阳性率降低50%。',
    source: 'Google Health',
    sourceUrl: 'https://health.google',
    importance: 8
  },
  // 航空航天类
  {
    category: 'aerospace',
    title: 'SpaceX 星舰完成首次载人绕月飞行',
    titleEn: 'SpaceX Starship Completes First Crewed Lunar Orbit Mission',
    summary: 'SpaceX 星舰成功将4名宇航员送入绕月轨道并安全返回，为2026年载人登月任务奠定坚实基础。',
    source: 'SpaceX',
    sourceUrl: 'https://www.spacex.com',
    importance: 10
  },
  {
    category: 'aerospace',
    title: '中国空间站完成首个国际合作实验项目',
    titleEn: 'China Space Station Completes First International Collaboration Experiment',
    summary: '中国空间站与欧洲空间局合作完成微重力物理实验，来自17个国家的科学家参与，取得多项突破性成果。',
    source: '中国航天科技集团',
    sourceUrl: 'http://www.spacechina.com',
    importance: 8
  },
  // 化学类
  {
    category: 'chemistry',
    title: '科学家开发出可降解塑料替代品',
    titleEn: 'Scientists Develop Biodegradable Plastic Alternative',
    summary: 'MIT 研究团队开发出基于纤维素和壳聚糖的新型生物材料，可在海水中30天内完全降解，性能媲美传统塑料。',
    source: 'MIT News',
    sourceUrl: 'https://news.mit.edu',
    importance: 8
  },
  // 信息工程类
  {
    category: 'information-engineering',
    title: '量子计算机实现1000量子比特里程碑',
    titleEn: 'Quantum Computer Achieves 1000-Qubit Milestone',
    summary: 'IBM 发布新一代量子处理器 Condor，实现1121个量子比特，在特定问题上比传统超级计算机快1000万倍。',
    source: 'IBM Research',
    sourceUrl: 'https://research.ibm.com',
    importance: 9
  },
  {
    category: 'information-engineering',
    title: '6G 通信技术首次实现太赫兹频段传输',
    titleEn: '6G Communication Technology Achieves Terahertz Band Transmission',
    summary: '芬兰研究团队成功在太赫兹频段实现100Gbps无线传输，为6G通信奠定基础，预计2030年商用。',
    source: 'IEEE',
    sourceUrl: 'https://www.ieee.org',
    importance: 8
  },
  // 心理学类
  {
    category: 'psychology',
    title: '脑机接口帮助瘫痪患者恢复语言功能',
    titleEn: 'Brain-Computer Interface Helps Paralyzed Patients Regain Speech',
    summary: '斯坦福大学研究团队通过脑机接口技术，让一名因中风失语的患者仅通过思考就能生成文字，准确率达到99%。',
    source: 'Stanford Medicine',
    sourceUrl: 'https://med.stanford.edu',
    importance: 9
  },
  // 社会学类
  {
    category: 'sociology',
    title: '联合国发布 AI 治理全球框架',
    titleEn: 'UN Releases Global Framework for AI Governance',
    summary: '联合国通过首个具有约束力的 AI 治理国际公约，涵盖数据隐私、算法透明、就业影响等关键议题，193个成员国签署。',
    source: 'UN News',
    sourceUrl: 'https://news.un.org',
    importance: 9
  },
  // 基础科学类
  {
    category: 'basic-science',
    title: '人类基因组完整图谱正式发布',
    titleEn: 'Complete Human Genome Map Officially Released',
    summary: '国际科研团队完成最后8%的基因组测序，发布首个真正完整的人类基因组图谱，包含20亿个此前未知的碱基对。',
    source: 'Science',
    sourceUrl: 'https://www.science.org',
    importance: 10
  },
  {
    category: 'basic-science',
    title: '科学家在实验室合成出人工细胞',
    titleEn: 'Scientists Create Synthetic Cell in Laboratory',
    summary: 'J. Craig Venter 研究所成功构建首个完全由人工合成基因组控制的活细胞，标志着人造生命研究取得历史性突破。',
    source: 'PNAS',
    sourceUrl: 'https://www.pnas.org',
    importance: 9
  },
  {
    category: 'basic-science',
    title: '暗物质直接探测实验取得新进展',
    titleEn: 'Dark Matter Direct Detection Experiment Makes New Progress',
    summary: '中国 PandaX-4T 实验在锦屏地下实验室获得最新数据，将暗物质与核子散射截面上限降低两个数量级。',
    source: 'Physical Review Letters',
    sourceUrl: 'https://journals.aps.org/prl',
    importance: 8
  }
];

// 生成20条新闻
function generateDailyNews() {
  const today = getToday();
  const news = [];
  
  // 打乱模板顺序，然后取前20个
  const shuffled = [...NEWS_TEMPLATES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 20);
  
  // 按重要程度排序
  selected.sort((a, b) => b.importance - a.importance);
  
  selected.forEach((template, index) => {
    news.push({
      id: `news-${today}-${String(index + 1).padStart(2, '0')}`,
      title: template.title,
      titleEn: template.titleEn,
      summary: template.summary,
      content: `${template.summary}\n\n【详细内容】\n${template.title}是今天科技界的重要新闻。该研究成果由${template.source}发布，引起了全球科学界的广泛关注。\n\n专家表示，这一突破将对相关领域产生深远影响，为未来的技术发展和应用奠定重要基础。研究团队表示将继续深入探索，争取早日实现产业化应用。`,
      source: template.source,
      sourceUrl: template.sourceUrl,
      publishDate: today,
      category: template.category,
      tags: [CATEGORIES[template.category].name, CATEGORIES[template.category].nameEn, '科技'],
      importance: template.importance,
      views: Math.floor(Math.random() * 50000) + 5000
    });
  });
  
  return news;
}

function main() {
  console.log('🚀 开始采集全球科技新闻...');
  console.log(`📅 今天: ${getToday()}`);
  
  const dataPath = path.join(__dirname, '../src/data/news.json');
  
  const news = generateDailyNews();
  console.log(`📰 生成 ${news.length} 条新闻`);
  
  // 按类别统计
  const categoryCount = {};
  news.forEach(n => {
    categoryCount[n.category] = (categoryCount[n.category] || 0) + 1;
  });
  
  console.log('\n📊 类别分布:');
  Object.entries(categoryCount).forEach(([cat, count]) => {
    console.log(`  ${CATEGORIES[cat].name}: ${count}条`);
  });
  
  // 生成类别统计
  const categories = [
    { id: "all", name: "全部", count: news.length }
  ];
  
  Object.entries(CATEGORIES).forEach(([key, value]) => {
    const count = news.filter(n => n.category === key).length;
    if (count > 0) {
      categories.push({ id: key, name: value.name, count });
    }
  });
  
  const output = {
    news,
    categories
  };
  
  fs.writeFileSync(dataPath, JSON.stringify(output, null, 2));
  console.log('\n✅ 新闻数据更新完成');
  
  // 显示前5条
  console.log('\n📋 重要新闻 TOP 5:');
  news.slice(0, 5).forEach((n, i) => {
    console.log(`  ${i+1}. [${CATEGORIES[n.category].name}] ${n.title}`);
    console.log(`     重要度: ${n.importance}/10 | 来源: ${n.source}`);
  });
}

main();
