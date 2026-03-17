import type { CsvUpload } from "@/types/universe";
import { FileSpreadsheet } from "lucide-react";

interface UploadTableProps {
  uploads: CsvUpload[];
  onRowClick: (upload: CsvUpload) => void;
}

export const UploadTable = ({ uploads, onRowClick }: UploadTableProps) => {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-[1fr_1fr_120px_100px] items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
        <span>File name</span>
        <span>Uploaded at</span>
        <span>Columns</span>
        <span>Rows</span>
      </div>

      {/* Table Rows */}
      {uploads.map((upload) => (
        <div
          key={upload.id}
          onClick={() => onRowClick(upload)}
          className="grid grid-cols-[1fr_1fr_120px_100px] items-center gap-2 px-4 py-3 border-b border-border last:border-b-0 text-sm hover:bg-muted/30 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 text-foreground">
            <FileSpreadsheet className="size-4 text-muted-foreground shrink-0" />
            <span className="truncate">{upload.fileName}</span>
          </div>
          <span className="text-foreground">
            {new Date(upload.uploadedAt).toLocaleString()}
          </span>
          <span className="text-foreground">{upload.headers.length}</span>
          <span className="text-foreground">{upload.rows.length}</span>
        </div>
      ))}
    </div>
  );
};
