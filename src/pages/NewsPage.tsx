import { useState } from "react";
import { TrendingUp, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import newsData from "../data/news.json";
import type { News } from "../types";
import NewsCard from "../components/news/NewsCard";
import NewsFilter from "../components/news/NewsFilter";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const news = newsData.news as News[];

  const filteredNews = selectedCategory === "all"
    ? news
    : news.filter(news => news.category === selectedCategory);

  const hotNews = filteredNews.find(news => news.importance >= 9) || filteredNews[0];
  const otherNews = filteredNews.filter(news => news.id !== hotNews?.id);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">返回首页</span>
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary">新闻动态</h1>
            </div>
          </div>
          <p className="text-text-secondary">
            汇集 AI、机器人、基础科学、航空航天等领域最新资讯
          </p>
        </div>

        <NewsFilter
          categories={newsData.categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {hotNews && (
          <div className="mb-6 animate-slide-up">
            <NewsCard news={hotNews} featured />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {otherNews.map((news, index) => (
            <div
              key={news.id}
              className="animate-slide-up h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <NewsCard news={news} />
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">暂无相关新闻</p>
          </div>
        )}
      </div>
    </div>
  );
}
