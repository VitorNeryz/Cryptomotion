
interface Source {
  name: string;
  percentage: number;
  count: number;
}

interface SourceBreakdownProps {
  sources: Source[];
}

export function SourceBreakdown({ sources }: SourceBreakdownProps) {
  // Sort sources by percentage (highest first)
  const sortedSources = [...sources].sort((a, b) => b.percentage - a.percentage);
  
  const getSourceColor = (source: string) => {
    switch (source.toLowerCase()) {
      case "twitter":
        return "bg-blue-500";
      case "reddit":
        return "bg-orange-500";
      case "bitcointalk":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-3">
      {sortedSources.map((source) => (
        <div key={source.name} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{source.name}</span>
            <span className="font-medium">{source.percentage}% ({source.count})</span>
          </div>
          <div className="w-full bg-dashboard-border h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${getSourceColor(source.name)}`}
              style={{ width: `${source.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
