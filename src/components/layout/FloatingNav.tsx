import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Newspaper,
  Wrench,
  Sparkles,
  Flame,
  ArrowUp,
} from "lucide-react";
import { scrollToTop } from "../../utils/scroll";

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const navItems: NavItem[] = [
  { label: "新闻动态", icon: Newspaper, path: "/news" },
  { label: "AI工具", icon: Wrench, path: "/tools" },
  { label: "VibeCoding", icon: Sparkles, path: "/vibecoding" },
  { label: "GitHub热门", icon: Flame, path: "/github-trending" },
];

export default function FloatingNav() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setShowBackToTop(scrollY > 400);
          setIsVisible(scrollY > 200);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-surface/95 backdrop-blur-sm border border-border rounded-2xl shadow-card p-2 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const isHovered = hoveredItem === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleClick(item.path)}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200 ${
                active
                  ? "bg-primary text-white"
                  : "text-text-muted hover:text-primary hover:bg-primary/5"
              }`}
              title={item.label}
            >
              <Icon className="w-4 h-4" />
              {/* Tooltip - 只在 hover 时显示 */}
              <span
                className={`absolute right-full mr-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap min-w-[80px] text-center transition-all duration-200 ${
                  isHovered
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-2 pointer-events-none"
                } ${
                  active
                    ? "bg-primary text-white"
                    : "bg-surface text-text-secondary border border-border shadow-sm"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => scrollToTop()}
        className={`flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white shadow-md shadow-primary/20 transition-all duration-300 hover:bg-primary-dark ${
          showBackToTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        title="回到顶部"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
