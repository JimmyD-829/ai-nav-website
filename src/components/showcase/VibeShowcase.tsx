import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, Heart, Eye, GitFork, Filter } from "lucide-react";
import showcaseData from "../../data/showcase.json";

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

const toolFilters = ["全部", "Cursor", "Windsurf", "GitHub Copilot", "Trae", "v0"];

export default function VibeShowcase() {
  const [selectedTool, setSelectedTool] = useState("全部");
  const navigate = useNavigate();

  const showcases: ShowcaseItem[] = showcaseData.showcases;

  const filteredItems = selectedTool === "全部"
    ? showcases
    : showcases.filter(item => item.tool === selectedTool);

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
            className="group card-base card-hover overflow-hidden animate-slide-up cursor-pointer h-full flex flex-col"
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
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary line-clamp-2 mb-3 flex-grow">
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
              <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
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
