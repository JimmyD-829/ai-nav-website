import { Clock, Sparkles, TrendingUp, Bug } from "lucide-react";
import { Update } from "../../types";

interface UpdateCardProps {
  update: Update;
}

export default function UpdateCard({ update }: UpdateCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff === 0) return "今天";
    if (diff === 1) return "昨天";
    if (diff < 7) return `${diff}天前`;
    return date.toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
  };

  const updateTypeConfig = {
    feature: {
      icon: Sparkles,
      label: "新功能",
      color: "text-green-400 bg-green-400/10 border-green-400/20",
    },
    improvement: {
      icon: TrendingUp,
      label: "优化",
      color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    },
    fix: {
      icon: Bug,
      label: "修复",
      color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    },
  };

  const config = updateTypeConfig[update.updateType as keyof typeof updateTypeConfig];
  const TypeIcon = config.icon;

  return (
    <div className="group relative pl-8 pb-8 border-l-2 border-primary/20 hover:border-primary transition-colors last:pb-0">
      <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-card border-2 border-primary group-hover:bg-primary transition-colors" />
      
      <div className="card-base card-hover p-5 border border-transparent hover:border-primary/20 transition-all">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <img
              src={update.toolLogo}
              alt={update.toolName}
              className="w-8 h-8 rounded"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div>
              <h4 className="font-heading font-semibold text-text-primary group-hover:text-primary transition-colors">
                {update.toolName}
              </h4>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">
                  v{update.version}
                </span>
                <span className="text-xs text-text-muted flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(update.updateDate)}</span>
                </span>
              </div>
            </div>
          </div>
          <span className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded-full border ${config.color}`}>
            <TypeIcon className="w-3 h-3" />
            <span>{config.label}</span>
          </span>
        </div>

        <h5 className="font-medium text-text-primary mb-2">{update.title}</h5>
        <p className="text-sm text-text-secondary line-clamp-2 mb-3">
          {update.description}
        </p>

        {update.changelog.length > 0 && (
          <div className="space-y-1.5">
            {update.changelog.map((item, index) => (
              <div key={index} className="flex items-start space-x-2 text-xs text-text-muted">
                <span className="text-primary mt-1">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
