import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Metric {
  category: string;
  score: number;
  benchmark: number;
  impact: string;
  source?: string;
  rawData?: any;
}

interface EvaluationResultsProps {
  data: {
    score: number;
    recommendation: string;
    metrics: Metric[];
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
    <Card className="p-3 md:p-6 w-full mx-auto bg-white shadow-lg animate-fade-in">
      <ScrollArea className="h-[calc(90vh-8rem)]">
        <div className="space-y-4 md:space-y-6 pr-2 md:pr-4">
          {/* Overall Score Section */}
          <div className="text-center border-b pb-3 md:pb-4">
            <h2 className="text-lg md:text-xl font-bold mb-2">Utvärderingspoäng</h2>
            <p className={`text-3xl md:text-4xl font-bold ${getScoreColor(data.score)}`}>
              {data.score}
              <span className="text-lg md:text-xl text-gray-500">/100</span>
            </p>
          </div>

          {/* Detailed Analysis Section */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold border-b pb-2">Detaljerad Analys</h3>
            {data.metrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900 text-xs md:text-sm">{metric.category}</span>
                  <span className={`font-bold text-xs md:text-sm ${getScoreColor(metric.score)}`}>
                    {metric.score}%
                  </span>
                </div>
                
                <div className="h-1.5 md:h-2 bg-gray-200 rounded-full mb-2">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: getScoreWidth(metric.score) }}
                  />
                </div>
                
                <div className="space-y-1 md:space-y-2">
                  <div className="flex items-center text-xs md:text-sm text-gray-600">
                    <span className="font-medium mr-2">Branschriktmärke:</span>
                    <span>{metric.benchmark}%</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                    {metric.impact}
                  </p>
                  {metric.source && (
                    <p className="text-xs text-gray-500 italic">
                      Källa: {metric.source}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Recommendation Section */}
          <div className="mt-4 md:mt-6 bg-primary/5 p-3 md:p-4 rounded-lg border border-primary/10">
            <h3 className="text-base md:text-lg font-semibold mb-2 text-primary">Rekommendation</h3>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-2 md:mb-3">{data.recommendation}</p>
            <p className="text-xs text-gray-500 italic">
              Rekommendationer baserade på Nordic Venture Capital Association's investeringskriterier och Nordic Startup Success Factors Study 2023.
            </p>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}