import { useState, useCallback } from "react";
import type { UniverseEntry } from "@/types/universe";

export const useDeleteConfirmation = (
  onDelete?: (entries: UniverseEntry[]) => void,
) => {
  const [pendingDelete, setPendingDelete] = useState<UniverseEntry[] | null>(
    null,
  );

  const requestDelete = useCallback((entries: UniverseEntry[]) => {
    if (entries.length === 0) return;
    setPendingDelete(entries);
  }, []);

  const confirmDelete = useCallback(() => {
    if (!pendingDelete) return;
    onDelete?.(pendingDelete);
    setPendingDelete(null);
  }, [pendingDelete, onDelete]);

  const cancelDelete = useCallback(() => {
    setPendingDelete(null);
  }, []);

  return { pendingDelete, requestDelete, confirmDelete, cancelDelete };
};
