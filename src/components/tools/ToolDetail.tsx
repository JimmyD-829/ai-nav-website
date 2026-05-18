import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  ArrowLeft, ExternalLink, Star, Users, Zap, Clock, CheckCircle,
  BookOpen, Play, Lightbulb, AlertCircle, GitBranch, Sparkles,
  Wrench, Bug, ChevronDown, ChevronUp
} from "lucide-react";
import { useState } from "react";
import toolsData from "../../data/tools.json";
import updatesData from "../../data/updates.json";
import type { Tool } from "../../types";

// 工具使用手册数据
const toolGuides: Record<string, {
  quickStart: string[];
  tips: string[];
  bestPractices: string[];
  commonIssues: string[];
  shortcuts?: string[];
}> = {
  "1": {
    quickStart: [
      "访问 chat.openai.com 注册账号",
      "在输入框中描述你的需求或问题",
      "使用 \"请详细说明\"、\"举例说明\" 等指令获得更好回答",
      "通过点击 \"重新生成\" 获取不同角度的回答",
    ],
    tips: [
      "角色设定：开头加上\"你是一位资深产品经理\"等角色描述",
      "分步骤提问：复杂问题拆分成多个简单问题",
      "提供上下文：给出相关背景信息，让回答更精准",
      "使用 Markdown：要求输出格式化的文档或代码",
    ],
    bestPractices: [
      "保存重要对话：使用 \"分享\" 功能生成链接",
      "创建自定义 GPT：针对特定场景训练专属助手",
      "结合插件：使用联网搜索、代码解释器等扩展功能",
      "定期清理历史：删除不重要的对话保持界面整洁",
    ],
    commonIssues: [
      "回答不准确：提供更多上下文或重新表述问题",
      "回答太简短：使用 \"请详细展开\" 等指令",
      "代码错误：说明具体错误信息和期望结果",
      "中文回答质量：明确要求使用中文回答",
    ],
  },
  "2": {
    quickStart: [
      "访问 claude.ai 注册账号",
      "上传文档或直接在对话框输入内容",
      "使用自然语言描述分析需求",
      "利用长文本能力处理大型文档",
    ],
    tips: [
      "文档分析：上传 PDF、Word 等文档进行智能分析",
      "代码审查：粘贴代码块请求审查和优化建议",
      "创意写作：提供写作主题和风格要求",
      "多轮对话：通过追问深入探讨话题",
    ],
    bestPractices: [
      "使用 Projects：创建项目组织相关对话",
      "Artifacts：利用代码和文档预览功能",
      "长文本处理：充分利用 200K 上下文窗口",
      "安全设置：调整隐私设置保护敏感信息",
    ],
    commonIssues: [
      "回答过于谨慎：明确说明需要创意或推测性回答",
      "文档解析错误：检查文档格式是否支持",
      "响应速度慢：复杂任务可拆分成多个简单任务",
      "中文支持：明确要求使用中文",
    ],
  },
  "17": {
    quickStart: [
      "访问 openai.com/codex 获取访问权限",
      "在支持的 IDE 中安装 Codex 插件",
      "使用自然语言描述编程需求",
      "让 Codex 自主完成多文件编辑任务",
    ],
    tips: [
      "明确需求：描述清楚功能目标和约束条件",
      "分步执行：复杂任务拆分为多个子任务",
      "代码审查：要求 Codex 解释代码逻辑",
      "终端操作：利用终端命令执行能力",
    ],
    bestPractices: [
      "版本控制：使用 Git 管理代码变更",
      "测试驱动：先写测试用例再让 Codex 实现",
      "代码规范：指定代码风格和命名规范",
      "安全审查：人工检查生成的代码安全性",
    ],
    commonIssues: [
      "代码不符合预期：提供更详细的规格说明",
      "依赖问题：明确指定技术栈和版本",
      "性能问题：要求优化代码性能",
      "安全漏洞：要求 Codex 进行安全审查",
    ],
    shortcuts: [
      "Ctrl+K：快速打开 Codex 对话",
      "Tab：接受代码补全建议",
      "Ctrl+Enter：执行终端命令",
      "Esc：取消当前操作",
    ],
  },
  "5": {
    quickStart: [
      "下载并安装 Cursor IDE（cursor.sh）",
      "登录账号并配置 API Key",
      "打开项目或创建新文件",
      "使用 Cmd+K（Mac）或 Ctrl+K（Win）打开 AI 对话框",
    ],
    tips: [
      "Composer：使用 Cmd+I 打开多文件编辑模式",
      "代码解释：选中代码后右键选择 \"Explain\"",
      "自然语言编程：直接描述需求让 AI 生成代码",
      "上下文理解：使用 @ 符号引用文件或符号",
    ],
    bestPractices: [
      "项目规则：配置 .cursorrules 文件统一代码风格",
      "Git 集成：使用内置 Git 功能管理版本",
      "代码审查：让 AI 审查代码并给出改进建议",
      "文档生成：使用 AI 自动生成代码注释",
    ],
    commonIssues: [
      "代码生成不准确：提供更多上下文信息",
      "响应慢：检查网络连接或降低上下文长度",
      "索引问题：使用 \"Reindex Project\" 重新索引",
      "API 限制：升级到 Pro 版本获得更多额度",
    ],
    shortcuts: [
      "Cmd+K：打开 AI 对话框",
      "Cmd+L：打开聊天面板",
      "Cmd+I：打开 Composer",
      "Tab：接受建议",
    ],
  },
  "20": {
    quickStart: [
      "下载 Windsurf IDE（codeium.com/windsurf）",
      "登录 Codeium 账号",
      "打开或创建项目",
      "使用 Cascade 工作流描述开发需求",
    ],
    tips: [
      "Cascade 工作流：描述端到端需求让 AI 自主开发",
      "多文件编辑：AI 自动识别并修改相关文件",
      "终端集成：直接在 IDE 中执行命令",
      "实时预览：Web 开发时实时查看效果",
    ],
    bestPractices: [
      "明确需求：详细描述功能和非功能需求",
      "迭代开发：分阶段验证和优化",
      "代码审查：人工检查 AI 生成的代码",
      "测试覆盖：确保关键功能有测试用例",
    ],
    commonIssues: [
      "理解偏差：重新描述需求或提供示例",
      "文件冲突：使用版本控制管理变更",
      "性能问题：优化提示词减少不必要的操作",
      "网络依赖：确保稳定的网络连接",
    ],
  },
};

