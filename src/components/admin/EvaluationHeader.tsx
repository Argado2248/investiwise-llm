interface EvaluationHeaderProps {
  company_name: string;
  industry: string;
  score: number;
}

export function EvaluationHeader({ company_name, industry, score }: EvaluationHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-base md:text-xl font-semibold text-gray-900">{company_name}</h3>
        <p className="text-xs md:text-sm text-gray-500">{industry}</p>
      </div>
      <div className={`text-base md:text-lg font-bold ${
        score >= 80 ? 'text-green-600' : 
        score >= 60 ? 'text-yellow-600' : 
        'text-red-600'
      }`}>
        {score}/100
      </div>
    </div>
  );
}