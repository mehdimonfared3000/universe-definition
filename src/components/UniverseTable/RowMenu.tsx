import type { UniverseEntry } from "@/types/universe";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/Button";

interface RowMenuProps {
  menuRef: React.RefObject<HTMLDivElement | null>;
  menuPosition: { top: number; left: number };
  data: UniverseEntry[];
  openMenuId: string;
  closeMenu: () => void;
  requestDelete: (entries: UniverseEntry[]) => void;
}

export const RowMenu = ({
  menuRef,
  menuPosition,
  data,
  openMenuId,
  closeMenu,
  requestDelete,
}: RowMenuProps) => {
  const handdleDelete = () => {
    const entry = data.find((e) => e.id === openMenuId);
    closeMenu();
    if (entry) requestDelete([entry]);
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-50 min-w-35 rounded-md border border-border bg-popover p-1 shadow-md"
      style={{
        top: menuPosition.top,
        left: menuPosition.left,
        transform: "translateX(-100%)",
      }}
    >
      <Button
        type="button"
        variant="ghost"
        className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-accent transition-colors"
        onClick={handdleDelete}
      >
        <Trash2 className="size-4" />
        Delete
      </Button>
    </div>
  );
};
