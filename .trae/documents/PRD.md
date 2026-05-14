# AI导航 - 产品经理的AI资讯平台

## 产品需求文档 (PRD)

**版本**: v2.1  
**更新日期**: 2026-05-14  
**作者**: AI导航团队

---

## 1. 产品概述

### 1.1 产品定位
为产品经理打造的 AI 技术资讯平台，聚合每日 AI 新闻、工具数据和开发更新，助力产品经理快速了解 AI 技术趋势，做出更好的产品决策。

### 1.2 目标用户
- 产品经理（PM）
- 技术负责人
- AI 行业从业者
- 对 AI 技术感兴趣的专业人士

### 1.3 核心价值
- **时效性**: 每日自动更新 AI 行业最新动态
- **专业性**: 聚焦产品经理视角，筛选有价值的信息
- **数据驱动**: 提供工具 MAU、评分等核心指标数据
- **实用性**: 提供工具使用手册和快速入门指南

---

## 2. 功能模块

### 2.1 每日AI动态（新闻模块）
- 展示 AI 行业最新新闻，按分类筛选
- 支持大模型、AI应用、技术突破、业界动态、产品发布等分类
- 热门新闻置顶展示
- 每条新闻展示来源、发布时间、浏览量
- **数据更新**: 每天自动采集，保留最近 10 天数据

### 2.2 AI工具分类墙（工具模块）
- 展示 20 个主流 AI 工具
- 按类别筛选：文本生成、图像生成、视频生成、代码助手、AI Agent、设计工具
- 每个工具展示：MAU、评分、价格、核心功能
- 点击工具进入详情页，展示使用手册
- **数据更新**: 每周自动更新 MAU 数据

### 2.3 Vibe Coding 工具更新（更新模块）
- 追踪 Cursor、Copilot、Windsurf 等开发工具的最新更新
- 按时间线展示，支持按工具筛选
- 每条更新展示版本号、更新类型、更新日志
- **数据更新**: 每天自动采集 GitHub Release，保留最近 10 天数据

### 2.4 Vibe Coding 作品展示（作品模块）
- 展示开发者使用 AI 工具创作的优秀作品
- 支持按工具筛选（Cursor、Windsurf、Copilot 等）
- 每个作品展示：作者、点赞、浏览、复刻数据
- 点击作品进入详情页

### 2.5 右侧悬浮导航
- 快速跳转到各模块
- 自动高亮当前所在模块
- 回到顶部按钮

---

## 3. 技术架构

### 3.1 前端技术栈
- React 18 + TypeScript
- Vite 6（构建工具）
- Tailwind CSS（样式框架）
- React Router 6（路由）
- Lucide React（图标库）

### 3.2 数据架构
- 数据存储: JSON 文件（`src/data/`）
- 数据更新: GitHub Actions 自动采集
- 部署: Cloudflare Pages（静态托管）

### 3.3 自动采集系统

#### 3.3.1 采集频率
| 数据类型 | 采集频率 | 数据源 |
|---------|---------|--------|
| 新闻 | 每天 8:00 | RSS/API |
| 工具更新 | 每天 8:00 | GitHub Release API |
| 工具数据 | 每周一 8:00 | GitHub API + 模拟增长 |

#### 3.3.2 采集脚本
- `scripts/collect-news.mjs`: 新闻采集（ESM 格式）
- `scripts/collect-updates.mjs`: 工具更新采集（ESM 格式）
- `scripts/collect-tools.mjs`: 工具数据采集（ESM 格式）

#### 3.3.3 数据保留策略
- **新闻数据**: 保留最近 10 天，最多 20 条
- **更新数据**: 保留最近 10 天，最多 15 条
- **工具数据**: 保留最近 10 天，MAU 自动增长模拟
- **自动清理**: 每天运行时自动删除过期数据

#### 3.3.4 工作流配置
- `.github/workflows/auto-update-data.yml`: GitHub Actions 定时任务
- 支持手动触发（workflow_dispatch）
- 自动提交并推送更新
- **触发网站重建**: 数据更新后自动创建空提交触发 Cloudflare Pages 重新构建

---

## 4. UI/UX 设计

### 4.1 设计原则
- 简约美观（参考携程官网风格）
- 浅色主题，蓝色主色调（#2577E3）
- 大量留白，卡片式布局
- 响应式设计，支持移动端

