import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { EvaluationCard } from "@/components/admin/EvaluationCard";
import { RecoveryDialog } from "@/components/admin/RecoveryDialog";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import {
  calculateMarketPotentialScore,
  calculateTeamScore,
  calculateFinancialHealthScore,
  calculateGrowthScore
} from "@/utils/evaluationCalculations";

export function Dashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

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

  const { data: recentlyDeleted, refetch: refetchDeleted } = useQuery({
    queryKey: ['recently-deleted-evaluations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('startup_evaluations')
        .select('*')
        .eq('deleted', true)
        .order('updated_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Failed to fetch recently deleted evaluations:', error);
        return [];
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

  const handleRecoverEvaluation = async () => {
    try {
      const { error } = await supabase
        .from('startup_evaluations')
        .update({ deleted: false })
        .eq('id', selectedEvaluation.id);

      if (error) throw error;
      
      await Promise.all([refetch(), refetchDeleted()]);
      toast.success('Evaluation recovered successfully');
    } catch (error) {
      toast.error('Failed to recover evaluation');
      console.error('Error:', error);
    }
  };

  const calculateScore = (evaluation: any) => {
    const marketPotentialScore = calculateMarketPotentialScore(
      evaluation.market_size,
      evaluation.industry,
      evaluation.funding_stage
    );

    const financialHealthScore = calculateFinancialHealthScore(
      evaluation.revenue,
      evaluation.burn_rate,
      evaluation.funding_stage
    );

    const teamScore = calculateTeamScore(
      evaluation.team_size,
      evaluation.team_experience_years,
      evaluation.team_domain_expertise,
      evaluation.funding_stage
    );

    const growthScore = calculateGrowthScore(
      evaluation.growth,
      evaluation.funding_stage,
      evaluation.revenue
    );

    const metrics = [
      { score: marketPotentialScore * 0.35 },
      { score: financialHealthScore * 0.20 },
      { score: teamScore * 0.30 },
      { score: growthScore * 0.15 }
    ];

    const overallScore = Math.round(
      metrics.reduce((acc, metric) => acc + metric.score, 0)
    );

    return overallScore;
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader
        recentlyDeleted={recentlyDeleted || []}
        onSelectEvaluation={(evaluation) => {
          setSelectedEvaluation(evaluation);
          setIsAlertOpen(true);
        }}
        onSignOut={handleSignOut}
      />

      <RecoveryDialog
        isOpen={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        selectedEvaluation={selectedEvaluation}
        onRecover={handleRecoverEvaluation}
      />

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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