import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EvaluationCard } from "@/components/admin/EvaluationCard";
import { History } from "lucide-react";
import { Link } from "react-router-dom";

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

  const { data: evaluations, isLoading, refetch } = useQuery({
    queryKey: ['startup-evaluations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('startup_evaluations')
        .select('*')
        .eq('deleted', false)
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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Startup Utvärderingar</h1>
          <div className="flex items-center gap-6">
            <Link 
              to="/admin/history" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
              title="History"
            >
              <History size={20} />
            </Link>
            <Button 
              variant="outline"
              size="sm"
              onClick={handleSignOut}
            >
              Logga ut
            </Button>
          </div>
        </div>
      </header>

      <main className="w-full px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evaluations?.map((evaluation) => (
            <EvaluationCard
              key={evaluation.id}
              evaluation={evaluation}
              score={calculateScore(evaluation)}
              onDelete={refetch}
            />
          ))}
        </div>
      </main>
    </div>
  );
}