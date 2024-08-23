"use client";
import { useEffect, useState } from "react";
import { FaHome, FaDatabase } from "react-icons/fa";
import { FaPowerOff, FaBars, FaXmark } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/logo.png";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { env } from "next-runtime-env";

const navItems = [
  {
    title: "Home",
    icon: FaHome,
    href: "/dashboard",
  },
  {
    title: "Déconnexion",
    icon: FaPowerOff,
    href: "/auth/logout",
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

export function Sidebar({ className, ...props }) {
  const pathname = usePathname();
  return (
    <nav
      className={`h-screen sticky min-w-56 w-56 shadow-xl bg-base-100 ${className}`}
      {...props}
    >
      <div className="p-2 lg:p-4">
        <Link href="/">
          <div className="size-32 mx-auto">
            <Image src={logo} alt="Logo" className="object-cover" />
          </div>
          <div className="text-xl text-center mx-auto my-4 font-bold uppercase">
            Mentoroc
          </div>
        </Link>
      </div>
      <ul className="menu text-base gap-2">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className={`${pathname === item.href ? "active" : ""}`}
              target={item.target}
            >
              {item.icon && <item.icon className="size-5" />}
              <span className="">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="divider my-0"></div>
      <ul className="menu text-base gap-2">
        {adminNavItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className={`${pathname === item.href ? "active" : ""}`}
              target={item.target}
            >
              {item.icon && <item.icon className="size-5" />}
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const authenticated = isAuthenticated();

  useEffect(() => {
    if (router && !authenticated) router.push("/auth/login");
  }, [router, authenticated]);

  if (!authenticated) {
    return <div>Vous devez être connecté pour accéder à cette page.</div>;
  }
  return (
    <div className="flex overflow-hidden">
      <Sidebar
        className={`${
          open ? "-translate-x-0" : "-translate-x-80"
        } absolute lg:translate-x-0 transition ease-in-out z-50`}
      />
      <div
        onClick={() => setOpen(false)}
        className={`${
          open ? "absolute inset-0 bg-black bg-opacity-50" : "hidden"
        } z-40 w-full h-full lg:hidden`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-5 right-5 text-white"
        >
          <FaXmark className="size-5" />
        </button>
      </div>
      <div className={`absolute inset-0 flex-1 lg:static overflow-scroll`}>
        <button
          className="shadow-xl bg-base-100 lg:hidden p-2 h-fit m-2 rounded-lg"
          onClick={() => setOpen(true)}
        >
          <FaBars className="size-5" />
        </button>
        <main className="p-4 sm:p-8 h-screen">
        {children}
        </main>
      </div>
    </div>
  );
}
