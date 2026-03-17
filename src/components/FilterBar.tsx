import { useRef, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { ChevronDown, CalendarDays, Search } from "lucide-react";

const filters = ["Region", "Service"];

interface FilterBarProps {
  searchQuery: string;
  onSearch: (q: string) => void;
}

export const FilterBar = ({ searchQuery, onSearch }: FilterBarProps) => {
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onSearch(value);
      }, 300);
    },
    [onSearch],
  );

  return (
    <div className="flex items-center gap-3 py-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Filter name"
          defaultValue={searchQuery}
          onChange={handleChange}
          className="h-9 w-52 rounded-md border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {filters.map((filter) => (
          <Button
            key={filter}
            type="button"
            variant="outline"
            size="sm"
            className="gap-1 text-sm"
          >
            {filter}
            <ChevronDown className="size-3.5" />
          </Button>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1 text-sm"
        >
          <CalendarDays className="size-3.5" />
          Date
        </Button>
      </div>
    </div>
  );
};
