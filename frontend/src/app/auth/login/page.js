import Image from "next/image";
import logo from "@/../public/logo.png";
import { env } from "next-runtime-env";
import LoginForm from "./LoginForm";
import GoogleButton from "./GoogleButton";

export default async function Login() {
  const googleClientId = env("GOOGLE_OAUTH_CLIENT_ID");
  return (
    <main className="flex items-center justify-center h-screen bg-base-200 p-4">
      <div className="w-full grid max-w-md p-4 space-y-4 bg-base-100 rounded-lg">
        <div className="space-y-4">
          <Image src={logo} alt="Logo" className="mx-auto w-32 h-auto" />
          <h1 className="text-3xl font-bold text-center">Connexion</h1>
        </div>
        <div>
          {googleClientId && (
            <>
              <GoogleButton clientId={env("GOOGLE_OAUTH_CLIENT_ID")} />
              <div className="divider">ou</div>
            </>
          )}
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
