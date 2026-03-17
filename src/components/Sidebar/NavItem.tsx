import { cn } from "@/lib/utils";
import React from "react";
interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const NavItem = ({ children, className, ...props }: NavItemProps) => (
  <a
    className={cn(
      "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
      className,
    )}
    {...props}
  >
    {children}
  </a>
);
