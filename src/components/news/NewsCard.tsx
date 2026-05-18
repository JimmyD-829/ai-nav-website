import { useNavigate } from "react-router-dom";
import { Clock, Eye, ArrowUpRight } from "lucide-react";
import { News } from "../../types";

interface NewsCardProps {
  news: News;
  featured?: boolean;
}

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

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/news/${news.id}`);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff === 0) return "今天";
    if (diff === 1) return "昨天";
    if (diff < 7) return `${diff}天前`;
    return date.toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
  };

  const catConfig = categoryConfig[news.category] || { name: "其他", color: "text-gray-600", bgColor: "bg-gray-50" };

  if (featured) {
    return (
      <div 
        onClick={handleClick}
        className="group card-base card-hover overflow-hidden cursor-pointer"
      >
        {/* 头部：类别和重要性 */}
        <div className="p-4 pb-0">
          <div className="flex items-center justify-between mb-3">
            <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md ${catConfig.bgColor} ${catConfig.color}`}>
              {catConfig.name}
            </span>
            {news.importance >= 9 && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-md bg-red-50 text-red-600">
                <span>🔥</span>
                <span>重要</span>
              </span>
            )}
          </div>
        </div>

        {/* 内容 */}
        <div className="px-4 pb-4">
          <h2 className="text-base font-bold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {news.title}
          </h2>
          <p className="text-xs text-text-muted mb-2 line-clamp-1">
            {news.titleEn}
          </p>
          <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
            {news.summary}
          </p>
          
          <div className="flex items-center justify-between text-xs text-text-muted">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatDate(news.publishDate)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{news.views.toLocaleString()}</span>
              </span>
            </div>
            <span className="text-text-light">{news.source}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="group card-base card-hover overflow-hidden h-full flex flex-col cursor-pointer"
    >
      {/* 头部：类别 */}
      <div className="p-3 pb-0">
        <div className="flex items-center justify-between mb-2">
          <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md ${catConfig.bgColor} ${catConfig.color}`}>
            {catConfig.name}
          </span>
          {news.importance >= 9 && (
            <span className="text-xs text-red-500 font-medium">🔥 重要</span>
          )}
        </div>
      </div>

      {/* 内容 */}
      <div className="px-3 pb-3 flex flex-col flex-grow">
        <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors line-clamp-2 text-sm leading-snug">
          {news.title}
        </h3>
        <p className="text-[11px] text-text-muted mb-2 line-clamp-1">
          {news.titleEn}
        </p>
        <p className="text-xs text-text-secondary line-clamp-2 mb-3 leading-relaxed flex-grow">
          {news.summary}
        </p>

        <div className="flex items-center justify-between text-xs text-text-muted mt-auto">
          <div className="flex items-center space-x-2">
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatDate(news.publishDate)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{(news.views / 1000).toFixed(1)}k</span>
            </span>
          </div>
          <span className="text-text-light text-[11px]">{news.source}</span>
        </div>
      </div>
    </div>
  );
}
