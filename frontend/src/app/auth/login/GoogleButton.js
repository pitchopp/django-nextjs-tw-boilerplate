"use client";
import api from "@/lib/api";
import { handleLoginSuccess } from "@/lib/auth";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function GoogleButton({ className, prevUrl, ...props }) {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || prevUrl || "/dashboard";

  useEffect(() => {
    if (router && loggedIn) router.push(next || "/dashboard");
  }, [router, loggedIn, next]);

  const googleLoginSuccess = ({ credential }) => {
    setLoading(true);
    api
      .post("/auth/google/", { credential })
      .then((res) => {
        handleLoginSuccess(res);
        setLoggedIn(true);
      })
      .catch(() => {
        toast.error("Login Failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className={`grid justify-center gap-2 ${className}`} {...props}>
      {loading ? (
        <div className="loading"></div>
      ) : (
        <GoogleLogin
          onSuccess={googleLoginSuccess}
          onError={() => {
            toast.error("Login Failed");
          }}
          useOneTap
          auto_select
        />
      )}
    </div>
  );
}
