import { Poppins } from "next/font/google";
import "./globals.css";
import GlobalStateProvider from "@/components/provider";
import { Toaster } from "react-hot-toast";
import { PublicEnvScript } from 'next-runtime-env';


const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans'
});

export const metadata = {
  title: "PITCHOP",
  description: "Website description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <PublicEnvScript />
      </head>
      <body className={`min-h-screen antialiased ${poppins.className}`}>
        <GlobalStateProvider>
          <Toaster position="top-right" />
          {children}
        </GlobalStateProvider>
      </body>
    </html>
  );
}