import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/Button";

interface ConfirmDeleteModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}
const ConfirmDeleteModal = ({
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="size-5 text-destructive" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">
              Confirm deletion
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Are you sure you want to delete? This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
