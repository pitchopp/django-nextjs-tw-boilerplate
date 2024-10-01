"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPowerOff } from "react-icons/fa";
import Link from "next/link";
import { getUserDetails } from "@/lib/auth";
import { UserAvatar } from "../user/summary";

export default function Topbar({ drawer, className, ...props }) {
  const connectedUser = getUserDetails();

  return (
    <div className={`navbar min-h-0 border-b p-1 gap-2 bg-base-100 ${className}`} {...props}>
      <div className="space-x-1">
        <label
          htmlFor={drawer}
          className="lg:hidden btn btn-square btn-ghost drawer-button"
        >
          <RxHamburgerMenu className="text-3xl" />
        </label>
      </div>
      <div className="flex-1 justify-end space-x-2">
        <div className="dropdown dropdown-end mr-2">
          <UserAvatar tabIndex={0} role="button" user={connectedUser} />
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl"
          >
            <li className="font-bold">
              {connectedUser?.first_name} {connectedUser?.last_name}
            </li>
            <li>{connectedUser?.email}</li>
            <div className="divider !my-0"></div>
            <li>
              <Link href="/auth/logout" className="flex">
                <FaPowerOff className="size-4" />
                <span>Déconnexion</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
