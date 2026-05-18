import { useState } from "react";
import newsData from "../../data/news.json";
import type { News } from "../../types";
import NewsCard from "./NewsCard";
import NewsFilter from "./NewsFilter";

export default function NewsList() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const news = newsData.news as News[];

  const filteredNews = selectedCategory === "all"
    ? news
    : news.filter(news => news.category === selectedCategory);

  const hotNews = filteredNews.find(news => news.importance >= 9) || filteredNews[0];
  const otherNews = filteredNews.filter(news => news.id !== hotNews?.id);

  return (
    <section id="news-section" className="mb-12">
      <div className="section-header">
        <div>
          <h2 className="section-title">🌍 全球科技动态</h2>
          <p className="section-subtitle">汇集 AI、机器人、基础科学、航空航天等领域最新资讯</p>
        </div>
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
    </section>
  );
}
