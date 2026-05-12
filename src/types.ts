export interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  publishDate: string;
  category: "llm" | "ai-app" | "tech-breakthrough" | "industry" | "product";
  tags: string[];
  isHot: boolean;
  views: number;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: "text" | "image" | "video" | "code" | "agent" | "design";
  mau: number;
  rating: number;
  updateFrequency: "daily" | "weekly" | "monthly";
  website: string;
  features: string[];
  pricing: "free" | "freemium" | "paid";
}

export interface Update {
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
