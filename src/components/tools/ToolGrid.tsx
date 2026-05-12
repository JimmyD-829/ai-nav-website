import { useState } from "react";
import { MessageSquare, Image, Video, Code, Bot, Palette } from "lucide-react";
import toolsData from "../../data/tools.json";
import ToolCard from "./ToolCard";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Image,
  Video,
  Code,
  Bot,
  Palette,
};

export default function ToolGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTools = selectedCategory === "all"
    ? toolsData.tools
    : toolsData.tools.filter(tool => tool.category === selectedCategory);

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="section-title">🛠️ AI工具分类墙</h2>
        <p className="section-subtitle">发现优质 AI 工具，查看真实用户数据与评分对比</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {toolsData.categories.map((category) => {
          const IconComponent = iconMap[category.icon] || Code;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-card text-text-secondary hover:bg-card-hover hover:text-text-primary border border-transparent hover:border-white/10"
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{category.name}</span>
              <span className={`text-xs ${selectedCategory === category.id ? "opacity-70" : "text-text-muted"}`}>
                ({category.count})
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool, index) => (
          <div
            key={tool.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <ToolCard tool={tool} />
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted">该分类下暂无工具</p>
        </div>
      )}
    </section>
  );
}
