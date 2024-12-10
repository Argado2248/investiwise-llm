import { useState } from "react";
import { EvaluationForm } from "@/components/EvaluationForm";
import { EvaluationResults } from "@/components/EvaluationResults";
import { EvaluationHeader } from "@/components/evaluation/EvaluationHeader";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  calculateMarketPotentialScore,
  calculateTeamScore,
  calculateFinancialHealthScore,
  calculateGrowthScore
} from "@/utils/evaluationCalculations";
import { generateRecommendation } from "@/utils/evaluationRecommendations";

const Index = () => {
  const [results, setResults] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const navigate = useNavigate();

  const handleEvaluation = (formData: any) => {
    setFormData(formData);
    const revenue = parseFloat(formData.revenue);
    const growth = parseFloat(formData.growth);
    const marketSize = parseFloat(formData.marketSize);
    const teamSize = parseFloat(formData.teamSize);
    const burnRate = parseFloat(formData.burnRate);
    const { industry, fundingStage } = formData;

    const marketPotentialScore = calculateMarketPotentialScore(marketSize, industry, fundingStage);
    const financialHealthScore = calculateFinancialHealthScore(revenue, burnRate, fundingStage);
    const teamScore = calculateTeamScore(teamSize, fundingStage);
    const growthScore = calculateGrowthScore(growth, fundingStage, revenue);

    const metrics = [
      {
        category: "Marknadspotential",
        score: marketPotentialScore * 0.35,
        benchmark: 70,
        impact: `Baserat på marknadsstorlek ${marketSize}M SEK och ${industry}-industrin`,
        source: "Nordic Market Analysis Report 2023",
        rawData: { marketSize, industry }
      },
      {
        category: "Finansiell Hälsa",
        score: financialHealthScore * 0.20,
        benchmark: 65,
        impact: `Baserat på ${revenue} SEK i omsättning och ${burnRate} SEK burn rate`,
        source: "Nordic Startup Financial Health Index 2023",
        rawData: { revenue, burnRate }
      },
      {
        category: "Team & Genomförande",
        score: teamScore * 0.30,
        benchmark: 65,
        impact: `Team med ${teamSize} medlemmar i ${fundingStage}-fas`,
        source: "Nordic Startup Team Analysis 2023",
        rawData: { teamSize }
      },
      {
        category: "Tillväxtmått",
        score: growthScore * 0.15,
        benchmark: 70,
        impact: `${growth}% tillväxt i ${fundingStage}-fas`,
        source: "Nordic Scale-up Report 2023",
        rawData: { growth }
      },
    ];

    const overallScore = Math.round(
      metrics.reduce((acc, metric) => acc + metric.score, 0)
    );

    const recommendation = generateRecommendation(overallScore, fundingStage);

    const roundedMetrics = metrics.map(metric => ({
      ...metric,
      score: Math.round(metric.score)
    }));

    setResults({
      score: overallScore,
      recommendation,
      metrics: roundedMetrics,
      rawData: formData
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-y-auto">
      <div className="flex justify-end p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/login')}
          className="gap-2"
        >
          <LogIn className="h-4 w-4" />
          Admin Login
        </Button>
      </div>
      <EvaluationHeader />
      <div className="space-y-6 sm:space-y-8 px-8 py-8 mx-auto max-w-7xl">
        <EvaluationForm onSubmit={handleEvaluation} />
        {results && (
          <EvaluationResults data={results} />
        )}
      </div>
    </div>
  );
};

export default Index;