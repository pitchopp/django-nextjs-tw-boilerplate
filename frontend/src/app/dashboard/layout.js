import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import DashboardSidebar from "./DashboardSidebar";

export default async function DashboardLayout({ children }) {
  if (!isAuthenticated()) redirect(`/auth/login`);

  return (
    <main className="!p-0">
      <DashboardSidebar>{children}</DashboardSidebar>
    </main>
  );
}
