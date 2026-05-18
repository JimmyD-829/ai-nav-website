import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Sparkles } from "lucide-react";
import { scrollToSection } from "../../utils/scroll";

const navLinks = [
  { path: "/", label: "首页" },
  { path: "/#news", label: "新闻动态", sectionId: "news-section" },
  { path: "/#tools", label: "AI工具", sectionId: "tools-section" },
  { path: "/vibecoding", label: "VibeCoding" },
  { path: "/github-trending", label: "GitHub热门" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/" && !location.hash;
    if (path.startsWith("/#")) return location.hash === path.replace("/", "");
    return location.pathname === path;
  };

  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    if (link.sectionId) {
      e.preventDefault();
      setIsMenuOpen(false);

      if (location.pathname !== "/") {
        window.location.href = "/" + link.path.replace("/", "");
      } else {
        scrollToSection(link.sectionId);
      }
    } else if (!link.path.startsWith("/#")) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">
              AI<span className="text-primary">导航</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive(link.path)
                    ? "text-primary bg-primary/5"
                    : "text-text-secondary hover:text-text-primary hover:bg-background"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
              <input
                type="text"
                placeholder="搜索 AI 工具、新闻..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm text-text-primary placeholder-text-light focus:outline-none focus:border-primary/40 transition-all"
              />
            </div>
          </div>

          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-2 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive(link.path)
                      ? "text-primary bg-primary/5"
                      : "text-text-secondary hover:text-text-primary hover:bg-background"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
              <input
                type="text"
                placeholder="搜索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm text-text-primary placeholder-text-light focus:outline-none focus:border-primary/40"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
