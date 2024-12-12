import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { CompanyInfoFields } from "./evaluation/CompanyInfoFields";
import { FinancialFields } from "./evaluation/FinancialFields";
import { TeamMarketFields } from "./evaluation/TeamMarketFields";

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
  burnRate: "Genomsnittlig månatlig kostnad i SEK.",
  teamExperienceYears: "Genomsnittligt antal års relevant arbetserfarenhet i teamet.",
  teamDomainExpertise: "Teamets huvudsakliga expertisområden inom branschen.",
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
    productStage: "",
    teamExperienceYears: "",
    teamDomainExpertise: "",
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
          product_stage: formData.productStage,
          team_experience_years: Number(formData.teamExperienceYears),
          team_domain_expertise: formData.teamDomainExpertise,
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
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-8">
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-primary mb-6">Företagsinformation</h2>
              <CompanyInfoFields
                formData={formData}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                productStages={productStages}
                fieldTooltips={fieldTooltips}
              />
            </div>
            
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-primary mb-6">Finansiell Information</h2>
              <FinancialFields
                formData={formData}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                fundingStages={fundingStages}
                fieldTooltips={fieldTooltips}
              />
            </div>
            
            <div className="pb-4">
              <h2 className="text-xl font-semibold text-primary mb-6">Team & Marknad</h2>
              <TeamMarketFields
                formData={formData}
                handleChange={handleChange}
                fieldTooltips={fieldTooltips}
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