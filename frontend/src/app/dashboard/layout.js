import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { headers } from "next/headers";
import DashboardSidebar from "./DashboardSidebar";

export default async function DashboardLayout({ children }) {
  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";

  if (!isAuthenticated()) redirect(`/auth/login?next=${fullUrl}`);

  return (
    <main className="!p-0">
      <DashboardSidebar>{children}</DashboardSidebar>
    </main>
  );
}
