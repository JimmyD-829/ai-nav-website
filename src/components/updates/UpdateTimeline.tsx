import updatesData from "../../data/updates.json";
import UpdateCard from "./UpdateCard";

export default function UpdateTimeline() {
  const sortedUpdates = [...updatesData.updates].sort(
    (a, b) => new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
  );

  const groupedByDate = sortedUpdates.reduce((groups, update) => {
    const date = update.updateDate;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(update);
    return groups;
  }, {} as Record<string, typeof sortedUpdates>);

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="section-title">⚡ Vibe Coding 工具更新</h2>
        <p className="section-subtitle">追踪 Cursor、Copilot 等开发工具的最新功能更新</p>
      </div>

      <div className="relative">
        {Object.entries(groupedByDate).map(([date, updates]) => (
          <div key={date} className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {date}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
            </div>
            <div className="space-y-4">
              {updates.map((update, index) => (
                <div
                  key={update.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <UpdateCard update={update} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {sortedUpdates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted">暂无更新记录</p>
        </div>
      )}
    </section>
  );
}
