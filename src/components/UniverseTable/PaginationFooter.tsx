import { Button } from "../ui/Button";

interface PaginationFooterProps {
  currentPage: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}
export const PaginationFooter = ({
  currentPage,
  totalPages,
  total,
  pageSize,
  onPageChange,
}: PaginationFooterProps) => {
  const start = (currentPage - 1) * pageSize;

  return (
    <div className="flex items-center justify-between py-3 text-sm text-muted-foreground">
      <span>
        {total === 0
          ? "0 results"
          : `${start + 1}-${Math.min(start + pageSize, total)} of ${total}`}
      </span>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="px-3 py-1.5 "
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          className="px-3 py-1.5"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
