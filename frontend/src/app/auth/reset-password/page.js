"use client";
import Image from "next/image";
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import logo from "@/../public/logo.png";
import { confirmResetPassword } from "@/lib/api";

const ResetForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const uid = params.get("uid");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    setErrors({});
    confirmResetPassword(uid, token, password, password2)
      .then((res) => {
        router.push("/auth/login?reset=true");
      })
      .catch((err) => {
        setErrors(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="input input-bordered flex items-center gap-4">
        <input
          required
          id="password"
          type="password"
          className="grow"
          placeholder="Nouveau mot de passe"
        />
      </label>
      <label className="input input-bordered flex items-center gap-4">
        <input
          required
          id="password2"
          type="password"
          className="grow"
          placeholder="Confirmer le mot de passe"
        />
      </label>
      <div className="text-error text-center">
        {Object.keys(errors).map((key) => {
          return errors[key].map((error, index) => (
            <div key={index}>{error}</div>
          ));
        })}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading && <span className="loading loading-spinner"></span>}
        Réinitialiser le mot de passe
      </button>
    </form>
  );
};

export default function ResetPasswordPage() {
  return (
    <main className="flex items-center justify-center h-screen bg-base-200 p-4">
      <div className="w-full grid max-w-md p-4 space-y-8 bg-base-100 rounded-lg">
        <Image src={logo} alt="Logo" className="mx-auto w-32 h-auto" />
        <h1 className="text-3xl font-bold text-center">
          Réinitialisation du mot de passe
        </h1>
        <Suspense fallback={<div>Chargement...</div>}>
          <ResetForm />
        </Suspense>
      </div>
    </main>
  );
}
