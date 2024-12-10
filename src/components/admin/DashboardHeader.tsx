import { Button } from "@/components/ui/button";
import { DeletedEvaluationsMenu } from "@/components/admin/DeletedEvaluationsMenu";

interface DashboardHeaderProps {
  recentlyDeleted: any[];
  onSelectEvaluation: (evaluation: any) => void;
  onSignOut: () => void;
}

export function DashboardHeader({ 
  recentlyDeleted, 
  onSelectEvaluation, 
  onSignOut 
}: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="w-full px-4 md:px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg md:text-xl font-semibold text-gray-900">
          Startup Utvärderingar
        </h1>
        <div className="flex items-center gap-4">
          <DeletedEvaluationsMenu
            recentlyDeleted={recentlyDeleted}
            onSelectEvaluation={onSelectEvaluation}
          />
          <Button 
            variant="outline"
            size="sm"
            onClick={onSignOut}
            className="whitespace-nowrap"
          >
            Logga ut
          </Button>
        </div>
      </div>
    </header>
  );
}