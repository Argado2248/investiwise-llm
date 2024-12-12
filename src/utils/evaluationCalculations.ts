export const calculateMarketPotentialScore = (
  marketSize: number,
  industry: string,
  fundingStage: string
) => {
  // Based on KTH Innovation Readiness Level - Market Component
  const stageMultiplier = {
    "pre-sadd": 1.5,
    "sadd": 1.2,
    "angel": 1.1,
    "serie-a": 1.0,
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

export const calculateTeamScore = (
  teamSize: number,
  teamExperienceYears: number,
  teamDomainExpertise: string,
  fundingStage: string
) => {
  // Based on KTH Innovation Readiness Level - Team Component
  const expectedSize = {
    "pre-sadd": 2,
    "sadd": 4,
    "angel": 6,
    "serie-a": 8,
  }[fundingStage] || 5;

  const sizeScore = (teamSize / expectedSize) * 40;
  const experienceScore = Math.min(30, (teamExperienceYears / 10) * 30);
  const expertiseScore = teamDomainExpertise ? 30 : 0;

  return Math.min(100, sizeScore + experienceScore + expertiseScore);
};

export const calculateFinancialHealthScore = (
  revenue: number,
  burnRate: number,
  fundingStage: string
) => {
  // Based on KTH Innovation Readiness Level - Business Component
  if (fundingStage === "pre-sadd" || fundingStage === "sadd") {
    const runway = revenue > 0 ? (revenue * 12) / burnRate : 0;
    return Math.min(100, (runway / 18) * 100);
  }

  const revenueScore = Math.min(50, (revenue / burnRate) * 25);
  const burnRateScore = burnRate > 0 ? Math.min(50, (revenue / burnRate) * 25) : 0;

  return revenueScore + burnRateScore;
};

export const calculateGrowthScore = (
  growth: number,
  fundingStage: string,
  revenue: number
) => {
  // Based on KTH Innovation Readiness Level - Growth Component
  if (revenue < 100000 && (fundingStage === "pre-sadd" || fundingStage === "sadd")) {
    return growth > 0 ? 70 : 40;
  }

  const expectedGrowth = {
    "pre-sadd": 20,
    "sadd": 50,
    "angel": 75,
    "serie-a": 100,
  }[fundingStage] || 50;

  return Math.min(100, (growth / expectedGrowth) * 100);
};