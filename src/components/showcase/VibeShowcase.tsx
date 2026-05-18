import { useState } from "react";
import { Star, GitFork, Eye, ExternalLink, Github, Code2, Trophy } from "lucide-react";
import showcaseData from "../../data/showcase.json";

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

// 语言筛选器，基于实际数据动态生成
const getLanguageFilters = (items: ShowcaseItem[]): string[] => {
  const languages = new Set<string>();
  items.forEach(item => {
    if (item.language && item.language !== 'Unknown') {
      languages.add(item.language);
    }
  });
  return ["全部", ...Array.from(languages).sort()];
};

// 格式化数字
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

export default function VibeShowcase() {
  const [selectedLanguage, setSelectedLanguage] = useState("全部");

  const showcases: ShowcaseItem[] = showcaseData.showcases || [];
  const meta = (showcaseData as any).meta || {};

  const languageFilters = getLanguageFilters(showcases);

  const filteredItems = selectedLanguage === "全部"
    ? showcases
    : showcases.filter(item => item.language === selectedLanguage);

  return (
    <section id="showcase-section" className="mb-12">
      <div className="section-header">
        <div>
          <h2 className="section-title">🏆 GitHub 热门开源项目</h2>
          <p className="section-subtitle">
            探索 GitHub 上 Stars 最多的优秀开源项目，获取灵感与学习资源
            {meta.collectedAt && (
              <span className="text-text-muted ml-2">· 更新于 {meta.collectedAt}</span>
            )}
          </p>
        </div>
      </div>

      {/* Language Filter */}
      <div className="flex flex-wrap gap-2 mb-6 items-center">
        <Code2 className="w-4 h-4 text-text-muted" />
        {languageFilters.map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLanguage(lang)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedLanguage === lang
                ? "bg-primary text-white shadow-sm"
                : "bg-surface text-text-secondary hover:bg-background border border-border"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className="group card-base card-hover overflow-hidden animate-slide-up h-full flex flex-col"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Image / Open Graph */}
            <div className="relative h-44 overflow-hidden bg-surface">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // 如果 Open Graph 图片加载失败，显示备用内容
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('flex', 'items-center', 'justify-center');
                    const icon = document.createElement('div');
                    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-text-light"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>';
                    parent.appendChild(icon);
                  }
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
              {/* Language Badge */}
              <div className="absolute bottom-3 left-3">
                <span
                  className="tag text-xs text-white font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: item.languageColor + 'dd' }}
                >
                  {item.language}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              {/* Title & Author */}
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <a
                  href={item.authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-text-muted hover:text-primary transition-colors inline-flex items-center gap-1 mt-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={item.authorAvatar}
                    alt={item.author}
                    className="w-3.5 h-3.5 rounded-full"
                  />
                  {item.author}
                </a>
              </div>

              <p className="text-sm text-text-secondary line-clamp-2 mb-3 flex-grow">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.tags.slice(1, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-background text-text-muted rounded-md border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                <div className="flex items-center space-x-3 text-xs text-text-muted">
                  <span className="flex items-center space-x-1" title="Stars">
                    <Star className="w-3.5 h-3.5 text-yellow-500" />
                    <span className="font-medium">{formatNumber(item.likes)}</span>
                  </span>
                  <span className="flex items-center space-x-1" title="Forks">
                    <GitFork className="w-3.5 h-3.5" />
                    <span>{formatNumber(item.forks)}</span>
                  </span>
                  <span className="flex items-center space-x-1" title="Open Issues">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{formatNumber(item.openIssues)}</span>
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

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Code2 className="w-12 h-12 text-text-light mx-auto mb-3" />
          <p className="text-text-muted">该语言下暂无项目</p>
        </div>
      )}
    </section>
  );
}
