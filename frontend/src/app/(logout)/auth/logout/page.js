"use client";
import Image from "next/image";
import logo from "@/../public/logo.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/lib/api";
import { removeTokens } from "@/lib/auth";


export default function Logout() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(5);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    logout().finally(() => {
      removeTokens();
      setLoggedOut(true);
    });
  }, [])
  
  useEffect(() => {
    if (!loggedOut) return;
    const interval = setInterval(() => {
      if (timeLeft === 0) {
        clearInterval(interval);
        router.push("/auth/login");
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, loggedOut, router]);

  if (!loggedOut) return <div>Déconnexion en cours...</div>;

  return (
    <main className="flex items-center justify-center h-screen bg-base-200 p-4">
      <div className="w-full grid max-w-md p-4 space-y-8 bg-base-100 rounded-lg">
        <Image
          src={logo}
          alt="Logo"
          className="mx-auto w-32 h-auto"
        />
        <h1 className="text-3xl font-bold text-center">
          Vous avez été déconnecté avec succès.
        </h1>
        <p className="text-center">
          Vous allez être redirigé vers la page de connexion dans{" "}
          <span className="countdown">
            <span style={{ "--value": timeLeft }}></span>
          </span>{" "}
          sec
        </p>
      </div>
    </main>
  );
}
