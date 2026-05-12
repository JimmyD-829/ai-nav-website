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
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            selectedCategory === category.id
              ? "bg-primary text-white shadow-md shadow-primary/15"
              : "bg-surface text-text-secondary hover:bg-background hover:text-text-primary border border-border"
          }`}
        >
          {category.name}
          <span className="ml-1.5 text-xs opacity-60">({category.count})</span>
        </button>
      ))}
    </div>
  );
}
