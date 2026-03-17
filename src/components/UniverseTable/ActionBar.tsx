import { Trash2 } from "lucide-react";
import { Button } from "../ui/Button";

interface ActionBarProps {
  selectedIds: number;
  handleBulkDelete: () => void;
}
export const ActionBar = ({
  selectedIds,
  handleBulkDelete,
}: ActionBarProps) => (
  <div className="flex items-center gap-3 mb-3 px-4 py-2 rounded-lg border border-border bg-muted/50">
    <span className="text-sm text-foreground font-medium">
      {selectedIds} selected
    </span>
    <Button
      type="button"
      variant="destructive"
      className="py-1"
      onClick={handleBulkDelete}
    >
      <Trash2 className="size-4" />
      Delete
    </Button>
  </div>
);
