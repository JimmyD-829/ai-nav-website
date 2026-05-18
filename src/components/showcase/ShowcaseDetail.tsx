import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, GitFork, Eye, ExternalLink, Calendar, Github, Code2, Trophy, Globe } from "lucide-react";
import { useEffect } from "react";
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

export default function ShowcaseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const showcases: ShowcaseItem[] = (showcaseData as any).showcases || [];
  const item = showcases.find(s => s.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="text-center">
          <Code2 className="w-16 h-16 text-text-light mx-auto mb-4" />
          <h2 className="text-xl font-bold text-text-primary mb-2">项目未找到</h2>
          <p className="text-text-secondary mb-4">该项目可能不存在或已被移除</p>
          <button onClick={() => navigate("/", { state: { scrollTo: "showcase-section" } })} className="btn-primary">
            返回项目列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/", { state: { scrollTo: "showcase-section" } })}
          className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">返回项目列表</span>
        </button>

        {/* Header Image */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center space-x-2 mb-3">
              <span className="tag bg-yellow-500 text-white flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                第 {item.rank} 名
              </span>
              <span
                className="tag text-white font-medium"
                style={{ backgroundColor: item.languageColor + 'dd' }}
              >
                {item.language}
              </span>
              {item.tags.slice(1, 4).map(tag => (
                <span key={tag} className="tag bg-white/20 text-white">{tag}</span>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{item.title}</h1>
            <p className="text-white/80 text-sm mt-1">{item.fullName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="card-base p-6">
              <h2 className="text-lg font-bold text-text-primary mb-3">项目介绍</h2>
              <p className="text-text-secondary leading-relaxed">{item.description}</p>
            </div>

            {/* Tags */}
            <div className="card-base p-6">
              <h2 className="text-lg font-bold text-text-primary mb-3">标签</h2>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm bg-primary/5 text-primary rounded-lg font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <div className="card-base p-6">
              <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">作者信息</h3>
              <a
                href={item.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 mb-4 hover:opacity-80 transition-opacity"
              >
                <img
                  src={item.authorAvatar}
                  alt={item.author}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-text-primary">{item.author}</p>
                  <p className="text-xs text-text-muted">GitHub 用户</p>
                </div>
              </a>
            </div>

            {/* Stats */}
            <div className="card-base p-6">
              <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">数据统计</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2 text-text-secondary">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Stars</span>
                  </span>
                  <span className="font-semibold text-text-primary">{formatNumber(item.likes)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2 text-text-secondary">
                    <Eye className="w-4 h-4 text-primary" />
                    <span>Watchers</span>
                  </span>
                  <span className="font-semibold text-text-primary">{formatNumber(item.views)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2 text-text-secondary">
                    <GitFork className="w-4 h-4 text-accent" />
                    <span>Forks</span>
                  </span>
                  <span className="font-semibold text-text-primary">{formatNumber(item.forks)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2 text-text-secondary">
                    <Code2 className="w-4 h-4 text-text-muted" />
                    <span>Open Issues</span>
                  </span>
                  <span className="font-semibold text-text-primary">{formatNumber(item.openIssues)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2 text-text-secondary">
                    <Calendar className="w-4 h-4 text-text-muted" />
                    <span>创建时间</span>
                  </span>
                  <span className="font-semibold text-text-primary">{item.createdAt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2 text-text-secondary">
                    <Calendar className="w-4 h-4 text-text-muted" />
                    <span>最后更新</span>
                  </span>
                  <span className="font-semibold text-text-primary">{item.updatedAt}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="card-base p-6">
              <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">操作</h3>
              <div className="space-y-3">
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Github className="w-4 h-4" />
                  <span>访问仓库</span>
                </a>
                {item.homepage && (
                  <a
                    href={item.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-secondary flex items-center justify-center space-x-2"
                  >
                    <Globe className="w-4 h-4" />
                    <span>访问官网</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
