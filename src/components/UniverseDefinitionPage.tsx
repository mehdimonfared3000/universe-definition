import { useCallback, useRef, useState } from "react";
import type { UniverseEntry, CsvUpload } from "@/types/universe";
import { useUniverseEntries } from "@/hooks/useUniverseEntries";
import { useCsvUpload } from "@/hooks/useCsvUpload";
import { UniverseTable } from "@/components/UniverseTable";
import { ReviewModal } from "@/components/ReviewModal";
import { FilterBar } from "@/components/FilterBar";
import { EmptyState } from "@/components/EmptyState";
import { LoadingTable } from "@/components/LoadingTable";
import { Button } from "@/components/ui/Button";
import { Upload } from "lucide-react";
import { BreadCrumb } from "./ui/BreadCrumb";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const UniverseDefinitionPage = () => {
  const [selectedUpload, setSelectedUpload] = useState<CsvUpload | null>(null);

  const {
    entries,
    loading,
    currentPage,
    totalPages,
    total,
    searchQuery,
    pageSize,
    handlePageChange,
    handleSearch,
    handleDelete,
    reload,
  } = useUniverseEntries();

  const { fileInputRef, openFilePicker, handleFileChange } =
    useCsvUpload(reload);

  const hasShownTable = useRef(false);
  if (total > 0 || searchQuery) hasShownTable.current = true;

  const handleRowClick = useCallback((entry: UniverseEntry) => {
    if (entry.csvUpload) {
      setSelectedUpload(entry.csvUpload);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />
      <BreadCrumb />

      <div className="flex-1 px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-foreground">
            Universe Definition
          </h1>
          <Button className="gap-2" onClick={openFilePicker}>
            <Upload className="size-4" />
            Upload new version(s)
          </Button>
        </div>

        {loading && entries.length === 0 && <LoadingTable />}
        {!loading && total === 0 && !searchQuery && (
          <EmptyState onUpload={openFilePicker} />
        )}
        {hasShownTable.current && (
          <ErrorBoundary>
            <FilterBar searchQuery={searchQuery} onSearch={handleSearch} />
            <UniverseTable
              data={entries}
              currentPage={currentPage}
              totalPages={totalPages}
              total={total}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onRowClick={handleRowClick}
              onDelete={handleDelete}
              loading={loading}
            />
          </ErrorBoundary>
        )}
      </div>

      {selectedUpload && (
        <ErrorBoundary>
          <ReviewModal
            upload={selectedUpload}
            onClose={() => setSelectedUpload(null)}
          />
        </ErrorBoundary>
      )}
    </div>
  );
};
