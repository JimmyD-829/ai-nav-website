import { useState } from "react";
import { Star, GitFork, ExternalLink, Github, Code2, Trophy, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import vibecodingData from "../../data/vibecoding.json";

interface ShowcaseItem {
  id: string;
  title: string;
  fullName: string;
  description: string;
  author: string;
  authorAvatar: string;
  authorUrl: string;
  image: string;
  tags: string[];
  likes: number;
  views: number;
  forks: number;
  language: string;
  languageColor: string;
  repoUrl: string;
  homepage: string | null;
  createdAt: string;
  updatedAt: string;
  collectedAt: string;
  rank: number;
  openIssues: number;
}

const getCategoryFilters = (items: ShowcaseItem[]): string[] => {
  const categories = new Set<string>();
  items.forEach(item => {
    if (item.tags[0]) categories.add(item.tags[0]);
  });
  return ["全部", ...Array.from(categories)];
};

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

export default function VibeShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const navigate = useNavigate();

  const showcases: ShowcaseItem[] = vibecodingData.showcases || [];
  const meta = (vibecodingData as any).meta || {};

  const categoryFilters = getCategoryFilters(showcases);

  const filteredItems = selectedCategory === "全部"
    ? showcases
    : showcases.filter(item => item.tags[0] === selectedCategory);

  // 首页只展示前6个
  const displayItems = filteredItems.slice(0, 6);

  return (
    <section id="vibecoding-section" className="mb-12">
      <div className="section-header">
        <div>
          <h2 className="section-title flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            VibeCoding 作品展示
          </h2>
          <p className="section-subtitle">
            探索 GitHub 上最新的 VibeCoding 相关热门项目，发现 AI 辅助编程的创意作品
            {meta.collectedAt && (
              <span className="text-text-muted ml-2">· 更新于 {meta.collectedAt}</span>
            )}
          </p>
        </div>
        <button
          onClick={() => navigate('/vibecoding')}
          className="btn-secondary flex items-center gap-1.5 text-sm"
        >
          查看全部
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6 items-center">
        <Code2 className="w-4 h-4 text-text-muted" />
        {categoryFilters.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-purple-500 text-white shadow-sm"
                : "bg-surface text-text-secondary hover:bg-background border border-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Showcase Grid - 首页展示6个 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayItems.map((item, index) => (
          <div
            key={item.id}
            className="group card-base card-hover overflow-hidden animate-slide-up h-full flex flex-col"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden bg-surface">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {/* Rank Badge */}
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                  item.rank <= 3
                    ? 'bg-yellow-500 text-white'
                    : 'bg-black/60 text-white backdrop-blur-sm'
                }`}>
                  {item.rank <= 3 ? <Trophy className="w-3.5 h-3.5" /> : item.rank}
                </span>
              </div>
              {/* Category Badge */}
              <div className="absolute bottom-3 left-3">
                <span className="tag text-xs text-white font-medium px-2.5 py-1 rounded-full bg-purple-500/80">
                  {item.tags[0]}
                </span>
              </div>
              {/* Language Badge */}
              <div className="absolute bottom-3 right-3">
                <span
                  className="text-xs text-white font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: item.languageColor + 'cc' }}
                >
                  {item.language}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-text-primary group-hover:text-purple-500 transition-colors line-clamp-1 text-sm mb-1">
                {item.title}
              </h3>
              <a
                href={item.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-muted hover:text-primary transition-colors inline-flex items-center gap-1 mb-2"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={item.authorAvatar} alt={item.author} className="w-3.5 h-3.5 rounded-full" />
                {item.author}
              </a>

              <p className="text-sm text-text-secondary line-clamp-2 mb-3 flex-grow">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.tags.slice(1, 3).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-[10px] bg-background text-text-muted rounded border border-border">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1" title="Stars">
                    <Star className="w-3.5 h-3.5 text-yellow-500" />
                    <span className="font-medium">{formatNumber(item.likes)}</span>
                  </span>
                  <span className="flex items-center gap-1" title="Forks">
                    <GitFork className="w-3.5 h-3.5" />
                    <span>{formatNumber(item.forks)}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-surface hover:bg-background border border-border rounded-lg text-xs font-medium text-text-secondary hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-3.5 h-3.5" />
                  仓库
                </a>
                {item.homepage && (
                  <a
                    href={item.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-surface hover:bg-background border border-border rounded-lg text-xs font-medium text-text-secondary hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    官网
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayItems.length === 0 && (
        <div className="text-center py-12">
          <Code2 className="w-12 h-12 text-text-light mx-auto mb-3" />
          <p className="text-text-muted">该分类下暂无作品</p>
        </div>
      )}
    </section>
  );
}
