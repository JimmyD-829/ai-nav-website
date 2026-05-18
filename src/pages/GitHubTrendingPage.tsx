import { useState } from "react";
import { Star, GitFork, Eye, ExternalLink, Github, Code2, Trophy, Flame, Calendar, TrendingUp } from "lucide-react";
import showcaseData from "../data/showcase.json";

interface TrendingItem {
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

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

const getLanguageFilters = (items: TrendingItem[]): string[] => {
  const languages = new Set<string>();
  items.forEach(item => {
    if (item.language && item.language !== 'Unknown') {
      languages.add(item.language);
    }
  });
  return ["全部", ...Array.from(languages).sort()];
};

export default function GitHubTrendingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("全部");

  const showcases: TrendingItem[] = showcaseData.showcases || [];
  const meta = (showcaseData as any).meta || {};

  const languageFilters = getLanguageFilters(showcases);

  const filteredItems = selectedLanguage === "全部"
    ? showcases
    : showcases.filter(item => item.language === selectedLanguage);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary">GitHub 热门开源项目</h1>
            </div>
          </div>
          <p className="text-text-secondary max-w-2xl">
            GitHub 上 Stars 最多的顶级开源项目，探索最受欢迎的技术仓库
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              更新于 {meta.collectedAt}
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              按 Stars 排序
            </span>
            <span className="flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5" />
              共 {showcases.length} 个项目
            </span>
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
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-surface text-text-secondary hover:bg-background border border-border"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group card-base card-hover overflow-hidden animate-slide-up h-full flex flex-col"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden bg-surface">
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
                <div className="absolute top-2 left-2">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                    item.rank <= 3
                      ? 'bg-yellow-500 text-white'
                      : 'bg-black/60 text-white backdrop-blur-sm'
                  }`}>
                    {item.rank <= 3 ? <Trophy className="w-3 h-3" /> : item.rank}
                  </span>
                </div>
                {/* Language Badge */}
                <div className="absolute bottom-2 right-2">
                  <span
                    className="text-xs text-white font-medium px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: item.languageColor + 'cc' }}
                  >
                    {item.language}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3.5 flex flex-col flex-grow">
                <h3 className="font-semibold text-text-primary group-hover:text-orange-500 transition-colors line-clamp-1 text-sm mb-1">
                  {item.title}
                </h3>
                <a
                  href={item.authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-text-muted hover:text-primary transition-colors inline-flex items-center gap-1 mb-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src={item.authorAvatar} alt={item.author} className="w-3 h-3 rounded-full" />
                  {item.author}
                </a>

                <p className="text-xs text-text-secondary line-clamp-2 mb-2 flex-grow">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.tags.slice(1, 3).map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 text-[10px] bg-background text-text-muted rounded border border-border">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
                  <div className="flex items-center gap-2 text-[10px] text-text-muted">
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span className="font-medium">{formatNumber(item.likes)}</span>
                    </span>
                    <span className="flex items-center gap-0.5">
                      <GitFork className="w-3 h-3" />
                      <span>{formatNumber(item.forks)}</span>
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Eye className="w-3 h-3" />
                      <span>{formatNumber(item.openIssues)}</span>
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1.5 mt-2">
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-surface hover:bg-background border border-border rounded-lg text-[10px] font-medium text-text-secondary hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-3 h-3" />
                    仓库
                  </a>
                  {item.homepage && (
                    <a
                      href={item.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-surface hover:bg-background border border-border rounded-lg text-[10px] font-medium text-text-secondary hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3 h-3" />
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
      </div>
    </div>
  );
}
