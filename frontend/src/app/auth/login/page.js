import Image from "next/image";
import logo from "@/../public/logo.png";
import LoginForm from "./LoginForm";
import GoogleButton from "./GoogleButton";
import { env } from "next-runtime-env";
import { headers } from "next/headers";


export default async function Login() {
  const googleEnabled =
    !env("DISABLE_GOOGLE_LOGIN") ||
    ["0", "false"].includes(env("DISABLE_GOOGLE_LOGIN").toLowerCase());
  
  const headerList = headers();
  const prevUrl = headerList.get("referer");
  const prevPath = prevUrl ? new URL(prevUrl).pathname : null;
  return (
    <main className="flex items-center justify-center h-screen bg-base-200 p-4">
      <div className="w-full grid max-w-md p-4 space-y-4 bg-base-100 rounded-lg">
        <div className="space-y-4">
          <Image src={logo} alt="Logo" className="mx-auto w-32 h-auto" />
          <h1 className="text-3xl font-bold text-center">Connexion</h1>
        </div>
        <div>
          {googleEnabled && (
            <>
              <GoogleButton prevUrl={prevPath} />
              <div className="divider">ou</div>
            </>
          )}
          <LoginForm prevUrl={prevPath} />
        </div>
      </div>
    </main>
  );
}
