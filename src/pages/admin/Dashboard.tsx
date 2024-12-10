import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EvaluationCard } from "@/components/admin/EvaluationCard";

export function Dashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate('/login');
      }
    });

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

  const calculateScore = (evaluation: any) => {
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
          {evaluations?.map((evaluation) => (
            <EvaluationCard
              key={evaluation.id}
              evaluation={evaluation}
              score={calculateScore(evaluation)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}