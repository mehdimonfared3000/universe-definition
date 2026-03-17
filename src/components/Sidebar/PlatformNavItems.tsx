import {
  ChevronDown,
  CreditCard,
  FileText,
  Globe,
  LayoutDashboard,
  Server,
} from "lucide-react";
import { NavItem } from "./NavItem";

export const PlatformNavItems = () => (
  <>
    <NavItem
      key="Dashboard"
      href="/"
      className={`transition-colors ${
        false
          ? "bg-blue-50 text-blue-700 font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <LayoutDashboard className="size-4" />
      Dashboard
    </NavItem>
    <NavItem
      key="Templates"
      href="/"
      className={`transition-colors ${
        false
          ? "bg-blue-50 text-blue-700 font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <FileText className="size-4" />
      Templates
    </NavItem>
    <NavItem
      key="Services"
      href="/"
      className={`transition-colors ${
        false
          ? "bg-blue-50 text-blue-700 font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <Server className="size-4" />
      Services
    </NavItem>
    <NavItem
      key="Universe Definition"
      href="/"
      className={`transition-colors ${
        true
          ? "bg-blue-50 text-blue-700 font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <Globe className="size-4" />
      Universe Definition
    </NavItem>

    <NavItem
      key="Subscriptions"
      href="/"
      className={`transition-colors ${
        false
          ? "bg-blue-50 text-blue-700 font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <CreditCard className="size-4" />
      Subscriptions
    </NavItem>
    <NavItem
      key="Data Drop"
      href="/"
      className={`transition-colors ${
        false
          ? "bg-blue-50 text-blue-700 font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <ChevronDown className="size-4" />
      Data Drop
    </NavItem>
  </>
);

export default PlatformNavItems;
