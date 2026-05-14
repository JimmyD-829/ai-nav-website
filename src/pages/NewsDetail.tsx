import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Eye, Share2, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { News } from "../types";
import newsData from "../data/news.json";

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<News | null>(null);

  useEffect(() => {
    const allNews = (newsData as { news: News[] }).news;
    const found = allNews.find((n) => n.id === id);
    if (found) {
      setNews(found);
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (!news) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-text-muted">新闻未找到</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-primary hover:underline"
        >
          返回首页
        </button>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const categoryLabels: Record<string, string> = {
    llm: "大模型",
    "ai-app": "AI应用",
    "tech-breakthrough": "技术突破",
    industry: "业界动态",
    product: "产品发布",
  };

  const categoryColors: Record<string, string> = {
    llm: "bg-blue-50 text-blue-600",
    "ai-app": "bg-purple-50 text-purple-600",
    "tech-breakthrough": "bg-emerald-50 text-emerald-600",
    industry: "bg-amber-50 text-amber-600",
    product: "bg-rose-50 text-rose-600",
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.summary,
          url: window.location.href,
        });
      } catch (err) {
        console.log("分享取消");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("链接已复制到剪贴板");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center space-x-2 text-text-muted hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>返回首页</span>
      </button>

      {/* Article Header */}
      <article className="card-base overflow-hidden">
        {/* Category & Meta */}
        <div className="p-6 pb-0">
          <div className="flex items-center space-x-3 mb-4">
            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-lg ${
                categoryColors[news.category] || "bg-gray-100 text-gray-600"
              }`}
            >
              {categoryLabels[news.category] || news.category}
            </span>
            {news.isHot && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 text-sm font-medium rounded-lg bg-red-50 text-red-600">
                <span>🔥</span>
                <span>热门</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
            {news.title}
          </h1>

          <div className="flex items-center justify-between text-sm text-text-muted mb-6">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatDate(news.publishDate)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{news.views.toLocaleString()} 阅读</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-text-secondary">{news.source}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-0">
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              {news.summary}
            </p>
            <div className="text-text-primary leading-relaxed whitespace-pre-line">
              {news.content}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-background text-text-secondary rounded-lg border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-background text-text-secondary hover:bg-primary hover:text-white transition-colors border border-border"
            >
              <Share2 className="w-4 h-4" />
              <span>分享</span>
            </button>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(news.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>搜索更多</span>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
