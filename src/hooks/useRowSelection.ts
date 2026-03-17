import { useState, useRef } from "react";

export const useRowSelection = <T extends { id: string }>(data: T[]) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const prevDataRef = useRef(data);

  if (prevDataRef.current !== data) {
    prevDataRef.current = data;
    if (selectedIds.size > 0) setSelectedIds(new Set());
  }

  const allSelected = data.length > 0 && selectedIds.size === data.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  function toggleAll() {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map((item) => item.id)));
    }
  }

  function toggleRow(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

  return {
    selectedIds,
    allSelected,
    someSelected,
    toggleAll,
    toggleRow,
    clearSelection,
  };
};
