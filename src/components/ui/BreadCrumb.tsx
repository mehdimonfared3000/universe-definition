import { ChevronRight, PanelLeft } from "lucide-react";

export const BreadCrumb = () => (
  <div className="flex items-center gap-2 px-6 py-3 text-sm text-muted-foreground border-b border-border">
    <PanelLeft className="size-4" />
    <span>Dashboard</span>
    <ChevronRight className="size-3" />
    <span className="text-foreground font-medium">Universe Definition</span>
  </div>
);
