import { Clock, Eye, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { News } from "../../types";

interface NewsCardProps {
  news: News;
  featured?: boolean;
}

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff === 0) return "今天";
    if (diff === 1) return "昨天";
    if (diff < 7) return `${diff}天前`;
    return date.toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
  };

  const categoryLabels: Record<string, string> = {
    llm: "大模型",
    "ai-app": "AI应用",
    "tech-breakthrough": "技术突破",
    industry: "业界动态",
    product: "产品发布",
  };

  if (featured) {
    return (
      <Link
        to={`/news/${news.id}`}
        className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 hover:border-primary/40 transition-all duration-300"
      >
        <div className="p-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="tag flex items-center space-x-1">
              <Flame className="w-3 h-3" />
              <span>热门</span>
            </span>
            <span className="tag">{categoryLabels[news.category] || news.category}</span>
          </div>
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
            {news.title}
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4 line-clamp-2">
            {news.summary}
          </p>
          <div className="flex items-center space-x-4 text-sm text-text-muted">
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatDate(news.publishDate)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{news.views.toLocaleString()}</span>
            </span>
            <span>{news.source}</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
      </Link>
    );
  }

  return (
    <Link
      to={`/news/${news.id}`}
      className="group card-base card-hover p-6 border border-transparent hover:border-white/10"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="tag text-xs">{categoryLabels[news.category] || news.category}</span>
          {news.isHot && (
            <span className="tag bg-red-500/10 text-red-400 border-red-500/20 flex items-center space-x-1">
              <Flame className="w-3 h-3" />
              <span>热</span>
            </span>
          )}
        </div>
        <span className="text-xs text-text-muted">{formatDate(news.publishDate)}</span>
      </div>

      <h3 className="font-heading font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {news.title}
      </h3>

      <p className="text-sm text-text-secondary line-clamp-2 mb-4">
        {news.summary}
      </p>

      <div className="flex items-center justify-between text-xs text-text-muted">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatDate(news.publishDate)}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{news.views.toLocaleString()}</span>
          </span>
        </div>
        <span>{news.source}</span>
      </div>
    </Link>
  );
}
