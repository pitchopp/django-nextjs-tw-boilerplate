"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/../public/logo.png";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { signup } from "@/lib/api";
import Link from "next/link";
import { FaLock } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated()) setLoggedIn(true);
  }, []);

  useEffect(() => {
    if (router && loggedIn) router.push("/dashboard");
  }, [loggedIn, router]);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target.email.value;
    const password1 = e.target.password1.value;
    const password2 = e.target.password2.value;

    if (password1 !== password2) {
      setErrors({ password2: ["Les mots de passe ne correspondent pas"] });
      setLoading(false);
      return;
    }

    signup(email, password1, password2)
      .then((res) => {
        router.push("/auth/login?verified=false");
      })
      .catch((err) => {
        toast.error("Erreur lors de l'inscription");
        setErrors(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="flex items-center justify-center h-screen bg-base-200 p-4">
      <div className="w-full grid max-w-md p-4 space-y-8 bg-base-100 rounded-lg">
        <Image src={logo} alt="Logo" className="mx-auto w-32 h-auto" />
        <h1 className="text-3xl font-bold text-center">Inscription</h1>
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          <div className="text-error text-sm">
            {errors.email &&
              errors.email.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
          </div>
          <label className="input input-bordered flex items-center gap-4">
            <FaEnvelope className="size-4 opacity-70" />
            <input
              required
              id="email"
              type="email"
              className="grow"
              placeholder="Email"
            />
          </label>
          <div className="text-error text-sm">
            {errors.password1 &&
              errors.password1.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
          </div>
          <label className="input input-bordered flex items-center gap-4">
            <FaKey className="size-4 opacity-70" />
            <input
              required
              id="password1"
              type="password"
              className="grow"
              placeholder="Mot de passe"
            />
          </label>
          <div className="text-error text-sm">
            {errors.password2 &&
              errors.password2.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
          </div>
          <label className="input input-bordered flex items-center gap-4">
            <FaLock className="size-4 opacity-70" />
            <input
              required
              id="password2"
              type="password"
              className="grow"
              placeholder="Confirmez le mot de passe"
            />
          </label>
          <div>
            <Link href="/auth/lost-password" className="link">
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="text-error text-sm">
            {errors.non_field_errors &&
              errors.non_field_errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading && <span className="loading loading-spinner"></span>}
              S&apos;inscrire
            </button>
            <div>
              <Link href={"/auth/login"} className="link text-sm">
                Se connecter
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
