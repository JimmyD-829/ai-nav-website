import { useState } from "react";
import { Wrench, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Image, Video, Code, Bot, Palette } from "lucide-react";
import toolsData from "../data/tools.json";
import type { Tool } from "../types";
import ToolCard from "../components/tools/ToolCard";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Image,
  Video,
  Code,
  Bot,
  Palette,
};

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const tools = toolsData.tools as Tool[];

  const filteredTools = selectedCategory === "all"
    ? tools
    : tools.filter(tool => tool.category === selectedCategory);

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
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary">AI工具分类墙</h1>
            </div>
          </div>
          <p className="text-text-secondary">
            发现优质 AI 工具，查看真实用户数据与评分对比
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {toolsData.categories.map((category) => {
            const IconComponent = iconMap[category.icon] || Code;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-primary text-white shadow-md shadow-primary/15"
                    : "bg-surface text-text-secondary hover:bg-background hover:text-text-primary border border-border"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{category.name}</span>
                <span className={`text-xs ${selectedCategory === category.id ? "opacity-60" : "text-text-light"}`}>
                  ({category.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
      </div>
    </div>
  );
}
