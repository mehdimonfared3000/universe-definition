import { Globe } from "lucide-react";

export const SidebarHeader = () => (
  <div className="px-4 py-4 flex items-center gap-2">
    <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center">
      <Globe className="size-4 text-white" />
    </div>
    <div className="text-sm leading-tight">
      <div className="font-semibold text-foreground">Acme Bank</div>
      <div className="text-xs text-muted-foreground">Contributor</div>
    </div>
  </div>
);
