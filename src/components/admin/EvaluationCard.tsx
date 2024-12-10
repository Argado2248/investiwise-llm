import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EvaluationHeader } from "./EvaluationHeader";
import { EvaluationMetrics } from "./EvaluationMetrics";
import { EvaluationActions } from "./EvaluationActions";

interface EvaluationCardProps {
  evaluation: {
    id: string;
    company_name: string;
    industry: string;
    revenue: number;
    growth: number;
    team_size: number;
    market_size: number;
    burn_rate: number;
    funding_stage: string;
    product_stage: string;
  };
  score: number;
  onDelete?: () => void;
}

export function EvaluationCard({ evaluation, score, onDelete }: EvaluationCardProps) {
  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('startup_evaluations')
        .update({ deleted: true })
        .eq('id', evaluation.id);

      if (error) throw error;
      
      toast.success('Evaluation moved to recycle bin');
      if (onDelete) onDelete();
    } catch (error) {
      toast.error('Failed to delete evaluation');
      console.error('Error:', error);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 md:p-6 space-y-3 md:space-y-4">
        <EvaluationHeader 
          company_name={evaluation.company_name}
          industry={evaluation.industry}
          score={score}
        />
        
        <EvaluationMetrics
          revenue={evaluation.revenue}
          growth={evaluation.growth}
          team_size={evaluation.team_size}
        />

        <EvaluationActions
          evaluation={evaluation}
          score={score}
          onDelete={handleDelete}
        />
      </div>
    </Card>
  );
}