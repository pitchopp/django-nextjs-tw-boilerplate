import { isAuthenticated } from "@/lib/server/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: {
    default: "Pitchop",
    template: "%s | Pitchop",
  },
};

export default async function Layout({ children }) {
  const loggedIn = await isAuthenticated();
  if (loggedIn) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
