import { NavItem } from "./NavItem";
import { Clock, Key, Users } from "lucide-react";

export const AdminNavItems = () => {
  return (
    <>
      <NavItem key="Team" href="/">
        <Users className="size-4" />
        Team
      </NavItem>
      <NavItem key="API Keys" href="/">
        <Key className="size-4" />
        API Keys
      </NavItem>
      <NavItem key="Historical Upload" href="/">
        <Clock className="size-4" />
        Historical Upload
      </NavItem>
    </>
  );
};

export default AdminNavItems;
