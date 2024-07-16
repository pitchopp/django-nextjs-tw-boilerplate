"use client";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/../public/logo.png";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import {
  isAuthenticated,
  setUserDetails,
  storeAccessToken,
  storeRefreshToken,
} from "@/lib/auth";
import { login } from "@/lib/api";
import Link from "next/link";

const ResetMessage = () => {
  const params = useSearchParams();
  if (params.get("reset") === "true") {
    return (
      <div className="text-success text-center">
        Votre mot de passe a été réinitialisé. Connectez-vous avec votre nouveau
        mot de passe.
      </div>
    );
  } else if (params.get("verified") === "true") {
    return (
      <div className="text-success text-center">
        Votre adresse email a été vérifiée. Vous pouvez maintenant vous
        connecter.
      </div>
    );
  } else if (params.get("verified") === "false") {
    return (
      <div className="text-warning text-center">
        Votre adresse email n&apos;est pas encore vérifiée. Veuillez vérifier votre boîte
        de réception avant de vous connecter.
      </div>
    );
  }
  return null;
};

export default function Login() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) setLoggedIn(true);
  }, []);

  useEffect(() => {
    if (router && loggedIn) router.push("/dashboard");
  }, [loggedIn, router]);

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    e.preventDefault();
    login(email, password)
      .then((res) => {
        storeAccessToken(res.data.access);
        storeRefreshToken(res.data.refresh);
        setUserDetails(res.data.user);
        setLoggedIn(true);
      })
      .catch((err) => {
        setErrors(err.response.data);
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <main className="flex items-center justify-center h-screen bg-base-200 p-4">
      <div className="w-full grid max-w-md p-4 space-y-8 bg-base-100 rounded-lg">
        <Image src={logo} alt="Logo" className="mx-auto w-32 h-auto" />
        <h1 className="text-3xl font-bold text-center">Connexion</h1>
        <Suspense>
          <ResetMessage />
        </Suspense>
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
          <div className="text-error text-sm">
            {errors.email &&
              errors.email.map((error, index) => (
                <div key={index}>Email : {error}</div>
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
            {errors.password &&
              errors.password.map((error, index) => (
                <div key={index}>Mot de passe : {error}</div>
              ))}
          </div>
          <label className="input input-bordered flex items-center gap-4">
            <FaKey className="size-4 opacity-70" />
            <input
              required
              id="password"
              type="password"
              className="grow"
              placeholder="Mot de passe"
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
              Se connecter
            </button>
            <div>
              <Link href={"/auth/sign-up"} className="link text-sm">
                S&apos;inscrire
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
