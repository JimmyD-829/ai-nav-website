import { ExternalLink, Star, Users, Zap } from "lucide-react";
import { Tool } from "../../types";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
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
    free: { label: "免费", color: "text-green-400 bg-green-400/10" },
    freemium: { label: " Freemium", color: "text-blue-400 bg-blue-400/10" },
    paid: { label: "付费", color: "text-purple-400 bg-purple-400/10" },
  };

  const pricing = pricingLabels[tool.pricing as keyof typeof pricingLabels];

  return (
    <div className="group card-base card-hover p-6 border border-transparent hover:border-primary/20">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center overflow-hidden">
            <img
              src={tool.logo}
              alt={tool.name}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-text-primary group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${pricing.color}`}>
              {pricing.label}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-text-secondary line-clamp-2 mb-4">
        {tool.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {tool.features.slice(0, 3).map((feature, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-white/5 text-text-muted rounded"
          >
            {feature}
          </span>
        ))}
        {tool.features.length > 3 && (
          <span className="px-2 py-1 text-xs text-text-muted">
            +{tool.features.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center space-x-4 text-xs text-text-muted">
          <span className="flex items-center space-x-1">
            <Users className="w-3.5 h-3.5" />
            <span>{formatNumber(tool.mau)}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Star className="w-3.5 h-3.5 text-yellow-400" />
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
          className="p-2 rounded-lg bg-white/5 text-text-secondary hover:text-primary hover:bg-primary/10 transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
