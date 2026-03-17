import { useCallback, useRef } from "react";
import Papa from "papaparse";
import type { UniverseEntry } from "@/types/universe";

export const useCsvDownload = () => {
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = useCallback((entry: UniverseEntry) => {
    const csv = entry.csvUpload;
    if (!csv || !downloadRef.current) return;

    const csvString = Papa.unparse({
      fields: csv.headers,
      data: csv.rows,
    });
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    downloadRef.current.href = url;
    downloadRef.current.download = csv.fileName;
    downloadRef.current.click();
    URL.revokeObjectURL(url);
  }, []);

  return { downloadRef, handleDownload };
};
