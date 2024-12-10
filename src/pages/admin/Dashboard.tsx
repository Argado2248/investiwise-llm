import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EvaluationResults } from "@/components/EvaluationResults";

export function Dashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate('/login');
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: evaluations, isLoading } = useQuery({
    queryKey: ['startup-evaluations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('startup_evaluations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to fetch evaluations');
        throw error;
      }
      return data;
    },
  });

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
      navigate('/login');
    }
  };

  const calculateScore = (evaluation) => {
    const weights = {
      revenue: 0.2,
      growth: 0.3,
      market_size: 0.2,
      team_size: 0.15,
      burn_rate: 0.15
    };

    const score = (
      (evaluation.revenue / 1000000) * weights.revenue +
      evaluation.growth * weights.growth +
      (evaluation.market_size / 1000000000) * weights.market_size +
      (evaluation.team_size / 10) * weights.team_size +
      (1 - evaluation.burn_rate / 1000000) * weights.burn_rate
    ) * 100;

    return Math.min(Math.max(Math.round(score), 0), 100);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="bg-white shadow w-full">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Startup Utvärderingar</h1>
          <Button 
            variant="outline"
            onClick={handleSignOut}
            className="ml-4"
          >
            Logga ut
          </Button>
        </div>
      </header>

      <main className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evaluations?.map((evaluation) => {
            const score = calculateScore(evaluation);
            return (
              <Card key={evaluation.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
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

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
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
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}