import { useState } from "react";
import { EvaluationForm } from "@/components/EvaluationForm";
import { EvaluationResults } from "@/components/EvaluationResults";

const Index = () => {
  const [results, setResults] = useState<any>(null);

  const calculateMarketPotentialScore = (
    marketSize: number,
    industry: string,
    fundingStage: string
  ) => {
    // Adjust market size expectations based on funding stage
    const stageMultiplier = {
      "Pre-sådd": 1.5, // Higher multiplier for very early stage
      "Sådd": 1.2,
      "Serie A": 1.0,
      // Add more stages as needed
    }[fundingStage] || 1.0;

    // Industry-specific TAM evaluation
    const industryMultiplier = {
      "SaaS": 1.2,
      "Fintech": 1.3,
      "E-handel": 0.9,
      "Deeptech": 1.4,
      "Cleantech": 1.3,
      "Medtech": 1.2,
      // Add more industries as needed
    }[industry] || 1.0;

    const baseScore = (marketSize / 1000) * stageMultiplier * industryMultiplier;
    return Math.min(100, Math.max(0, baseScore));
  };

  const calculateTeamScore = (teamSize: number, fundingStage: string) => {
    // Adjust team size expectations based on stage
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
      // For very early stage, focus more on runway and burn rate
      const runway = revenue > 0 ? (revenue * 12) / burnRate : 0;
      return Math.min(100, (runway / 18) * 100); // 18 months runway as benchmark
    }

    // For later stages, use traditional metrics
    return Math.min(100, (revenue / burnRate) * 50);
  };

  const calculateGrowthScore = (
    growth: number,
    fundingStage: string,
    revenue: number
  ) => {
    if (revenue < 100000 && (fundingStage === "Pre-sådd" || fundingStage === "Sådd")) {
      // For pre-revenue or very early revenue companies
      return growth > 0 ? 70 : 40; // Base score on having positive growth trajectory
    }

    // Traditional growth evaluation for more established companies
    const expectedGrowth = {
      "Pre-sådd": 20,
      "Sådd": 50,
      "Serie A": 100,
    }[fundingStage] || 50;

    return Math.min(100, (growth / expectedGrowth) * 100);
  };

  const handleEvaluation = (formData: any) => {
    // Convert string inputs to numbers
    const revenue = parseFloat(formData.revenue);
    const growth = parseFloat(formData.growth);
    const marketSize = parseFloat(formData.marketSize);
    const teamSize = parseFloat(formData.teamSize);
    const burnRate = parseFloat(formData.burnRate);
    const { industry, fundingStage } = formData;

    // Calculate individual metric scores with weights adjusted for early stage
    const metrics = [
      {
        category: "Marknadspotential",
        score: calculateMarketPotentialScore(marketSize, industry, fundingStage) * 0.35, // Increased weight for market potential
        benchmark: 70
      },
      {
        category: "Finansiell Hälsa",
        score: calculateFinancialHealthScore(revenue, burnRate, fundingStage) * 0.20,
        benchmark: 65
      },
      {
        category: "Team & Genomförande",
        score: calculateTeamScore(teamSize, fundingStage) * 0.30, // Increased weight for team
        benchmark: 65
      },
      {
        category: "Tillväxtmått",
        score: calculateGrowthScore(growth, fundingStage, revenue) * 0.15,
        benchmark: 70
      },
    ];

    // Calculate overall score (weighted average)
    const overallScore = Math.round(
      metrics.reduce((acc, metric) => acc + metric.score, 0)
    );

    // Generate recommendation based on score and stage
    let recommendation = "";
    if (fundingStage === "Pre-sådd" || fundingStage === "Sådd") {
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