import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, ExternalLink, Heart, Eye, GitFork, Filter } from "lucide-react";

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  image: string;
  tags: string[];
  likes: number;
  views: number;
  forks: number;
  tool: string;
  demoUrl: string;
  createdAt: string;
}

const showcaseData: ShowcaseItem[] = [
  {
    id: "1",
    title: "AI 智能简历生成器",
    description: "使用 Cursor + Claude 3.5 开发的智能简历生成工具，支持一键优化、AI 润色和多模板切换",
    author: "张明",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhangming",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop",
    tags: ["Cursor", "React", "AI"],
    likes: 234,
    views: 1890,
    forks: 45,
    tool: "Cursor",
    demoUrl: "#",
    createdAt: "2026-05-10",
  },
  {
    id: "2",
    title: "语音转文字实时字幕",
    description: "基于 Whisper API 的实时语音转文字工具，支持多语言和实时字幕显示",
    author: "李华",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lihua",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["Windsurf", "Python", "Whisper"],
    likes: 189,
    views: 1456,
    forks: 32,
    tool: "Windsurf",
    demoUrl: "#",
    createdAt: "2026-05-09",
  },
  {
    id: "3",
    title: "AI 图片风格迁移",
    description: "使用 Stable Diffusion 和 ControlNet 实现的图片风格迁移工具，支持多种艺术风格",
    author: "王芳",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wangfang",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
    tags: ["GitHub Copilot", "Next.js", "SD"],
    likes: 312,
    views: 2341,
    forks: 67,
    tool: "GitHub Copilot",
    demoUrl: "#",
    createdAt: "2026-05-08",
  },
  {
    id: "4",
    title: "智能代码审查助手",
    description: "自动分析代码质量、发现潜在 Bug 并提供修复建议的 AI 工具",
    author: "陈杰",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chenjie",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    tags: ["Cursor", "TypeScript", "AI"],
    likes: 156,
    views: 1123,
    forks: 28,
    tool: "Cursor",
    demoUrl: "#",
    createdAt: "2026-05-07",
  },
  {
    id: "5",
    title: "AI 数据分析仪表盘",
    description: "自然语言查询数据库，自动生成可视化图表和数据分析报告",
    author: "刘洋",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liuyang",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["Windsurf", "Vue", "SQL"],
    likes: 278,
    views: 1987,
    forks: 54,
    tool: "Windsurf",
    demoUrl: "#",
    createdAt: "2026-05-06",
  },
  {
    id: "6",
    title: "多语言 AI 翻译器",
    description: "支持 50+ 语言的实时翻译工具，保留原文格式和语境",
    author: "赵雪",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoxue",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    tags: ["GitHub Copilot", "React", "NLP"],
    likes: 198,
    views: 1567,
    forks: 41,
    tool: "GitHub Copilot",
    demoUrl: "#",
    createdAt: "2026-05-05",
  },
];

const toolFilters = ["全部", "Cursor", "Windsurf", "GitHub Copilot", "Trae", "v0"];

export default function VibeShowcase() {
  const [selectedTool, setSelectedTool] = useState("全部");
  const navigate = useNavigate();

  const filteredItems = selectedTool === "全部"
    ? showcaseData
    : showcaseData.filter(item => item.tool === selectedTool);

  return (
    <section id="showcase-section" className="mb-12">
      <div className="section-header">
        <div>
          <h2 className="section-title">🎨 Vibe Coding 作品展示</h2>
          <p className="section-subtitle">探索开发者使用 AI 工具创作的优秀作品，获取灵感</p>
        </div>
      </div>

      {/* Tool Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Filter className="w-4 h-4 text-text-muted mt-2" />
        {toolFilters.map((tool) => (
          <button
            key={tool}
            onClick={() => setSelectedTool(tool)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedTool === tool
                ? "bg-primary text-white shadow-sm"
                : "bg-surface text-text-secondary hover:bg-background border border-border"
            }`}
          >
            {tool}
          </button>
        ))}
      </div>

      {/* Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => navigate(`/showcase/${item.id}`)}
            className="group card-base card-hover overflow-hidden animate-slide-up cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                <span className="tag bg-white/90 text-text-primary text-xs">
                  {item.tool}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-background text-text-muted rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author & Stats */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center space-x-2">
                  <img
                    src={item.authorAvatar}
                    alt={item.author}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-xs text-text-secondary">{item.author}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-text-muted">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-3.5 h-3.5" />
                    <span>{item.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{item.views}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <GitFork className="w-3.5 h-3.5" />
                    <span>{item.forks}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Code2 className="w-12 h-12 text-text-light mx-auto mb-3" />
          <p className="text-text-muted">该工具下暂无作品</p>
        </div>
      )}
    </section>
  );
}
