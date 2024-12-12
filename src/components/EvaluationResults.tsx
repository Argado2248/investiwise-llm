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

  const getInvestmentReadiness = (score: number) => {
    if (score >= 85) return {
      level: "Investment Ready",
      description: "Företaget är väl positionerat för investeringar med stark tillväxtpotential och låg risk."
    };
    if (score >= 70) return {
      level: "Nästan Investment Ready",
      description: "Företaget närmar sig investeringsberedskap men har några områden som behöver förbättras."
    };
    if (score >= 50) return {
      level: "Under Utveckling",
      description: "Företaget visar potential men behöver betydande förbättringar innan det är redo för investeringar."
    };
    return {
      level: "Tidig Fas",
      description: "Företaget är i ett för tidigt skede för betydande investeringar och behöver fokusera på grundläggande utveckling."
    };
  };

  const getScoreExplanation = (score: number) => {
    if (score >= 80) return "Exceptionell prestation som överträffar branschstandarder";
    if (score >= 70) return "Stark prestation med några förbättringsområden";
    if (score >= 60) return "Godtagbar prestation men betydande förbättringar krävs";
    return "Behöver omfattande förbättringar för att möta investeringskriterier";
  };

  const investmentReadiness = getInvestmentReadiness(data.score);

  return (
    <Card className="w-full bg-white shadow-lg animate-fade-in">
      <ScrollArea className="h-[calc(100vh-8rem)] p-8">
        <div className="space-y-6">
          {/* Overall Score Section */}
          <div className="text-center border-b pb-6">
            <h2 className="text-2xl font-bold mb-3">Utvärderingspoäng</h2>
            <p className={`text-5xl font-bold ${getScoreColor(data.score)}`}>
              {data.score}
              <span className="text-2xl text-gray-500">/100</span>
            </p>
            <p className="mt-3 text-gray-600">{getScoreExplanation(data.score)}</p>
          </div>

          {/* Investment Readiness Section */}
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
            <h3 className="text-xl font-semibold mb-3 text-primary">Investeringsberedskap</h3>
            <p className="font-semibold text-lg mb-2">{investmentReadiness.level}</p>
            <p className="text-gray-700">{investmentReadiness.description}</p>
          </div>

          {/* Detailed Analysis Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b pb-3">Detaljerad Analys</h3>
            {data.metrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-900 text-lg">{metric.category}</span>
                  <span className={`font-bold text-lg ${getScoreColor(metric.score)}`}>
                    {metric.score}%
                  </span>
                </div>
                
                <div className="h-3 bg-gray-200 rounded-full mb-3">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: getScoreWidth(metric.score) }}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-base text-gray-600">
                    <span className="font-medium mr-2">Branschriktmärke:</span>
                    <span>{metric.benchmark}%</span>
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed break-words">
                    {metric.impact}
                  </p>
                  {metric.source && (
                    <p className="text-sm text-gray-500 italic break-words">
                      Källa: {metric.source}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Recommendation Section */}
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
            <h3 className="text-xl font-semibold mb-3 text-primary">Rekommendation</h3>
            <p className="text-base text-gray-700 leading-relaxed break-words">{data.recommendation}</p>
            <p className="text-sm text-gray-500 italic mt-3 break-words">
              Rekommendationer baserade på Nordic Venture Capital Association's investeringskriterier och Nordic Startup Success Factors Study 2023.
            </p>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}