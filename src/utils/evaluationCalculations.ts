export const calculateMarketPotentialScore = (
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

export const calculateTeamScore = (teamSize: number, fundingStage: string) => {
  const expectedSize = {
    "Pre-sådd": 2,
    "Sådd": 4,
    "Serie A": 8,
  }[fundingStage] || 5;

  const score = (teamSize / expectedSize) * 100;
  return Math.min(100, Math.max(0, score));
};

export const calculateFinancialHealthScore = (
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

export const calculateGrowthScore = (
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