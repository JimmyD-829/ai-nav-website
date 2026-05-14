import { useNavigate } from "react-router-dom";
import { Clock, Eye, Flame, ArrowUpRight } from "lucide-react";
import { News } from "../../types";

interface NewsCardProps {
  news: News;
  featured?: boolean;
}

// 新闻封面图映射
const newsImages: Record<string, string> = {
  "1": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
  "2": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
  "3": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop",
  "4": "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=250&fit=crop",
  "5": "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=250&fit=crop",
  "6": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop",
  "7": "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=400&h=250&fit=crop",
  "8": "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=250&fit=crop",
  "9": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
  "10": "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=250&fit=crop",
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

  const imageUrl = newsImages[news.id] || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop";

  if (featured) {
    return (
      <div 
        onClick={handleClick}
        className="group card-base card-hover overflow-hidden cursor-pointer">
        {/* 封面图 */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* 标签 - 放在图片底部 */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded-full bg-red-500 text-white">
                <Flame className="w-3 h-3" />
                <span>热门</span>
              </span>
              <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${categoryColors[news.category] || "bg-gray-100 text-gray-600"}`}>
                {categoryLabels[news.category] || news.category}
              </span>
            </div>
            <span className="text-xs text-white/80">{formatDate(news.publishDate)}</span>
          </div>
        </div>

        {/* 内容 */}
        <div className="p-5">
          <h2 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {news.title}
          </h2>
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
      className="group card-base card-hover overflow-hidden h-full flex flex-col cursor-pointer">
      {/* 封面图 */}
      <div className="relative h-36 overflow-hidden flex-shrink-0">
        <img
          src={imageUrl}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* 标签 - 放在图片左下角 */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-2">
          <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-md ${categoryColors[news.category] || "bg-gray-100 text-gray-600"}`}>
            {categoryLabels[news.category] || news.category}
          </span>
          {news.isHot && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-xs font-medium rounded-md bg-red-500 text-white">
              <Flame className="w-3 h-3" />
              <span>热</span>
            </span>
          )}
        </div>
      </div>

      {/* 内容 */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2 text-sm leading-snug h-[40px]">
          {news.title}
        </h3>

        <p className="text-xs text-text-secondary line-clamp-2 mb-3 leading-relaxed h-[32px]">
          {news.summary}
        </p>

        <div className="flex items-center justify-between text-xs text-text-muted mt-auto">
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
          <span className="text-text-light">{news.source}</span>
        </div>
      </div>
    </div>
  );
}
