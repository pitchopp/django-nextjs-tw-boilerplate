"use client";
import { isAuthenticated } from "@/lib/auth";
import DashboardSidebar from "./DashboardSidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const [loggedIn, setLoggedIn] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);

  useEffect(() => {
    if (loggedIn === false && router && pathname) {
      router.push(`/auth/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [loggedIn, router, pathname]);

  if (loggedIn === null) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="loading loading-infinity w-40"></div>;
      </div>
    );
  }

  if (!loggedIn) {
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
