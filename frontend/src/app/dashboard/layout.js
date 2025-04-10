import DashboardLayout from "./DashboardLayout";

export const metadata = {
  title: "Pitchop | Espace client",
  description: "",
};

export default function Layout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
