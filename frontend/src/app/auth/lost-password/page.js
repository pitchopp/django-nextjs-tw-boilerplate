"use client";
import Image from "next/image";
import logo from "@/../public/logo.png";
import { resetPassword } from "@/lib/api";
import { useState } from "react";

export default function LostPassword() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target.email.value;
    setMessage("");
    setErrors({});
    resetPassword(email)
      .then((res) => {
        setMessage(
          "Un email de réinitialisation a été envoyé. Merci de vérifier votre boîte de réception ou votre dossier de spam"
        );
      })
      .catch((err) => {
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
        <h1 className="text-3xl font-bold text-center">Mot de passe oublié</h1>
        <p className="text-center">
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="input input-bordered flex items-center gap-4">
            <input
              required
              id="email"
              type="email"
              className="grow"
              placeholder="Email"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading && <span className="loading loading-spinner"></span>}
            Envoyer le lien de réinitialisation
          </button>
        </form>
        {message && <div className="text-success text-center">{message}</div>}
        <div className="text-error text-center">
          {errors.email &&
            errors.email.map((error, index) => <div key={index}>{error}</div>)}
        </div>
      </div>
    </main>
  );
}
