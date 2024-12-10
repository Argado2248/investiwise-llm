import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EvaluationResults } from "@/components/EvaluationResults";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{evaluation.company_name}</h3>
            <p className="text-sm text-gray-500">{evaluation.industry}</p>
          </div>
          <div className={`text-lg font-bold ${
            score >= 80 ? 'text-green-600' : 
            score >= 60 ? 'text-yellow-600' : 
            'text-red-600'
          }`}>
            {score}/100
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Omsättning</span>
            <span className="text-sm font-medium">{evaluation.revenue.toLocaleString()} SEK</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Tillväxt</span>
            <span className="text-sm font-medium">{evaluation.growth}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Team</span>
            <span className="text-sm font-medium">{evaluation.team_size} personer</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Utforska
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{evaluation.company_name} - Detaljerad Utvärdering</DialogTitle>
              </DialogHeader>
              <EvaluationResults
                data={{
                  score,
                  recommendation: `Baserat på vår analys av ${evaluation.company_name}, rekommenderar vi följande åtgärder för att optimera företagets tillväxtpotential och marknadspenetration.`,
                  metrics: [
                    {
                      category: "Omsättning",
                      score: Math.min((evaluation.revenue / 1000000) * 100, 100),
                      benchmark: 75,
                      impact: `Nuvarande omsättning på ${evaluation.revenue.toLocaleString()} SEK indikerar företagets marknadspenetration och intäktsgenereringsförmåga.`
                    },
                    {
                      category: "Tillväxt",
                      score: evaluation.growth,
                      benchmark: 80,
                      impact: `En tillväxttakt på ${evaluation.growth}% visar på företagets expansionsförmåga och marknadsmöjligheter.`
                    },
                    {
                      category: "Marknadsstorlek",
                      score: Math.min((evaluation.market_size / 1000000000) * 100, 100),
                      benchmark: 70,
                      impact: `Den totala adresserbara marknaden på ${evaluation.market_size.toLocaleString()} MSEK indikerar skalningspotentialen.`
                    },
                    {
                      category: "Team",
                      score: Math.min((evaluation.team_size / 10) * 100, 100),
                      benchmark: 65,
                      impact: `Teamet består av ${evaluation.team_size} personer, vilket påverkar företagets genomförandekapacitet.`
                    },
                    {
                      category: "Burn Rate",
                      score: Math.max(100 - (evaluation.burn_rate / 1000000) * 100, 0),
                      benchmark: 60,
                      impact: `En burn rate på ${evaluation.burn_rate.toLocaleString()} SEK påverkar företagets finansiella uthållighet.`
                    }
                  ]
                }}
              />
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-500 hover:border-red-500"
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>
    </Card>
  );
}