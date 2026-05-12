import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Eye, GitFork, ExternalLink, Calendar, User, Code2 } from "lucide-react";
import { useEffect } from "react";

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  image: string;
  tags: string[];
  likes: number;
  views: number;
  forks: number;
  tool: string;
  demoUrl: string;
  createdAt: string;
  fullDescription?: string;
  techStack?: string[];
  features?: string[];
}

const showcaseData: ShowcaseItem[] = [
  {
    id: "1",
    title: "AI 智能简历生成器",
    description: "使用 Cursor + Claude 3.5 开发的智能简历生成工具，支持一键优化、AI 润色和多模板切换",
    author: "张明",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhangming",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop",
    tags: ["Cursor", "React", "AI"],
    likes: 234,
    views: 1890,
    forks: 45,
    tool: "Cursor",
    demoUrl: "#",
    createdAt: "2026-05-10",
    fullDescription: "这是一个基于 Cursor 和 Claude 3.5 开发的智能简历生成器。用户只需输入基本信息，AI 就能自动生成专业、美观的简历。支持多种行业模板，智能优化工作经历描述，并提供 ATS 友好格式导出。",
    techStack: ["React 18", "TypeScript", "Tailwind CSS", "Claude API", "Node.js"],
    features: ["AI 智能润色", "多模板切换", "ATS 优化", "PDF 导出", "实时预览"],
  },
  {
    id: "2",
    title: "语音转文字实时字幕",
    description: "基于 Whisper API 的实时语音转文字工具，支持多语言和实时字幕显示",
    author: "李华",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lihua",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    tags: ["Windsurf", "Python", "Whisper"],
    likes: 189,
    views: 1456,
    forks: 32,
    tool: "Windsurf",
    demoUrl: "#",
    createdAt: "2026-05-09",
    fullDescription: "利用 OpenAI Whisper API 构建的实时语音转文字工具。支持 99 种语言的实时识别，可生成 SRT/VTT 字幕文件，适用于直播、会议记录、视频制作等场景。",
    techStack: ["Python", "FastAPI", "WebSocket", "Whisper API", "React"],
    features: ["实时转录", "多语言支持", "字幕导出", "噪音过滤", "说话人识别"],
  },
  {
    id: "3",
    title: "AI 图片风格迁移",
    description: "使用 Stable Diffusion 和 ControlNet 实现的图片风格迁移工具，支持多种艺术风格",
    author: "王芳",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wangfang",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop",
    tags: ["GitHub Copilot", "Next.js", "SD"],
    likes: 312,
    views: 2341,
    forks: 67,
    tool: "GitHub Copilot",
    demoUrl: "#",
    createdAt: "2026-05-08",
    fullDescription: "基于 Stable Diffusion 和 ControlNet 的在线图片风格迁移工具。用户上传照片后，可选择梵高、莫奈、赛博朋克等多种艺术风格进行转换，保持原图构图的同时赋予全新艺术风格。",
    techStack: ["Next.js 14", "Stable Diffusion", "ControlNet", "Python", "CUDA"],
    features: ["20+ 艺术风格", "保持构图", "批量处理", "高清输出", "风格混合"],
  },
  {
    id: "4",
    title: "智能代码审查助手",
    description: "自动分析代码质量、发现潜在 Bug 并提供修复建议的 AI 工具",
    author: "陈杰",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chenjie",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
    tags: ["Cursor", "TypeScript", "AI"],
    likes: 156,
    views: 1123,
    forks: 28,
    tool: "Cursor",
    demoUrl: "#",
    createdAt: "2026-05-07",
    fullDescription: "集成到 CI/CD 流程中的智能代码审查工具。自动检测代码异味、安全漏洞、性能问题，并生成详细的审查报告和修复建议。支持 GitHub/GitLab 集成。",
    techStack: ["TypeScript", "Node.js", "AST Parser", "OpenAI API", "GitHub API"],
    features: ["自动审查", "安全检测", "性能分析", "CI/CD 集成", "报告生成"],
  },
  {
    id: "5",
    title: "AI 数据分析仪表盘",
    description: "自然语言查询数据库，自动生成可视化图表和数据分析报告",
    author: "刘洋",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liuyang",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    tags: ["Windsurf", "Vue", "SQL"],
    likes: 278,
    views: 1987,
    forks: 54,
    tool: "Windsurf",
    demoUrl: "#",
    createdAt: "2026-05-06",
    fullDescription: "面向非技术人员的 AI 数据分析平台。用户用自然语言描述分析需求，系统自动生成 SQL 查询、执行分析并生成可视化图表和洞察报告。",
    techStack: ["Vue 3", "Python", "SQL", "ECharts", "LangChain"],
    features: ["自然语言查询", "自动可视化", "多数据源", "报告导出", "定时分析"],
  },
  {
    id: "6",
    title: "多语言 AI 翻译器",
    description: "支持 50+ 语言的实时翻译工具，保留原文格式和语境",
    author: "赵雪",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoxue",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
    tags: ["GitHub Copilot", "React", "NLP"],
    likes: 198,
    views: 1567,
    forks: 41,
    tool: "GitHub Copilot",
    demoUrl: "#",
    createdAt: "2026-05-05",
    fullDescription: "专业的 AI 翻译工具，支持 50+ 语言互译。特别优化了技术文档、法律合同等专业领域的翻译质量，保留原文格式、表格结构和专业术语一致性。",
    techStack: ["React", "Python", "Transformers", "FastAPI", "Redis"],
    features: ["50+ 语言", "格式保留", "术语库", "批量翻译", "API 接口"],
  },
];

