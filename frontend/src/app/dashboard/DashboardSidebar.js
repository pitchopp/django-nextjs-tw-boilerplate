"use client";
import { FaHome, FaDatabase } from "react-icons/fa";
import { env } from "next-runtime-env";
import Sidebar from "@/components/navigation/sidebar";
import { isStaff } from "@/lib/auth";

const navItems = [
  {
    title: "Home",
    icon: FaHome,
    href: "/dashboard",
  },
];

const adminNavItems = [
  {
    title: "Admin",
    icon: FaDatabase,
    href: env("NEXT_PUBLIC_ADMIN_URL"),
    target: "_blank",
  },
];

export default function DashboardSidebar({ children }) {
  const allNavItems = isStaff() ? navItems.concat(adminNavItems) : navItems;
  return <Sidebar navItems={allNavItems}>{children}</Sidebar>;
}
