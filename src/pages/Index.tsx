import { useState } from "react";
import { EvaluationForm } from "@/components/EvaluationForm";
import { EvaluationResults } from "@/components/EvaluationResults";

const Index = () => {
  const [results, setResults] = useState<any>(null);

  const calculateMetricScore = (value: number, benchmark: number, weight: number) => {
    const score = (value / benchmark) * 100;
    return Math.min(100, Math.max(0, score)) * weight;
  };

  const handleEvaluation = (formData: any) => {
    // Convert string inputs to numbers
    const revenue = parseFloat(formData.revenue);
    const growth = parseFloat(formData.growth);
    const marketSize = parseFloat(formData.marketSize);
    const teamSize = parseFloat(formData.teamSize);
    const burnRate = parseFloat(formData.burnRate);

    // Calculate individual metric scores
    const metrics = [
      {
        category: "Marknadsmöjlighet",
        score: calculateMetricScore(marketSize, 1000, 0.3),
        benchmark: 70
      },
      {
        category: "Finansiell Hälsa",
        score: calculateMetricScore(revenue / burnRate, 1.5, 0.25),
        benchmark: 75
      },
      {
        category: "Team & Genomförande",
        score: calculateMetricScore(teamSize, 10, 0.2),
        benchmark: 65
      },
      {
        category: "Tillväxtmått",
        score: calculateMetricScore(growth, 100, 0.25),
        benchmark: 80
      },
    ];

    // Calculate overall score (weighted average)
    const overallScore = Math.round(
      metrics.reduce((acc, metric) => acc + metric.score, 0) / metrics.length
    );

    // Generate recommendation based on score
    let recommendation = "";
    if (overallScore >= 80) {
      recommendation = "Företaget visar exceptionell potential med starka mätvärden över hela linjen. Rekommenderar att gå vidare med en djupare due diligence och potentiell investering.";
    } else if (overallScore >= 60) {
      recommendation = "Företaget visar lovande potential men har några områden som behöver förbättras. Föreslår ytterligare uppföljning och analys av specifika nyckeltal.";
    } else {
      recommendation = "Företaget möter för närvarande inte investeringskriterierna. Fokusera på att förbättra nyckeltal inom tillväxt och finansiell hälsa innan ny utvärdering.";
    }

    // Round metric scores for display
    const roundedMetrics = metrics.map(metric => ({
      ...metric,
      score: Math.round(metric.score)
    }));

    setResults({
      score: overallScore,
      recommendation,
      metrics: roundedMetrics,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Startup Utvärderingsverktyg
          </h1>
          <p className="text-lg text-gray-600">
            Utvärdera din startups investeringspotential med VC-metodik
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