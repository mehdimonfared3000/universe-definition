import { Sidebar } from "@/components/Sidebar";
import { UniverseDefinitionPage } from "@/components/UniverseDefinitionPage";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const App = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <ErrorBoundary
        fallback={
          <div className="w-56 shrink-0 border-r border-border bg-muted/30" />
        }
      >
        <Sidebar />
      </ErrorBoundary>
      <ErrorBoundary>
        <UniverseDefinitionPage />
      </ErrorBoundary>
    </div>
  );
};

export default App;
