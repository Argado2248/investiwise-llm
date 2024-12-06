import { useState } from "react";
import { EvaluationForm } from "@/components/EvaluationForm";
import { EvaluationResults } from "@/components/EvaluationResults";

const Index = () => {
  const [results, setResults] = useState<any>(null);

  const handleEvaluation = (formData: any) => {
    // This is a mock evaluation - in a real app, this would call an API
    const mockResults = {
      score: 75,
      recommendation: "Baserat på utvärderingen visar detta startup stark potential med över genomsnittliga tillväxtmått. Överväg ytterligare due diligence på teamets genomförandeförmåga och marknadsstrategi.",
      metrics: [
        { category: "Marknadsmöjlighet", score: 85, benchmark: 70 },
        { category: "Finansiell Hälsa", score: 70, benchmark: 75 },
        { category: "Team & Genomförande", score: 80, benchmark: 65 },
        { category: "Tillväxtmått", score: 65, benchmark: 80 },
      ],
    };
    setResults(mockResults);
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