### 4.2 页面结构
```
├── Header（固定导航栏）
│   ├── Logo
│   ├── 导航链接（首页/新闻/工具/更新/作品）
│   └── 搜索框
├── Main Content
│   ├── Hero Section（首屏介绍）
│   ├── 新闻模块
│   ├── 工具模块
│   ├── 更新模块
│   └── 作品模块
├── Footer（页脚）
└── Floating Nav（右侧悬浮导航）
```

### 4.3 交互设计
- 导航栏点击平滑滚动到对应模块
- 卡片悬停效果（阴影、上浮）
- 详情页返回按钮回到对应模块
- 页面进入动画（fade-in、slide-up）

---

## 5. 数据规范

### 5.1 新闻数据
```typescript
interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  publishDate: string;
  category: "llm" | "ai-app" | "tech-breakthrough" | "industry" | "product";
  tags: string[];
  isHot: boolean;
  views: number;
}
```

### 5.2 工具数据
```typescript
interface Tool {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: "text" | "image" | "video" | "code" | "agent" | "design";
  mau: number;
  rating: number;
  updateFrequency: "daily" | "weekly" | "monthly";
  website: string;
  features: string[];
  pricing: "free" | "freemium" | "paid";
}
```

### 5.3 更新数据
```typescript
interface Update {
  id: string;
  toolId: string;
  toolName: string;
  toolLogo: string;
  version: string;
  updateDate: string;
  updateType: "feature" | "improvement" | "fix";
  title: string;
  description: string;
  changelog: string[];
}
```

---

## 6. 版本历史

### v2.1 (2026-05-14)
- **优化数据保留策略**: 只保留最近 10 天数据，自动清理过期数据
- **优化数据质量**: 改进模拟数据生成逻辑，标题包含日期避免重复
- **修复网站重建问题**: workflow 更新数据后自动触发 Cloudflare Pages 重新构建
- **优化滚动体验**: 使用自定义缓动函数，避免导航滚动晃眼
- **修复卡片对齐**: 统一新闻卡片高度，使用 flex 布局
- **修复浮动导航**: tooltip 宽度统一，hover 时才显示

### v2.0 (2026-05-12)
- 新增自动数据采集系统（GitHub Actions）
- 新增右侧悬浮导航栏
- 新增工具详情页使用手册
- 新增作品详情页
- 更新数据为 2026 年 5 月真实数据
- 优化卡片对齐布局
- 修复详情页滚动问题

### v1.2 (2026-05-11)
- 新增 Vibe Coding 作品展示区
- 新增导航栏点击跳转功能
- 新增作品详情页
- 优化 UI 色调为浅色主题

### v1.1 (2026-05-10)
- 新增工具详情页
- 新增 Codex、Gemini、Kimi、Windsurf 工具
- 修复 TypeScript 类型错误
- 优化新闻卡片布局

### v1.0 (2026-05-09)
- 初始版本发布
- 包含新闻、工具、更新三大模块
- 支持分类筛选和搜索
- 部署到 Cloudflare Pages

---

## 7. 后续规划

### 7.1 短期计划（1-2周）
- [ ] 接入真实 RSS API 采集新闻
- [ ] 接入 GitHub API 采集工具更新
- [ ] 添加数据更新日志页面
- [ ] 优化移动端体验

### 7.2 中期计划（1-2月）
- [ ] 添加用户收藏功能
- [ ] 添加邮件订阅功能
- [ ] 添加搜索功能
- [ ] 添加数据导出功能

### 7.3 长期计划（3-6月）
- [ ] 添加用户评论功能
- [ ] 添加社区讨论区
- [ ] 添加 AI 工具对比功能
- [ ] 添加行业报告生成功能

---

## 8. 附录

### 8.1 数据源清单
| 数据类型 | 数据源 | 更新频率 |
|---------|--------|---------|
| AI新闻 | 机器之心、36氪、TechCrunch | 每日 |
| 工具更新 | GitHub Release API | 每日 |
| 工具数据 | GitHub API、Product Hunt | 每周 |
| 工具MAU | SimilarWeb、公开财报 | 每月 |


### 8.2 技术限制
- GitHub API 有每小时 60 次请求限制（未认证）或 5000 次（认证后）
- 需要配置 GITHUB_TOKEN 环境变量以提升额度
- RSS 源可能受反爬限制，建议添加延迟和 User-Agent


### 8.3 维护建议
- 定期检查脚本运行日志
- 监控 GitHub API 额度使用
- 每月核实工具 MAU 数据准确性
- 建立数据异常告警机制

---


**文档结束**