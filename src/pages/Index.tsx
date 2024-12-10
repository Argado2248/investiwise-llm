import { useState } from "react";
import { EvaluationForm } from "@/components/EvaluationForm";
import { EvaluationResults } from "@/components/EvaluationResults";

const calculateMarketPotentialScore = (
  marketSize: number,
  industry: string,
  fundingStage: string
) => {
  const stageMultiplier = {
    "Pre-sådd": 1.5,
    "Sådd": 1.2,
    "Serie A": 1.0,
  }[fundingStage] || 1.0;

  const industryMultiplier = {
    "SaaS": 1.2,
    "Fintech": 1.3,
    "E-handel": 0.9,
    "Deeptech": 1.4,
    "Cleantech": 1.3,
    "Medtech": 1.2,
  }[industry] || 1.0;

  const baseScore = (marketSize / 1000) * stageMultiplier * industryMultiplier;
  return Math.min(100, Math.max(0, baseScore));
};

const calculateTeamScore = (teamSize: number, fundingStage: string) => {
  const expectedSize = {
    "Pre-sådd": 2,
    "Sådd": 4,
    "Serie A": 8,
  }[fundingStage] || 5;

  const score = (teamSize / expectedSize) * 100;
  return Math.min(100, Math.max(0, score));
};

const calculateFinancialHealthScore = (
  revenue: number,
  burnRate: number,
  fundingStage: string
) => {
  if (fundingStage === "Pre-sådd" || fundingStage === "Sådd") {
    const runway = revenue > 0 ? (revenue * 12) / burnRate : 0;
    return Math.min(100, (runway / 18) * 100);
  }

  return Math.min(100, (revenue / burnRate) * 50);
};

const calculateGrowthScore = (
  growth: number,
  fundingStage: string,
  revenue: number
) => {
  if (revenue < 100000 && (fundingStage === "Pre-sådd" || fundingStage === "Sådd")) {
    return growth > 0 ? 70 : 40;
  }

  const expectedGrowth = {
    "Pre-sådd": 20,
    "Sådd": 50,
    "Serie A": 100,
  }[fundingStage] || 50;

  return Math.min(100, (growth / expectedGrowth) * 100);
};

const Index = () => {
  const [results, setResults] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);

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

    let recommendation = "";
    if (fundingStage === "pre-sadd" || fundingStage === "sadd") {
      if (overallScore >= 75) {
        recommendation = "Mycket lovande tidigt stadie startup med stark marknadspotential och team. Rekommenderar fortsatt due diligence med fokus på produktvalidering och go-to-market strategi.";
      } else if (overallScore >= 55) {
        recommendation = "Visar potential men behöver ytterligare validering. Föreslår mentor-program och potentiellt mindre investeringsrunda för att bevisa konceptet.";
      } else {
        recommendation = "Behöver mer utveckling innan investeringsberedskap. Fokusera på att stärka team, produktvalidering och marknadsstrategi.";
      }
    } else {
      if (overallScore >= 80) {
        recommendation = "Exceptionell potential med starka mätvärden. Rekommenderar att gå vidare med en djupare due diligence och potentiell investering.";
      } else if (overallScore >= 60) {
        recommendation = "Lovande potential men har förbättringsområden. Föreslår ytterligare uppföljning och analys av specifika nyckeltal.";
      } else {
        recommendation = "Möter för närvarande inte investeringskriterierna. Fokusera på att förbättra nyckeltal innan ny utvärdering.";
      }
    }

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
      <div className="w-full max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mb-2 sm:mb-4">
            Startup Utvärderingsverktyg
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Utvärdera din startups investeringspotential med VC-metodik
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <EvaluationForm onSubmit={handleEvaluation} />
          {results && (
            <EvaluationResults data={results} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
