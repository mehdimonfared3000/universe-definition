import { Skeleton } from "@/components/ui/Skeleton";

const Row = () => (
  <div className="grid grid-cols-[40px_1fr_1fr_100px_1fr_120px] gap-4 px-4 py-3 border-b border-border last:border-b-0">
    <Skeleton className="h-4 w-4" />
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-4 w-40" />
    <Skeleton className="h-4 w-10" />
    <Skeleton className="h-4 w-28" />
    <Skeleton className="h-4 w-16" />
  </div>
);

const Header = () => (
  <div className="grid grid-cols-[40px_1fr_1fr_100px_1fr_120px] gap-4 px-4 py-3 bg-muted/50 border-b border-border">
    <Skeleton className="h-4 w-4" />
    <Skeleton className="h-4 w-16" />
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-4 w-14" />
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-4 w-10" />
  </div>
);

export const LoadingTable = () => (
  <div className="border border-border rounded-lg overflow-hidden">
    <Header />
    <Row />
    <Row />
    <Row />
    <Row />
    <Row />
  </div>
);
