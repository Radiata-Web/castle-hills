import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SERVICE_LABELS, type ServiceId } from "@/lib/ballpark";
import { ctaPrimaryClassName } from "@/lib/cta";

type MinimumDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
  suggestedService?: ServiceId;
  onAddService: (service: ServiceId) => void;
  onKeep: () => void;
};

export function MinimumDialog({
  open,
  onOpenChange,
  message,
  suggestedService,
  onAddService,
  onKeep,
}: MinimumDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Small project?</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
          {suggestedService ? (
            <Button
              className={`min-h-11 ${ctaPrimaryClassName}`}
              onClick={() => onAddService(suggestedService)}
            >
              Add {SERVICE_LABELS[suggestedService].toLowerCase()}
            </Button>
          ) : null}
          <Button variant="outline" className="min-h-11" onClick={onKeep}>
            Keep my ballpark
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
