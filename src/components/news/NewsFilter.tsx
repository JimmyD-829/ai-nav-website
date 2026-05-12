import { useState } from "react";

interface NewsFilterProps {
  categories: Array<{ id: string; name: string; count: number }>;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function NewsFilter({ categories, selectedCategory, onCategoryChange }: NewsFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            selectedCategory === category.id
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-card text-text-secondary hover:bg-card-hover hover:text-text-primary border border-transparent hover:border-white/10"
          }`}
        >
          {category.name}
          <span className="ml-2 text-xs opacity-70">({category.count})</span>
        </button>
      ))}
    </div>
  );
}
