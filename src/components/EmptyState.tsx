import { Globe, Upload, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  onUpload?: () => void;
}

export const EmptyState = ({ onUpload }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 border border-border rounded-lg bg-background">
    <Globe className="size-10 text-muted-foreground mb-4" />
    <h3 className="text-lg font-semibold text-foreground mb-1">
      No universe definitions yet
    </h3>
    <p className="text-sm text-muted-foreground mb-4">
      Upload a SUD file to create a new universe definition
    </p>
    <Button type="button" className="gap-2 mb-4" onClick={onUpload}>
      <Upload className="size-4" />
      Upload SUD
    </Button>
    <a
      href="#"
      className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
    >
      Learn more about Universe Definition
      <ExternalLink className="size-3" />
    </a>
  </div>
);
