"use client";
import { isAuthenticated } from "@/lib/auth";
import DashboardSidebar from "./DashboardSidebar";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  if (!isAuthenticated()) {
    router.push(`/auth/login?next=${encodeURIComponent(pathname)}`);
    return (
      <div>
        Vous devez être connecté pour atteindre cette page... Nous allons vous
        rediriger.
      </div>
    );
  }
  return (
    <main className="p-0!">
      <DashboardSidebar>{children}</DashboardSidebar>
    </main>
  );
}