export default function ShowcaseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const item = showcaseData.find(s => s.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="text-center">
          <Code2 className="w-16 h-16 text-text-light mx-auto mb-4" />
          <h2 className="text-xl font-bold text-text-primary mb-2">作品未找到</h2>
          <p className="text-text-secondary mb-4">该作品可能已被删除或不存在</p>
          <button onClick={() => navigate("/", { state: { scrollTo: "showcase-section" } })} className="btn-primary">
            返回作品列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/", { state: { scrollTo: "showcase-section" } })}
          className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">返回作品列表</span>
        </button>

        {/* Header Image */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center space-x-2 mb-3">
              <span className="tag bg-white/90 text-text-primary">{item.tool}</span>
              {item.tags.map(tag => (
                <span key={tag} className="tag bg-white/20 text-white">{tag}</span>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{item.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="card-base p-6">
              <h2 className="text-lg font-bold text-text-primary mb-3">项目介绍</h2>
              <p className="text-text-secondary leading-relaxed">{item.fullDescription || item.description}</p>
            </div>

            {/* Features */}
            {item.features && (
              <div className="card-base p-6">
                <h2 className="text-lg font-bold text-text-primary mb-3">核心功能</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {item.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            {item.techStack && (
              <div className="card-base p-6">
                <h2 className="text-lg font-bold text-text-primary mb-3">技术栈</h2>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm bg-primary/5 text-primary rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <div className="card-base p-6">
              <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">作者信息</h3>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={item.authorAvatar}
                  alt={item.author}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-text-primary">{item.author}</p>
                  <p className="text-xs text-text-muted">Vibe Coder</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="card-base p-6">
              <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">数据统计</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2 text-text-secondary">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>点赞</span>
                  </span>
                  <span className="font-semibold text-text-primary">{item.likes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2 text-text-secondary">
                    <Eye className="w-4 h-4 text-primary" />
                    <span>浏览</span>
                  </span>
                  <span className="font-semibold text-text-primary">{item.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2 text-text-secondary">
                    <GitFork className="w-4 h-4 text-accent" />
                    <span>复刻</span>
                  </span>
                  <span className="font-semibold text-text-primary">{item.forks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2 text-text-secondary">
                    <Calendar className="w-4 h-4 text-text-muted" />
                    <span>发布</span>
                  </span>
                  <span className="font-semibold text-text-primary">{item.createdAt}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="card-base p-6">
              <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">操作</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary flex items-center justify-center space-x-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>查看演示</span>
                </button>
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <GitFork className="w-4 h-4" />
                  <span>复刻项目</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
