import Image from "next/image";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import logo from "../../../public/logo.png";

const navItems = [
  { name: "Home", href: "/home" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Layout({ children }) {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar shadow w-full lg:justify-around">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <IoMenu className="size-8" />
            </label>
          </div>
          <div className="mx-2 px-2">
            {/* Title */}
            <Link href="/home">
              <div className="flex items-end gap-1">
                <div className="size-12">
                  <Image src={logo} alt="logo" />
                </div>
                <span className="text-2xl font-bold text-secondary pb-0.5">IMMO KIT</span>
              </div>
            </Link>
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal gap-4 items-center">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    className="hover:bg-transparent hover:-translate-y-0.5"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="btn btn-sm btn-outline" href="/auth/login">
                  Connexion
                </Link>
              </li>
              <li>
                <Link className="btn btn-sm btn-secondary" href="/auth/sign-up">
                  Inscription
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
