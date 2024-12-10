import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Företag</TableHead>
                <TableHead>Bransch</TableHead>
                <TableHead>Fas</TableHead>
                <TableHead>Omsättning</TableHead>
                <TableHead>Tillväxt</TableHead>
                <TableHead>Marknadsstorlek</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Burn Rate</TableHead>
                <TableHead>Produktstadie</TableHead>
                <TableHead>Datum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evaluations?.map((evaluation) => (
                <TableRow key={evaluation.id}>
                  <TableCell className="font-medium">{evaluation.company_name}</TableCell>
                  <TableCell>{evaluation.industry}</TableCell>
                  <TableCell>{evaluation.funding_stage}</TableCell>
                  <TableCell>{evaluation.revenue.toLocaleString()} SEK</TableCell>
                  <TableCell>{evaluation.growth}%</TableCell>
                  <TableCell>{evaluation.market_size.toLocaleString()} MSEK</TableCell>
                  <TableCell>{evaluation.team_size}</TableCell>
                  <TableCell>{evaluation.burn_rate.toLocaleString()} SEK</TableCell>
                  <TableCell>{evaluation.product_stage}</TableCell>
                  <TableCell>{new Date(evaluation.created_at).toLocaleDateString('sv-SE')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}