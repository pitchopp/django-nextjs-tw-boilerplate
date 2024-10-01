import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/../public/logo.png";
import { FaPowerOff } from "react-icons/fa6";
import Topbar from "./topbar";

export default function Sidebar({ navItems, children, className, ...props }) {
  const pathname = usePathname();

  return (
    <div className={`drawer lg:drawer-open ${className}`} {...props}>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <Topbar drawer="my-drawer" className="h-12 absolute" />
      <div className="pt-16 p-4 drawer-content h-screen overflow-scroll bg-base-200">
        {children}
      </div>
      <div className="drawer-side border-r shadow-sm">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <nav className="menu bg-base-100 text-base-content min-h-full w-48 p-2 space-y-4">
          <Link href="/">
            <Image src={logo} alt="Logo" className="w-32 h-auto mx-auto" />
          </Link>
          <div className="divider"></div>
          <ul className="flex-1 !my-0">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  target={item.target}
                  className={`${pathname === item.href ? "active" : ""}`}
                >
                  {item.icon && <item.icon className="size-4" />}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="divider !my-0"></div>
          <ul className="!my-0">
            <li>
              <Link href="/auth/logout" className="flex">
                <FaPowerOff className="size-4" />
                <span>Déconnexion</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
