import { Poppins } from "next/font/google";
import "./globals.css";
import GlobalStateProvider from "@/components/provider";
import { Toaster } from "react-hot-toast";
import { setCookie } from "@/lib/cookies";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans'
});

export const metadata = {
  title: "Mentoroc",
  description: "L'assitant IA dédié au mentors OPENCLASSROOMS !",
};

export default function RootLayout({ children }) {
  const envVars = JSON.parse(JSON.stringify(process.env))
  // keep only the variables that start with NEXT_PUBLIC_
  Object.keys(envVars).forEach((key) => {
    if (!key.startsWith("NEXT_PUBLIC_")) {
      delete envVars[key];
    }
  });
  localStorage.setItem("api_url", envVars.NEXT_PUBLIC_API_URL);
  return (
    <html lang="fr">
      <body className={`min-h-screen antialiased ${poppins.className}`}>
        <GlobalStateProvider env={envVars}>
          <Toaster position="top-right" />
          {children}
        </GlobalStateProvider>
      </body>
    </html>
  );
}