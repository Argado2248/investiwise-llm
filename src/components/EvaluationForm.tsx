import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormFieldWithTooltip } from "./FormFieldWithTooltip";
import { TooltipProvider } from "@/components/ui/tooltip";

const fundingStages = [
  {
    value: "pre-sadd",
    label: "Pre-sådd",
    description: "Idéstadiet eller tidig prototyp. Påverkar scoring genom högre tolerans för låg omsättning och team-storlek.",
  },
  {
    value: "sadd",
    label: "Sådd",
    description: "MVP finns, söker första externa finansiering. Scoring fokuserar på marknadspotential och team.",
  },
  {
    value: "angel",
    label: "Ängelrunda",
    description: "Första externa investeringen. Scoring värderar tidig traktion och marknadspotential högt.",
  },
  {
    value: "serie-a",
    label: "Serie A",
    description: "Bevisad affärsmodell, söker tillväxtkapital. Scoring kräver starkare finansiella metrics.",
  }
];

const fieldTooltips = {
  companyName: "Ange det officiella företagsnamnet som används i juridiska dokument.",
  industry: "Välj den primära bransch där företaget verkar. Detta påverkar hur vi bedömer marknadspotential och tillväxtmöjligheter.",
  revenue: "Ange den totala årliga omsättningen i SEK. För pre-revenue startups, ange 0.",
  growth: "Procentuell tillväxt jämfört med föregående år. För nya företag, ange förväntad tillväxt.",
  marketSize: "Total adresserbar marknad (TAM) i miljoner SEK. Detta är den totala potentiella marknaden för er produkt/tjänst.",
  teamSize: "Antal heltidsanställda inklusive grundare. Deltidsanställda och konsulter räknas som 0.5.",
  burnRate: "Genomsnittlig månatlig kostnad i SEK för att driva verksamheten, inklusive löner och andra operativa kostnader."
};

export function EvaluationForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    revenue: "",
    growth: "",
    marketSize: "",
    teamSize: "",
    fundingStage: "",
    burnRate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some(value => !value)) {
      toast({
        title: "Valideringsfel",
        description: "Vänligen fyll i alla fält",
        variant: "destructive",
      });
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFundingStageChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      fundingStage: value,
    }));
  };

  return (
    <TooltipProvider>
      <Card className="p-6 w-full max-w-2xl mx-auto bg-white shadow-lg animate-fade-in">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldWithTooltip
                label="Företagsnamn"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Ange företagsnamn"
                tooltip={fieldTooltips.companyName}
              />
              <FormFieldWithTooltip
                label="Bransch"
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="t.ex. SaaS, Fintech"
                tooltip={fieldTooltips.industry}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldWithTooltip
                label="Årlig Omsättning (SEK)"
                id="revenue"
                name="revenue"
                type="number"
                value={formData.revenue}
                onChange={handleChange}
                placeholder="Årlig omsättning i SEK"
                tooltip={fieldTooltips.revenue}
              />
              <FormFieldWithTooltip
                label="Tillväxt YoY (%)"
                id="growth"
                name="growth"
                type="number"
                value={formData.growth}
                onChange={handleChange}
                placeholder="År över år tillväxt"
                tooltip={fieldTooltips.growth}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldWithTooltip
                label="Total Marknadsstorlek (MSEK)"
                id="marketSize"
                name="marketSize"
                type="number"
                value={formData.marketSize}
                onChange={handleChange}
                placeholder="TAM i miljoner SEK"
                tooltip={fieldTooltips.marketSize}
              />
              <FormFieldWithTooltip
                label="Teamstorlek"
                id="teamSize"
                name="teamSize"
                type="number"
                value={formData.teamSize}
                onChange={handleChange}
                placeholder="Antal anställda"
                tooltip={fieldTooltips.teamSize}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Select onValueChange={handleFundingStageChange} value={formData.fundingStage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Välj finansieringsfas" />
                    </SelectTrigger>
                    <SelectContent>
                      {fundingStages.map((stage) => (
                        <SelectItem key={stage.value} value={stage.value}>
                          {stage.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <FormFieldWithTooltip
                label="Månatlig Burn Rate (SEK)"
                id="burnRate"
                name="burnRate"
                type="number"
                value={formData.burnRate}
                onChange={handleChange}
                placeholder="Månatlig burn rate i SEK"
                tooltip={fieldTooltips.burnRate}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Utvärdera Startup
          </Button>
        </form>
      </Card>
    </TooltipProvider>
  );
}