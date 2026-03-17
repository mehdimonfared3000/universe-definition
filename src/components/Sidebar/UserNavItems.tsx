import { ChevronUp } from "lucide-react";

export const UserNavItems = () => (
  <div className="border-t border-border px-4 py-3 flex items-center gap-2">
    <div className="size-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground">
      SF
    </div>
    <div className="flex-1 min-w-0 text-sm leading-tight">
      <div className="font-medium text-foreground truncate">
        Placeholder User
      </div>
      <div className="text-xs text-muted-foreground truncate">
        placeholder.user@acmebank.com
      </div>
    </div>
    <ChevronUp className="size-4 text-muted-foreground" />
  </div>
);
