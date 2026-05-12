# AI 资讯导航站 - 技术架构文档

## 1. 项目架构概览

```
┌─────────────────────────────────────────────────────────┐
│                      前端应用层                          │
│  React + Vite + Tailwind CSS + React Router            │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                      组件层                              │
│  Header │ NewsCard │ ToolCard │ UpdateTimeline │ Footer │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                      状态管理层                          │
│  React Context + Hooks (本地状态管理)                    │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                      数据层                              │
│  Mock JSON Data + API Service Layer (预留)              │
└─────────────────────────────────────────────────────────┘
```

---

## 2. 技术栈选型

### 2.1 核心技术

| 技术选型 | 版本 | 用途说明 |
|---------|------|----------|
| React | 18.x | UI框架，组件化开发 |
| Vite | 5.x | 快速构建工具，开发体验优化 |
| Tailwind CSS | 3.x | 原子化CSS框架，高效样式开发 |
| React Router | 6.x | 页面路由管理 |
| Lucide React | latest | 图标库，科技感图标方案 |

### 2.2 辅助工具

| 工具 | 用途 |
|------|------|
| autoprefixer | CSS前缀自动补全 |
| postcss | CSS转换工具 |
| @vitejs/plugin-react | React插件支持 |

---

## 3. 项目目录结构

```
ai-news-hub/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── news/
│   │   │   ├── NewsCard.jsx
│   │   │   ├── NewsList.jsx
│   │   │   └── NewsFilter.jsx
│   │   ├── tools/
│   │   │   ├── ToolCard.jsx
│   │   │   ├── ToolGrid.jsx
│   │   │   └── ToolCategory.jsx
│   │   └── updates/
│   │       ├── UpdateCard.jsx
│   │       └── UpdateTimeline.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── NewsDetail.jsx
│   │   └── Category.jsx
│   ├── data/
│   │   ├── news.json
│   │   ├── tools.json
│   │   └── updates.json
│   ├── context/
│   │   └── AppContext.jsx
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 4. 路由设计

| 路由路径 | 页面组件 | 功能描述 |
|---------|---------|----------|
| `/` | Home | 首页综合展示 |
| `/news/:id` | NewsDetail | 新闻详情页 |
| `/tools/:category` | Category | 工具分类页 |
| `/updates` | Updates | Vibe Coding更新页 |

---

## 5. 数据模型设计

### 5.1 新闻数据结构 (News)

```typescript
interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  publishDate: string;
  category: 'llm' | 'ai-app' | 'tech-breakthrough' | 'industry' | 'product';
  tags: string[];
  isHot: boolean;
  views: number;
}
```

### 5.2 工具数据结构 (Tool)

```typescript
interface Tool {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: 'text' | 'image' | 'video' | 'code' | 'agent' | 'design';
  mau: number;
  rating: number;
  updateFrequency: 'daily' | 'weekly' | 'monthly';
  website: string;
  features: string[];
  pricing: 'free' | 'freemium' | 'paid';
}
```

### 5.3 更新数据结构 (Update)

```typescript
interface Update {
  id: string;
  toolId: string;
  toolName: string;
  version: string;
  updateDate: string;
  updateType: 'feature' | 'improvement' | 'fix';
  title: string;
  description: string;
  changelog: string[];
}
```

---

## 6. 组件架构

### 6.1 布局组件 (Layout)

```
Layout
├── Header
│   ├── Logo
│   ├── Navigation
│   └── SearchBar
└── Footer
```

### 6.2 新闻模块组件

```
NewsSection
├── NewsFilter (分类筛选)
├── NewsList
│   └── NewsCard[]
└── HotNewsBanner
```

### 6.3 工具模块组件

```
ToolsSection
├── CategoryTabs
├── ToolGrid
│   └── ToolCard[]
└── ToolCard
    ├── Logo
    ├── Name
    ├── Metrics (MAU, Rating)
    └── Category Badge
```

### 6.4 更新模块组件

```
UpdatesSection
├── UpdateTimeline
│   └── UpdateCard[]
└── UpdateCard
    ├── ToolInfo
    ├── VersionBadge
    ├── UpdateContent
    └── Changelog
```

---

## 7. 样式系统设计

### 7.1 Tailwind CSS 配置

```javascript
// tailwind.config.js 关键配置
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        accent: '#22D3EE',
        background: '#0F172A',
        card: '#1E293B',
        'text-primary': '#F1F5F9',
        'text-secondary': '#94A3B8',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### 7.2 全局CSS变量

```css
:root {
  --color-primary: #6366F1;
  --color-accent: #22D3EE;
  --color-bg: #0F172A;
  --color-card: #1E293B;
  --color-text: #F1F5F9;
  --color-muted: #94A3B8;
  --radius: 8px;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
```

---

## 8. 性能优化策略

| 优化点 | 实现方案 |
|-------|----------|
| 首屏加载 | 骨架屏 + 代码分割 |
| 图片加载 | Lazy loading + WebP格式 |
| 列表渲染 | 虚拟滚动（大数据量时） |
| 样式 | Tailwind purge未使用样式 |
| 缓存 | 浏览器缓存策略 |

---

## 9. Mock 数据服务

### 9.1 数据存储方案

- 使用 `/src/data/*.json` 文件存储模拟数据
- 提供 `src/services/api.js` 封装数据获取接口
- 接口设计预留真实API对接

### 9.2 API 接口预留

```javascript
// 预留接口结构
GET /api/news - 获取新闻列表
GET /api/news/:id - 获取新闻详情
GET /api/tools - 获取工具列表
GET /api/tools/:category - 按分类获取工具
GET /api/updates - 获取更新列表
```

---

## 10. 浏览器兼容性

| 浏览器 | 最低版本 |
|-------|----------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

---

## 11. 开发工作流

### 11.1 开发命令

```bash
npm install    # 安装依赖
npm run dev    # 启动开发服务器
npm run build  # 生产环境构建
npm run preview # 预览构建结果
```

### 11.2 代码规范

- 使用 ESLint 进行代码检查
- 使用 Prettier 格式化代码
- 组件采用 Functional Component + Hooks
- 文件命名采用 PascalCase（组件）或 camelCase（工具函数）
