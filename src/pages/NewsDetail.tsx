import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Eye, Share2, ExternalLink, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { News } from "../types";
import newsData from "../data/news.json";

const categoryConfig: Record<string, { name: string; color: string; bgColor: string }> = {
  ai: { name: "AI", color: "text-blue-600", bgColor: "bg-blue-50" },
  robotics: { name: "机器人", color: "text-orange-600", bgColor: "bg-orange-50" },
  "basic-science": { name: "基础科学", color: "text-purple-600", bgColor: "bg-purple-50" },
  physics: { name: "物理", color: "text-indigo-600", bgColor: "bg-indigo-50" },
  biology: { name: "生物", color: "text-green-600", bgColor: "bg-green-50" },
  chemistry: { name: "化学", color: "text-cyan-600", bgColor: "bg-cyan-50" },
  medical: { name: "医疗", color: "text-red-600", bgColor: "bg-red-50" },
  aerospace: { name: "航空航天", color: "text-sky-600", bgColor: "bg-sky-50" },
  psychology: { name: "心理学", color: "text-pink-600", bgColor: "bg-pink-50" },
  sociology: { name: "社会学", color: "text-amber-600", bgColor: "bg-amber-50" },
  "information-engineering": { name: "信息工程", color: "text-teal-600", bgColor: "bg-teal-50" },
};

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

  const catConfig = categoryConfig[news.category] || { name: "其他", color: "text-gray-600", bgColor: "bg-gray-50" };

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
        {/* Category & Importance */}
        <div className="p-6 pb-0">
          <div className="flex items-center space-x-3 mb-4">
            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-lg ${catConfig.bgColor} ${catConfig.color}`}>
              {catConfig.name}
            </span>
            {news.importance >= 9 && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 text-sm font-medium rounded-lg bg-red-50 text-red-600">
                <Star className="w-3.5 h-3.5" />
                <span>重要度 {news.importance}/10</span>
              </span>
            )}
          </div>

          {/* Chinese Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2 leading-tight">
            {news.title}
          </h1>

          {/* English Title */}
          <p className="text-base text-text-muted mb-4 italic">
            {news.titleEn}
          </p>

          {/* Meta Info */}
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
              <span className="text-text-secondary font-medium">{news.source}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-0">
          {/* Summary */}
          <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mb-6">
            <h3 className="text-sm font-semibold text-primary mb-2">内容提要</h3>
            <p className="text-text-secondary leading-relaxed">
              {news.summary}
            </p>
          </div>

          {/* Full Content */}
          <div className="prose prose-slate max-w-none">
            <div className="text-text-primary leading-relaxed whitespace-pre-line">
              {news.content}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-text-primary mb-3">相关标签</h3>
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

          {/* Source Link */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-text-primary mb-3">信息来源</h3>
            <a
              href={news.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>查看原文：{news.source}</span>
            </a>
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
              href={`https://www.google.com/search?q=${encodeURIComponent(news.titleEn)}`}
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
