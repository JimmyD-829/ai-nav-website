import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sparkles, Zap, TrendingUp, ArrowRight, Code2 } from "lucide-react";
import { NewsList } from "../components/news";
import { ToolGrid } from "../components/tools";
import VibeShowcase from "../components/showcase/VibeShowcase";
import { scrollToSection } from "../utils/scroll";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      setTimeout(() => {
        scrollToSection(state.scrollTo!);
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />

        <div className="container mx-auto px-6 py-16 relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>为产品经理打造的 AI 资讯平台</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-5 animate-slide-up">
              掌握 AI 前沿动态
              <br />
              <span className="text-primary">赋能产品决策</span>
            </h1>

            <p className="text-base text-text-secondary leading-relaxed mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
              聚合每日 AI 新闻、工具数据与开发更新，助力产品经理快速了解 AI 技术趋势
            </p>

            <div className="flex flex-wrap justify-center gap-3 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <button onClick={() => scrollToSection('news-section')} className="btn-primary flex items-center space-x-2">
                <span>探索新闻</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => scrollToSection('tools-section')} className="btn-secondary flex items-center space-x-2">
                <span>浏览工具</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="card-base p-5 text-center animate-slide-up cursor-pointer" style={{ animationDelay: "300ms" }} onClick={() => scrollToSection('news-section')}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">实时资讯</h3>
              <p className="text-xs text-text-muted">追踪 AI 最新动态</p>
            </div>

            <div className="card-base p-5 text-center animate-slide-up cursor-pointer" style={{ animationDelay: "400ms" }} onClick={() => scrollToSection('tools-section')}>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">工具数据</h3>
              <p className="text-xs text-text-muted">MAU、评分对比</p>
            </div>

            <div className="card-base p-5 text-center animate-slide-up cursor-pointer" style={{ animationDelay: "500ms" }} onClick={() => scrollToSection('showcase-section')}>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
                <Code2 className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">Vibe Coding</h3>
              <p className="text-xs text-text-muted">作品展示与灵感</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-12">
        <div id="news-section">
          <NewsList />
        </div>
        <div id="tools-section">
          <ToolGrid />
        </div>
        <div id="vibecoding-section">
          <VibeShowcase />
        </div>
      </section>
    </div>
  );
}
