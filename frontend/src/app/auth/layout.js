import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: {
    default: "Mentoroc",
    template: "%s | Mentoroc",
  },
};

export default function Layout({ children }) {
  if (isAuthenticated()) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
