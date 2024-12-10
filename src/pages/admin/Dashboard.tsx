import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { MetricsTable } from "./MetricsTable";
import { Button } from "@/components/ui/button";
import { Download, Filter, RefreshCw } from "lucide-react";

export function Dashboard() {
  const [filters, setFilters] = useState({
    score: "",
    industry: "",
    stage: "",
    marketSize: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen flex w-full">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Uppdatera
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exportera
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <h3 className="font-medium text-sm text-gray-500 mb-4">Totalt antal företag</h3>
              <p className="text-3xl font-bold">156</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-medium text-sm text-gray-500 mb-4">Genomsnittlig poäng</h3>
              <p className="text-3xl font-bold text-primary">72.5</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-medium text-sm text-gray-500 mb-4">Högsta poäng</h3>
              <p className="text-3xl font-bold text-green-600">94</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-medium text-sm text-gray-500 mb-4">Lägsta poäng</h3>
              <p className="text-3xl font-bold text-red-600">45</p>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="h-5 w-5 text-gray-500" />
              <h2 className="text-xl font-semibold">Filtrera resultat</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Poäng</label>
                <Input
                  type="number"
                  placeholder="Minimum poäng"
                  value={filters.score}
                  onChange={(e) => handleFilterChange("score", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Bransch</label>
                <Select
                  value={filters.industry}
                  onValueChange={(value) => handleFilterChange("industry", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Välj bransch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="fintech">Fintech</SelectItem>
                    <SelectItem value="ecommerce">E-handel</SelectItem>
                    <SelectItem value="deeptech">Deeptech</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Fas</label>
                <Select
                  value={filters.stage}
                  onValueChange={(value) => handleFilterChange("stage", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Välj fas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-seed">Pre-sådd</SelectItem>
                    <SelectItem value="seed">Sådd</SelectItem>
                    <SelectItem value="series-a">Serie A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Marknadsstorlek</label>
                <Select
                  value={filters.marketSize}
                  onValueChange={(value) => handleFilterChange("marketSize", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Välj storlek" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">&lt; 100M SEK</SelectItem>
                    <SelectItem value="medium">100M - 1B SEK</SelectItem>
                    <SelectItem value="large">&gt; 1B SEK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <MetricsTable filters={filters} />
          </Card>
        </div>
      </main>
    </div>
  );
}