import { Sparkles, Zap, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { NewsList } from "../components/news";
import { ToolGrid } from "../components/tools";
import { UpdateTimeline } from "../components/updates";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />

        <div className="container mx-auto px-6 py-20 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>为产品经理打造的 AI 资讯平台</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary mb-6 animate-slide-up">
              掌握 AI 前沿动态
              <br />
              <span className="gradient-text">赋能产品决策</span>
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
              聚合每日 AI 新闻、工具数据与开发更新，助力产品经理快速了解 AI 技术趋势，做出更明智的产品决策
            </p>

            <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Link to="/news" className="btn-primary flex items-center space-x-2">
                <span>探索新闻</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/tools" className="px-6 py-2 rounded-lg font-medium bg-card text-text-primary border border-white/10 hover:border-primary/30 hover:bg-card-hover transition-all flex items-center space-x-2">
                <span>浏览工具</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="card-base p-6 text-center animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-text-primary mb-2">实时资讯</h3>
              <p className="text-sm text-text-secondary">追踪大模型、AI 应用最新动态</p>
            </div>

            <div className="card-base p-6 text-center animate-slide-up" style={{ animationDelay: "400ms" }}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-text-primary mb-2">工具数据</h3>
              <p className="text-sm text-text-secondary">MAU、评分等真实指标对比</p>
            </div>

            <div className="card-base p-6 text-center animate-slide-up" style={{ animationDelay: "500ms" }}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-heading font-semibold text-text-primary mb-2">开发更新</h3>
              <p className="text-sm text-text-secondary">Vibe Coding 工具功能迭代</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <NewsList />
        <ToolGrid />
        <UpdateTimeline />
      </section>
    </div>
  );
}