const defaultGuide = {
  quickStart: [
    "访问官方网站注册账号",
    "阅读官方文档了解基本功能",
    "从简单任务开始尝试",
    "逐步探索高级功能",
  ],
  tips: [
    "阅读官方文档获取最新功能信息",
    "加入社区获取使用技巧",
    "关注官方更新日志",
    "多实践积累经验",
  ],
  bestPractices: [
    "定期备份重要数据",
    "关注安全和隐私设置",
    "合理使用 API 配额",
    "及时更新到最新版本",
  ],
  commonIssues: [
    "功能不熟悉：查看官方文档和教程",
    "性能问题：检查网络连接和设备配置",
    "账号问题：联系官方客服支持",
    "付费问题：查看定价页面了解套餐",
  ],
  shortcuts: undefined as string[] | undefined,
};

// 更新类型配置
const updateTypeConfig = {
  feature: {
    label: "新功能",
    icon: Sparkles,
    color: "text-purple-600 bg-purple-50 border-purple-200",
    dotColor: "bg-purple-500",
  },
  improvement: {
    label: "优化",
    icon: Wrench,
    color: "text-blue-600 bg-blue-50 border-blue-200",
    dotColor: "bg-blue-500",
  },
  fix: {
    label: "修复",
    icon: Bug,
    color: "text-green-600 bg-green-50 border-green-200",
    dotColor: "bg-green-500",
  },
};

interface UpdateItem {
  id: string;
  toolId: string;
  toolName: string;
  toolLogo: string;
  version: string;
  updateDate: string;
  updateType: "feature" | "improvement" | "fix";
  title: string;
  description: string;
  changelog: string[];
}

