import type { CsvUpload } from "@/types/universe";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface ReviewModalProps {
  upload: CsvUpload;
  onClose: () => void;
}

export const ReviewModal = ({ upload, onClose }: ReviewModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Review changes
          </h2>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs">
              {upload.rows.length} rows
            </Badge>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="p-1 "
              aria-label="Close"
            >
              <X className="size-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-foreground">
              {upload.fileName}
            </span>
            <Badge variant="secondary" className="text-xs">
              {new Date(upload.uploadedAt).toLocaleDateString()}
            </Badge>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-6 py-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {upload.headers.map((header) => (
                  <th
                    key={header}
                    className="text-left py-2 px-3 font-medium text-muted-foreground whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {upload.rows.map((row) => (
                <tr
                  key={`${row.join("|")}`}
                  className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                >
                  {upload.headers.map((header, colIdx) => (
                    <td
                      key={header}
                      className="py-2 px-3 text-foreground whitespace-nowrap"
                    >
                      {row[colIdx] ?? ""}
                    </td>
                  ))}
                </tr>
              ))}
              {upload.rows.length === 0 && (
                <tr>
                  <td
                    colSpan={upload.headers.length}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No data rows
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
