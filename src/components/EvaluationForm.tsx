import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
              <div className="space-y-2">
                <Label htmlFor="companyName">Företagsnamn</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Ange företagsnamn"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Bransch</Label>
                <Input
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="t.ex. SaaS, Fintech"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="revenue">Årlig Omsättning (SEK)</Label>
                <Input
                  id="revenue"
                  name="revenue"
                  type="number"
                  value={formData.revenue}
                  onChange={handleChange}
                  placeholder="Årlig omsättning i SEK"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="growth">Tillväxt YoY (%)</Label>
                <Input
                  id="growth"
                  name="growth"
                  type="number"
                  value={formData.growth}
                  onChange={handleChange}
                  placeholder="År över år tillväxt"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="marketSize">Total Marknadsstorlek (MSEK)</Label>
                <Input
                  id="marketSize"
                  name="marketSize"
                  type="number"
                  value={formData.marketSize}
                  onChange={handleChange}
                  placeholder="TAM i miljoner SEK"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamSize">Teamstorlek</Label>
                <Input
                  id="teamSize"
                  name="teamSize"
                  type="number"
                  value={formData.teamSize}
                  onChange={handleChange}
                  placeholder="Antal anställda"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="fundingStage">Nuvarande Finansieringsfas</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="w-80 p-2">
                      <p className="text-sm">Välj den fas som bäst beskriver företagets nuvarande stadie. Detta påverkar hur vi värderar olika metrics i bedömningen.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select onValueChange={handleFundingStageChange} value={formData.fundingStage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj finansieringsfas" />
                  </SelectTrigger>
                  <SelectContent>
                    {fundingStages.map((stage) => (
                      <Tooltip key={stage.value}>
                        <TooltipTrigger asChild>
                          <SelectItem value={stage.value}>{stage.label}</SelectItem>
                        </TooltipTrigger>
                        <TooltipContent className="w-80 p-2">
                          <p className="text-sm">{stage.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="burnRate">Månatlig Burn Rate (SEK)</Label>
                <Input
                  id="burnRate"
                  name="burnRate"
                  type="number"
                  value={formData.burnRate}
                  onChange={handleChange}
                  placeholder="Månatlig burn rate i SEK"
                />
              </div>
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