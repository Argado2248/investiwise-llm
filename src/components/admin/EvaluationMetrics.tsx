interface EvaluationMetricsProps {
  revenue: number;
  growth: number;
  team_size: number;
}

export function EvaluationMetrics({ revenue, growth, team_size }: EvaluationMetricsProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs md:text-sm">
        <span className="text-gray-600">Omsättning</span>
        <span className="font-medium">{revenue.toLocaleString()} SEK</span>
      </div>
      <div className="flex justify-between text-xs md:text-sm">
        <span className="text-gray-600">Tillväxt</span>
        <span className="font-medium">{growth}%</span>
      </div>
      <div className="flex justify-between text-xs md:text-sm">
        <span className="text-gray-600">Team</span>
        <span className="font-medium">{team_size} personer</span>
      </div>
    </div>
  );
}