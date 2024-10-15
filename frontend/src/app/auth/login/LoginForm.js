"use client"
import { Suspense, useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/api";
import {
  setUserDetails,
  storeAccessToken,
  storeRefreshToken,
} from "@/lib/auth";


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
        Votre adresse email n&apos;est pas encore vérifiée. Veuillez vérifier
        votre boîte de réception avant de vous connecter.
      </div>
    );
  }
  return null;
};

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
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
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
      <Suspense>
        <ResetMessage />
      </Suspense>
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
        <button type="submit" disabled={loading} className="btn btn-primary">
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
  );
}
