"use client";
import { IoMenu } from "react-icons/io5";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { UserAvatar } from "@/components/user/summary";
import Link from "next/link";
import {
  getUserDetails,
  handleLoginSuccess,
  isAuthenticated,
} from "@/lib/auth";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar({ navItems }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const loggedIn = isAuthenticated();
  const user = getUserDetails();

  const googleEnabled =
    !env("DISABLE_GOOGLE_LOGIN") ||
    ["0", "false"].includes(env("DISABLE_GOOGLE_LOGIN").toLowerCase());

  const googleLoginSuccess = ({ credential }) => {
    setLoading(true);
    api
      .post("/auth/google/", { credential })
      .then((res) => {
        handleLoginSuccess(res);
        router.refresh();
      })
      .catch(() => {
        toast.error("Login Failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useGoogleOneTapLogin({
    disabled: googleEnabled,
    auto_select: true,
    onSuccess: googleLoginSuccess,
    onError: () => {
      toast.error("Login Failed");
    },
  });

  return (
    <header className="navbar shadow w-full lg:justify-around">
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
            <span className="text-2xl font-bold text-secondary pb-0.5">
              IMMO KIT
            </span>
          </div>
        </Link>
      </div>
      <nav className="hidden flex-none lg:block">
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
          {loading && (
            <li>
              <div className="loading loading-sm"></div>
            </li>
          )}
          {!loading && loggedIn && (
            <>
              <li>
                <Link href="/dashboard" className="btn btn-sm btn-outline">
                  Tableau de bord
                </Link>
              </li>
              <UserAvatar size="xs" user={user} />
            </>
          )}
          {!loading && !loggedIn && (
            <>
              <li>
                <Link href="/auth/login" className="btn btn-sm btn-outline">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/auth/sign-up" className="btn btn-sm btn-secondary">
                  Inscription
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
