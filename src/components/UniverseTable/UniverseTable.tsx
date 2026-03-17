import { createPortal } from "react-dom";
import type { UniverseEntry } from "@/types/universe";
import { Checkbox } from "@/components/ui/Checkbox";
import { Badge } from "@/components/ui/Badge";
import { Download, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRowSelection } from "@/hooks/useRowSelection";
import { useRowMenu } from "@/hooks/useRowMenu";
import { useCsvDownload } from "@/hooks/useCsvDownload";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { ActionBar } from "./ActionBar";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { RowMenu } from "./RowMenu";
import { PaginationFooter } from "./PaginationFooter";

interface UniverseTableProps {
  data: UniverseEntry[];
  currentPage: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onRowClick?: (entry: UniverseEntry) => void;
  onDelete?: (entries: UniverseEntry[]) => void;
  loading?: boolean;
}

export const UniverseTable = ({
  data,
  currentPage,
  totalPages,
  total,
  pageSize,
  onPageChange,
  onRowClick,
  onDelete,
  loading,
}: UniverseTableProps) => {
  const {
    selectedIds,
    allSelected,
    someSelected,
    toggleAll,
    toggleRow,
    clearSelection,
  } = useRowSelection(data);
  const { openMenuId, menuPosition, menuRef, openMenu, closeMenu } =
    useRowMenu();
  const { downloadRef, handleDownload } = useCsvDownload();
  const { pendingDelete, requestDelete, confirmDelete, cancelDelete } =
    useDeleteConfirmation((entries) => {
      onDelete?.(entries);
      clearSelection();
    });

  const handleBulkDelete = () => {
    const selected = data.filter((e) => selectedIds.has(e.id));
    requestDelete(selected);
  };

  const handleRowOptionsClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    entryId: string,
  ) => {
    e.stopPropagation();
    openMenu(entryId, e.currentTarget.getBoundingClientRect());
  };

  return (
    <div className={loading ? "opacity-60 pointer-events-none" : ""}>
      {selectedIds.size > 0 && (
        <ActionBar
          selectedIds={selectedIds.size}
          handleBulkDelete={handleBulkDelete}
        />
      )}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="grid grid-cols-[40px_1fr_1.5fr_80px_1fr_120px_40px] items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
          <Checkbox
            checked={allSelected}
            onCheckedChange={toggleAll}
            aria-label="Select all rows"
            className={someSelected ? "opacity-60" : ""}
          />
          <span>Date</span>
          <span>Service</span>
          <span>Region</span>
          <span>Submitted by</span>
          <span>SUD</span>
          <span />
        </div>

        {data.map((entry) => (
          <div
            key={entry.id}
            role={entry.csvUpload ? "button" : undefined}
            tabIndex={entry.csvUpload ? 0 : undefined}
            onClick={() => entry.csvUpload && onRowClick?.(entry)}
            onKeyDown={(e) => {
              if (entry.csvUpload && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onRowClick?.(entry);
              }
            }}
            className={`grid grid-cols-[40px_1fr_1.5fr_80px_1fr_120px_40px] items-center gap-2 px-4 py-3 border-b border-border last:border-b-0 text-sm hover:bg-muted/30 transition-colors${entry.csvUpload ? " cursor-pointer" : ""}`}
          >
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={selectedIds.has(entry.id)}
                onCheckedChange={() => toggleRow(entry.id)}
                aria-label={`Select ${entry.service}`}
              />
            </div>
            <span className="text-foreground">{entry.date}</span>
            <span className="text-foreground">{entry.service}</span>
            <div>
              <Badge variant="outline" className="text-xs font-medium">
                {entry.region}
              </Badge>
            </div>
            <span className="text-foreground">{entry.submittedBy}</span>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                className="p-1"
                aria-label="Download"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(entry);
                }}
                disabled={!entry.csvUpload}
              >
                <Download className="size-4" />
              </Button>
            </div>
            <div>
              <Button
                variant="ghost"
                type="button"
                className="p-1"
                aria-label="More options"
                onClick={(e) => handleRowOptionsClick(e, entry.id)}
              >
                <MoreVertical className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <PaginationFooter
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */}
      <a
        ref={downloadRef}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />

      {openMenuId &&
        createPortal(
          <RowMenu
            menuRef={menuRef}
            menuPosition={menuPosition}
            data={data}
            openMenuId={openMenuId}
            closeMenu={closeMenu}
            requestDelete={requestDelete}
          />,
          document.body,
        )}

      {pendingDelete &&
        createPortal(
          <ConfirmDeleteModal
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
          />,
          document.body,
        )}
    </div>
  );
};
