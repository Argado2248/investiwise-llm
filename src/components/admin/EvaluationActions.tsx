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

interface EvaluationActionsProps {
  evaluation: {
    id: string;
    company_name: string;
    revenue: number;
    growth: number;
    market_size: number;
    team_size: number;
    burn_rate: number;
  };
  score: number;
  onDelete: () => void;
}

export function EvaluationActions({ evaluation, score, onDelete }: EvaluationActionsProps) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90 text-sm md:text-base"
          >
            Utforska
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[95vw] max-w-2xl h-[90vh] p-3 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-base md:text-xl">{evaluation.company_name} - Detaljerad Utvärdering</DialogTitle>
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
        onClick={onDelete}
        className="text-gray-500 hover:text-red-500 hover:border-red-500 p-2"
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
}