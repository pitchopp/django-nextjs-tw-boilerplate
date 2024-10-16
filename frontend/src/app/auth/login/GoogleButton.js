"use client";
import api from "@/lib/api";
import { handleLoginSuccess } from "@/lib/auth";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function GoogleButton({ clientId, className, ...props }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

  useEffect(() => {
    if (router && loggedIn) router.push(next || "/dashboard");
  }, [router, loggedIn, next]);

  const onLoginSuccess = ({ credential }) => {
    api
      .post("/auth/google/", { credential })
      .then((res) => {
        handleLoginSuccess(res);
        setLoggedIn(true);
      })
      .catch(() => {
        toast.error("Login Failed");
      });
  };
  return (
    <div className={`grid justify-center gap-2 ${className}`} {...props}>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={onLoginSuccess}
          onError={() => {
            toast.error("Login Failed");
          }}
          // useOneTap
          auto_select
        />
      </GoogleOAuthProvider>
    </div>
  );
}
