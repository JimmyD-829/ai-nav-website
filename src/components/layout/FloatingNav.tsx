import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Home,
  Newspaper,
  Wrench,
  RefreshCw,
  Palette,
  ArrowUp,
} from "lucide-react";

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

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBackToTop(scrollY > 400);
      setIsVisible(scrollY > 200);

      // 检测当前可见的 section
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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isHomePage) return null;

  return (
    <div
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
      }`}
    >
      {/* Section Navigation */}
      <div className="bg-surface/90 backdrop-blur-md border border-border rounded-2xl shadow-card p-2 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-text-muted hover:text-primary hover:bg-primary/5"
              }`}
              title={item.label}
            >
              <Icon className="w-4 h-4" />
              {/* Tooltip */}
              <span
                className={`absolute right-full mr-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white opacity-100 translate-x-0"
                    : "bg-surface text-text-secondary border border-border opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className={`flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white shadow-md shadow-primary/20 transition-all duration-300 hover:bg-primary-dark ${
          showBackToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        title="回到顶部"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
