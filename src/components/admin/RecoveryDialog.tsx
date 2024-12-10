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
  onRecover: () => Promise<void>;
}

export function RecoveryDialog({
  isOpen,
  onOpenChange,
  selectedEvaluation,
  onRecover,
}: RecoveryDialogProps) {
  const handleRecover = async () => {
    await onRecover();
    onOpenChange(false);
  };

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
          <AlertDialogAction onClick={handleRecover}>Ja</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}