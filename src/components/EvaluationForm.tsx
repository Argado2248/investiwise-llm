import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SelectField } from "./form/SelectField";
import { NumberField } from "./form/NumberField";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FormFieldWithTooltip } from "./FormFieldWithTooltip";
import { supabase } from "@/integrations/supabase/client";

const fundingStages = [
  { value: "pre-sadd", label: "Pre-sådd" },
  { value: "sadd", label: "Sådd" },
  { value: "angel", label: "Ängelrunda" },
  { value: "serie-a", label: "Serie A" }
];

const productStages = [
  { value: "concept", label: "Koncept/Idé" },
  { value: "mvp", label: "MVP" },
  { value: "beta", label: "Beta" },
  { value: "launched", label: "Lanserad" },
  { value: "scaling", label: "Skalning" }
];

const fieldTooltips = {
  companyName: "Ange det officiella företagsnamnet som används i juridiska dokument.",
  industry: "Välj den primära bransch där företaget verkar.",
  revenue: "Ange den totala årliga omsättningen i SEK. För pre-revenue startups, ange 0.",
  growth: "Procentuell tillväxt jämfört med föregående år. För nya företag, ange förväntad tillväxt.",
  marketSize: "Total adresserbar marknad (TAM) i miljoner SEK.",
  teamSize: "Antal heltidsanställda inklusive grundare.",
  burnRate: "Genomsnittlig månatlig kostnad i SEK."
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
    productStage: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some(value => !value)) {
      toast({
        title: "Valideringsfel",
        description: "Vänligen fyll i alla obligatoriska fält",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('startup_evaluations')
        .insert({
          company_name: formData.companyName,
          industry: formData.industry,
          revenue: Number(formData.revenue),
          growth: Number(formData.growth),
          market_size: Number(formData.marketSize),
          team_size: Number(formData.teamSize),
          funding_stage: formData.fundingStage,
          burn_rate: Number(formData.burnRate),
          product_stage: formData.productStage
        });

      if (error) throw error;

      toast({
        title: "Utvärdering sparad",
        description: "Din startup-utvärdering har sparats framgångsrikt.",
      });

      onSubmit(formData);
    } catch (error) {
      console.error('Error saving evaluation:', error);
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte spara utvärderingen. Försök igen senare.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
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
                type="text"
              />
              <FormFieldWithTooltip
                label="Bransch"
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="t.ex. SaaS, Fintech"
                tooltip={fieldTooltips.industry}
                type="text"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Finansieringsfas"
                value={formData.fundingStage}
                onChange={(value) => handleSelectChange("fundingStage", value)}
                options={fundingStages}
                placeholder="Välj finansieringsfas"
              />
              <SelectField
                label="Produktstadie"
                value={formData.productStage}
                onChange={(value) => handleSelectChange("productStage", value)}
                options={productStages}
                placeholder="Välj produktstadie"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NumberField
                label="Årlig Omsättning (SEK)"
                id="revenue"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                placeholder="Årlig omsättning i SEK"
                tooltip={fieldTooltips.revenue}
              />
              <NumberField
                label="Tillväxt YoY (%)"
                id="growth"
                name="growth"
                value={formData.growth}
                onChange={handleChange}
                placeholder="År över år tillväxt"
                tooltip={fieldTooltips.growth}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NumberField
                label="Total Marknadsstorlek (MSEK)"
                id="marketSize"
                name="marketSize"
                value={formData.marketSize}
                onChange={handleChange}
                placeholder="TAM i miljoner SEK"
                tooltip={fieldTooltips.marketSize}
              />
              <NumberField
                label="Teamstorlek"
                id="teamSize"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                placeholder="Antal anställda"
                tooltip={fieldTooltips.teamSize}
              />
            </div>

            <NumberField
              label="Månatlig Burn Rate (SEK)"
              id="burnRate"
              name="burnRate"
              value={formData.burnRate}
              onChange={handleChange}
              placeholder="Månatlig burn rate i SEK"
              tooltip={fieldTooltips.burnRate}
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Utvärdera Startup
          </Button>
        </form>
      </Card>
    </TooltipProvider>
  );
}