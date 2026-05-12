import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Newspaper,
  Wrench,
  RefreshCw,
  Palette,
  ArrowUp,
} from "lucide-react";
import { scrollToSection, scrollToTop } from "../../utils/scroll";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: "news-section", label: "新闻动态", icon: Newspaper },
  { id: "tools-section", label: "AI工具", icon: Wrench },
  { id: "updates-section", label: "工具更新", icon: RefreshCw },
  { id: "showcase-section", label: "作品展示", icon: Palette },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(false);
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setShowBackToTop(scrollY > 400);
          setIsVisible(scrollY > 200);

          const sections = navItems.map((item) => ({
            id: item.id,
            element: document.getElementById(item.id),
          }));

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section.element) {
              const rect = section.element.getBoundingClientRect();
              if (rect.top <= 120) {
                setActiveSection(section.id);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  if (!isHomePage) return null;

  return (
    <div
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-surface/95 backdrop-blur-sm border border-border rounded-2xl shadow-card p-2 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200 ${
                isActive
                  ? "bg-primary text-white"
                  : "text-text-muted hover:text-primary hover:bg-primary/5"
              }`}
              title={item.label}
            >
              <Icon className="w-4 h-4" />
              <span
                className={`absolute right-full mr-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-surface text-text-secondary border border-border"
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
        className={`flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white shadow-md shadow-primary/20 transition-opacity duration-300 hover:bg-primary-dark ${
          showBackToTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        title="回到顶部"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
