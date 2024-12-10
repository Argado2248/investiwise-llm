import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DeletedEvaluationsMenuProps {
  recentlyDeleted: any[];
  onSelectEvaluation: (evaluation: any) => void;
}

export function DeletedEvaluationsMenu({ 
  recentlyDeleted, 
  onSelectEvaluation 
}: DeletedEvaluationsMenuProps) {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <History className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="center" 
        className="w-[90vw] md:w-[300px]"
        sideOffset={8}
      >
        <DropdownMenuLabel>Nyligen raderade</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {recentlyDeleted && recentlyDeleted.length > 0 ? (
            recentlyDeleted.map((evaluation) => (
              <DropdownMenuItem 
                key={evaluation.id} 
                className="flex flex-col items-start w-full py-2"
                onClick={() => onSelectEvaluation(evaluation)}
              >
                <span className="font-medium">{evaluation.company_name}</span>
                <span className="text-sm text-gray-500">
                  {new Date(evaluation.updated_at).toLocaleDateString('sv-SE')}
                </span>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled>Inga raderade utvärderingar</DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        {recentlyDeleted && recentlyDeleted.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={() => navigate('/admin/history')}
            >
              Visa alla raderade
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}