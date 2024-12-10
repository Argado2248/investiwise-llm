import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RecoveryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedEvaluation: any;
  onRecover: () => void;
}

export function RecoveryDialog({
  isOpen,
  onOpenChange,
  selectedEvaluation,
  onRecover,
}: RecoveryDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Återställ utvärdering</AlertDialogTitle>
          <AlertDialogDescription>
            Är du säker på att du vill återställa utvärderingen för {selectedEvaluation?.company_name}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Nej</AlertDialogCancel>
          <AlertDialogAction onClick={onRecover}>Ja</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}