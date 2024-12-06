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
        title: "Validation Error",
        description: "Please fill in all fields",
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
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="e.g., SaaS, Fintech"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Annual Revenue ($)</Label>
              <Input
                id="revenue"
                name="revenue"
                type="number"
                value={formData.revenue}
                onChange={handleChange}
                placeholder="Annual revenue in USD"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="growth">YoY Growth (%)</Label>
              <Input
                id="growth"
                name="growth"
                type="number"
                value={formData.growth}
                onChange={handleChange}
                placeholder="Year-over-year growth"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="marketSize">Total Market Size ($B)</Label>
              <Input
                id="marketSize"
                name="marketSize"
                type="number"
                value={formData.marketSize}
                onChange={handleChange}
                placeholder="TAM in billions USD"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Input
                id="teamSize"
                name="teamSize"
                type="number"
                value={formData.teamSize}
                onChange={handleChange}
                placeholder="Number of employees"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fundingStage">Current Funding Stage</Label>
              <Input
                id="fundingStage"
                name="fundingStage"
                value={formData.fundingStage}
                onChange={handleChange}
                placeholder="e.g., Seed, Series A"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="burnRate">Monthly Burn Rate ($)</Label>
              <Input
                id="burnRate"
                name="burnRate"
                type="number"
                value={formData.burnRate}
                onChange={handleChange}
                placeholder="Monthly burn rate in USD"
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          Evaluate Startup
        </Button>
      </form>
    </Card>
  );
}