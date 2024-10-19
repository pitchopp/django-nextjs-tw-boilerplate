"use client";
import { IoMenu } from "react-icons/io5";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { UserAvatar } from "@/components/user/summary";
import Link from "next/link";
import { getUserDetails, handleLoginSuccess, isAuthenticated } from "@/lib/auth";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import api from "@/lib/api";

export default function Navbar({ navItems }) {
  const loggedIn = isAuthenticated();
  const user = getUserDetails();

  const googleLoginSuccess = ({ credential }) => {
    api
      .post("/auth/google/", { credential })
      .then((res) => {
        handleLoginSuccess(res);
        window.location.reload();
      })
      .catch(() => {
        toast.error("Login Failed");
      });
  };
  useGoogleOneTapLogin({
    onSuccess: googleLoginSuccess,
    onError: () => {
      toast.error("Login Failed");
    },
  });

  return (
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
            <span className="text-2xl font-bold text-secondary pb-0.5">
              IMMO KIT
            </span>
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
          {loggedIn && (
            <>
              <li>
                <Link href="/dashboard" className="btn btn-sm btn-outline">
                  Tableau de bord
                </Link>
              </li>
              <UserAvatar size="xs" user={user} />
            </>
          )}
          {!loggedIn && (
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
      </div>
    </div>
  );
}
