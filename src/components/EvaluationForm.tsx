import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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

  return (
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
              <Label htmlFor="fundingStage">Nuvarande Finansieringsfas</Label>
              <Input
                id="fundingStage"
                name="fundingStage"
                value={formData.fundingStage}
                onChange={handleChange}
                placeholder="t.ex. Sådd, Serie A"
              />
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
  );
}