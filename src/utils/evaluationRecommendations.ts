export const generateRecommendation = (overallScore: number, fundingStage: string): string => {
  if (fundingStage === "pre-sadd" || fundingStage === "sadd") {
    if (overallScore >= 75) {
      return "Mycket lovande tidigt stadie startup med stark marknadspotential och team. Rekommenderar fortsatt due diligence med fokus på produktvalidering och go-to-market strategi.";
    } else if (overallScore >= 55) {
      return "Visar potential men behöver ytterligare validering. Föreslår mentor-program och potentiellt mindre investeringsrunda för att bevisa konceptet.";
    } else {
      return "Behöver mer utveckling innan investeringsberedskap. Fokusera på att stärka team, produktvalidering och marknadsstrategi.";
    }
  } else {
    if (overallScore >= 80) {
      return "Exceptionell potential med starka mätvärden. Rekommenderar att gå vidare med en djupare due diligence och potentiell investering.";
    } else if (overallScore >= 60) {
      return "Lovande potential men har förbättringsområden. Föreslår ytterligare uppföljning och analys av specifika nyckeltal.";
    } else {
      return "Möter för närvarande inte investeringskriterierna. Fokusera på att förbättra nyckeltal innan ny utvärdering.";
    }
  }
};