import { Sparkles, Github, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  product: [
    { label: "新闻动态", path: "/news" },
    { label: "AI工具", path: "/tools" },
    { label: "VibeCoding", path: "/vibecoding" },
    { label: "GitHub热门", path: "/github-trending" },
  ],
  resources: [
    { label: "使用文档", path: "#" },
    { label: "API 接口", path: "#" },
    { label: "更新日志", path: "#" },
  ],
  company: [
    { label: "关于我们", path: "#" },
    { label: "联系我们", path: "#" },
    { label: "加入团队", path: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">
                AI<span className="text-primary">导航</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              专注于为产品经理提供最前沿的 AI 技术资讯、工具推荐和行业动态
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-background text-text-muted hover:text-primary hover:bg-primary/5 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-background text-text-muted hover:text-primary hover:bg-primary/5 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-background text-text-muted hover:text-primary hover:bg-primary/5 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-4">产品</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-text-secondary text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-4">资源</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    className="text-text-secondary text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-4">公司</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    className="text-text-secondary text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-light text-sm">
            © 2026 AI导航. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-text-light text-sm hover:text-primary transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-text-light text-sm hover:text-primary transition-colors">
              服务条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
