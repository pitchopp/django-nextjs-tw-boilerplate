import { FaHome, FaDatabase } from "react-icons/fa";
import { redirect, usePathname } from "next/navigation";
import { isAuthenticated, isStaff } from "@/lib/auth";
import { env } from "next-runtime-env";
import Sidebar from "@/components/navigation/sidebar";

const navItems = [
  {
    title: "Home",
    icon: FaHome,
    href: "/dashboard",
  }
];

const adminNavItems = [
  {
    title: "Admin",
    icon: FaDatabase,
    href: env("NEXT_PUBLIC_ADMIN_URL"),
    target: "_blank",
  },
];


export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const allNavItems = isStaff() ? navItems.concat(adminNavItems) : navItems;

  if (!isAuthenticated()) redirect(`/auth/login?next=${pathname}`);

  return (
    <main>
      <Sidebar navItems={allNavItems}>{children}</Sidebar>
    </main>
  );
}
