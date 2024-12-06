import { Card } from "@/components/ui/card";

interface EvaluationResultsProps {
  data: {
    score: number;
    recommendation: string;
    metrics: {
      category: string;
      score: number;
      benchmark: number;
    }[];
  };
}

export function EvaluationResults({ data }: EvaluationResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreWidth = (score: number) => `${score}%`;

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto bg-white shadow-lg animate-fade-in">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Utvärderingspoäng</h2>
          <p className={`text-4xl font-bold ${getScoreColor(data.score)}`}>
            {data.score}/100
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Mätetal Uppdelning</h3>
          {data.metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{metric.category}</span>
                <span>{metric.score}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-secondary rounded-full"
                  style={{ width: getScoreWidth(metric.score) }}
                />
              </div>
              <div className="text-xs text-gray-500">
                Branschriktmärke: {metric.benchmark}%
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Rekommendation</h3>
          <p className="text-gray-700">{data.recommendation}</p>
        </div>
      </div>
    </Card>
  );
}