export default function ToolDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedUpdate, setExpandedUpdate] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const tool = toolsData.tools.find((t: Tool) => t.id === id) as Tool | undefined;
  const guide = toolGuides[id || ""] || defaultGuide;

  // 获取该工具的更新记录
  const toolUpdates: UpdateItem[] = (updatesData as any).updates
    ?.filter((u: UpdateItem) => u.toolId === id)
    ?.sort((a: UpdateItem, b: UpdateItem) =>
      new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
    ) || [];

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="text-center">
          <Zap className="w-16 h-16 text-text-light mx-auto mb-4" />
          <h2 className="text-xl font-bold text-text-primary mb-2">工具未找到</h2>
          <p className="text-text-secondary mb-4">该工具可能已被删除或不存在</p>
          <button onClick={() => navigate("/")} className="btn-primary">
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const pricingLabels = {
    free: { label: "免费", color: "text-green-600 bg-green-50" },
    freemium: { label: "Freemium", color: "text-blue-600 bg-blue-50" },
    paid: { label: "付费", color: "text-purple-600 bg-purple-50" },
  };

  const pricing = pricingLabels[tool.pricing as keyof typeof pricingLabels];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  const toggleUpdate = (updateId: string) => {
    setExpandedUpdate(expandedUpdate === updateId ? null : updateId);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/", { state: { scrollTo: "tools-section" } })}
          className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">返回工具列表</span>
        </button>

        {/* Header */}
        <div className="card-base p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-text-primary">{tool.name}</h1>
                <span className={`px-3 py-1 text-sm font-medium rounded-lg ${pricing.color}`}>
                  {pricing.label}
                </span>
                <span className="tag">{tool.category}</span>
              </div>
              <p className="text-text-secondary leading-relaxed mb-4">{tool.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                <span className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>MAU: {formatNumber(tool.mau)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>{tool.rating}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>更新: {tool.updateFrequency}</span>
                </span>
                {toolUpdates.length > 0 && (
                  <span className="flex items-center space-x-1">
                    <GitBranch className="w-4 h-4 text-primary" />
                    <span>最近更新: {toolUpdates[0].updateDate}</span>
                  </span>
                )}
              </div>
            </div>
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center space-x-2 flex-shrink-0"
            >
              <span>访问官网</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Update Timeline */}
            {toolUpdates.length > 0 && (
              <div className="card-base p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <GitBranch className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold text-text-primary">更新历史</h2>
                  </div>
                  <span className="text-sm text-text-muted">
                    共 {toolUpdates.length} 条更新
                  </span>
                </div>

                <div className="relative">
                  {/* 时间轴线 */}
                  <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-border" />

                  <div className="space-y-4">
                    {toolUpdates.map((update, index) => {
                      const config = updateTypeConfig[update.updateType];
                      const Icon = config.icon;
                      const isExpanded = expandedUpdate === update.id;

                      return (
                        <div key={update.id} className="relative pl-12">
                          {/* 时间节点圆点 */}
                          <div className={`absolute left-3 top-2 w-3 h-3 rounded-full border-2 border-white ${config.dotColor} shadow-sm z-10`} />

                          {/* 更新卡片 */}
                          <div
                            className={`rounded-xl border transition-all duration-200 ${
                              isExpanded
                                ? "border-primary/30 shadow-sm"
                                : "border-border hover:border-primary/20"
                            }`}
                          >
                            {/* 头部 - 可点击展开 */}
                            <button
                              onClick={() => toggleUpdate(update.id)}
                              className="w-full flex items-center justify-between p-4 text-left"
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-md border ${config.color}`}>
                                  <Icon className="w-3 h-3 inline mr-1" />
                                  {config.label}
                                </span>
                                <span className="text-sm font-medium text-text-primary truncate">
                                  v{update.version} · {update.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                                <span className="text-xs text-text-muted">{update.updateDate}</span>
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-text-muted" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-text-muted" />
                                )}
                              </div>
                            </button>

                            {/* 展开内容 */}
                            {isExpanded && (
                              <div className="px-4 pb-4 pt-0 border-t border-border">
                                <p className="text-sm text-text-secondary mt-3 mb-3">
                                  {update.description}
                                </p>
                                {update.changelog.length > 0 && (
                                  <div className="space-y-1.5">
                                    {update.changelog.map((item, i) => (
                                      <div key={i} className="flex items-start gap-2">
                                        <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <span className="text-sm text-text-secondary">{item}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Start */}
            <div className="card-base p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Play className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-text-primary">快速入门</h2>
              </div>
              <div className="space-y-3">
                {guide.quickStart.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-text-secondary">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="card-base p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold text-text-primary">使用技巧</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {guide.tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Practices */}
            <div className="card-base p-6">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-text-primary">最佳实践</h2>
              </div>
              <div className="space-y-3">
                {guide.bestPractices.map((practice, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                    <span className="text-text-secondary">{practice}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Issues */}
            <div className="card-base p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-bold text-text-primary">常见问题</h2>
              </div>
              <div className="space-y-3">
                {guide.commonIssues.map((issue, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-2" />
                    <span className="text-text-secondary">{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shortcuts */}
            {guide.shortcuts && (
              <div className="card-base p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Zap className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-bold text-text-primary">快捷键</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {guide.shortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <span className="text-text-secondary text-sm">{shortcut.split("：")[1]}</span>
                      <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs font-mono text-text-primary">
                        {shortcut.split("：")[0]}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <div className="card-base p-6">
              <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">核心功能</h3>
              <div className="flex flex-wrap gap-2">
                {tool.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1.5 text-sm bg-primary/5 text-primary rounded-lg font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="card-base p-6">
              <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">数据统计</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-secondary">月活跃用户</span>
                    <span className="font-semibold text-text-primary">{formatNumber(tool.mau)}</span>
                  </div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min((tool.mau / 180000000) * 100, 100)}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-secondary">用户评分</span>
                    <span className="font-semibold text-text-primary">{tool.rating} / 5.0</span>
                  </div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(tool.rating / 5) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="card-base p-6">
              <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">同类工具</h3>
              <div className="space-y-3">
                {toolsData.tools
                  .filter((t: Tool) => t.category === tool.category && t.id !== tool.id)
                  .slice(0, 3)
                  .map((relatedTool: Tool) => (
                    <button
                      key={relatedTool.id}
                      onClick={() => navigate(`/tools/${relatedTool.id}`)}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-background transition-colors text-left"
                    >
                      <img
                        src={relatedTool.logo}
                        alt={relatedTool.name}
                        className="w-8 h-8 object-contain"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-text-primary text-sm truncate">{relatedTool.name}</p>
                        <p className="text-xs text-text-muted">{relatedTool.rating} ★</p>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
