import { useNavigate } from "react-router-dom";
import { ExternalLink, Star, Users, Zap } from "lucide-react";
import { Tool } from "../../types";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const navigate = useNavigate();

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  const pricingLabels = {
    free: { label: "免费", color: "text-green-600 bg-green-50" },
    freemium: { label: "Freemium", color: "text-blue-600 bg-blue-50" },
    paid: { label: "付费", color: "text-purple-600 bg-purple-50" },
  };

  const pricing = pricingLabels[tool.pricing as keyof typeof pricingLabels];

  return (
    <div
      onClick={() => navigate(`/tools/${tool.id}`)}
      className="group card-base card-hover p-5 cursor-pointer h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src={tool.logo}
              alt={tool.name}
              className="w-7 h-7 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors text-sm truncate">
              {tool.name}
            </h3>
            <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-md ${pricing.color}`}>
              {pricing.label}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-text-secondary line-clamp-2 mb-3 flex-grow">
        {tool.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {tool.features.slice(0, 3).map((feature, index) => (
          <span
            key={index}
            className="px-2 py-0.5 text-xs bg-background text-text-muted rounded-md"
          >
            {feature}
          </span>
        ))}
        {tool.features.length > 3 && (
          <span className="px-2 py-0.5 text-xs text-text-light">
            +{tool.features.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
        <div className="flex items-center space-x-3 text-xs text-text-muted">
          <span className="flex items-center space-x-1">
            <Users className="w-3.5 h-3.5" />
            <span>{formatNumber(tool.mau)}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Star className="w-3.5 h-3.5 text-amber-500" />
            <span>{tool.rating}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Zap className="w-3.5 h-3.5 text-accent" />
            <span className="capitalize">{tool.updateFrequency}</span>
          </span>
        </div>
        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg bg-background text-text-secondary hover:text-primary hover:bg-primary/5 transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
