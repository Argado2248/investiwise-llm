import { useState } from "react";
import { EvaluationForm } from "@/components/EvaluationForm";
import { EvaluationResults } from "@/components/EvaluationResults";

const Index = () => {
  const [results, setResults] = useState<any>(null);

  const handleEvaluation = (formData: any) => {
    // This is a mock evaluation - in a real app, this would call an API
    const mockResults = {
      score: 75,
      recommendation: "Based on the evaluation, this startup shows strong potential with above-average growth metrics. Consider further due diligence on the team's execution capability and market strategy.",
      metrics: [
        { category: "Market Opportunity", score: 85, benchmark: 70 },
        { category: "Financial Health", score: 70, benchmark: 75 },
        { category: "Team & Execution", score: 80, benchmark: 65 },
        { category: "Growth Metrics", score: 65, benchmark: 80 },
      ],
    };
    setResults(mockResults);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Startup Evaluation Tool
          </h1>
          <p className="text-lg text-gray-600">
            Evaluate your startup's investment potential using VC methodology
          </p>
        </div>

        <div className="space-y-8">
          <EvaluationForm onSubmit={handleEvaluation} />
          {results && <EvaluationResults data={results} />}
        </div>
      </div>
    </div>
  );
};

export default Index;