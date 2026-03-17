import AdminNavItems from "./AdminNavItems";
import PlatformNavItems from "./PlatformNavItems";
import { UserNavItems } from "./UserNavItems";
import { SidebarHeader } from "./SidebarHeader";

export const Sidebar = () => (
  <aside className="w-56 shrink-0 border-r border-border bg-sidebar-background flex flex-col h-screen sticky top-0">
    <SidebarHeader />
    <nav className="flex  flex-col flex-1 px-2 mt-2">
      <h2 className="px-2 mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Platform
      </h2>
      <PlatformNavItems />
      <h2 className="px-2 mb-1 mt-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Admin
      </h2>
      <AdminNavItems />
    </nav>
    <UserNavItems />
  </aside>
);
