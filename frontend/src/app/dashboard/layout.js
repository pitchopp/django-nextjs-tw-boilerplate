"use client";
import { useEffect } from "react";
import { FaHome, FaDatabase } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
  const authenticated = isAuthenticated();

  const allNavItems = isStaff() ? navItems.concat(adminNavItems) : navItems;

  useEffect(() => {
    if (router && !authenticated) router.push(`/auth/login?next=${pathname}`);
  }, [router, authenticated, pathname]);

  if (!authenticated) {
    return <div>Vous devez être connecté pour accéder à cette page.</div>;
  }

  return (
    <main>
      <Sidebar navItems={allNavItems}>{children}</Sidebar>
    </main>
  );
}
