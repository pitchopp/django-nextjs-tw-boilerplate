import "./globals.css";
import localFont from "next/font/local";
import GlobalStateProvider from "@/components/provider";
import { Toaster } from "react-hot-toast";
import { PublicEnvScript } from "next-runtime-env";
import { env } from "next-runtime-env";
import { GoogleOAuthProvider } from "@react-oauth/google";

const open_sans = localFont({
  src: [
    {
      path: "../fonts/Open_Sans/normal.ttf",
      style: "normal",
    },
    {
      path: "../fonts/Open_Sans/italic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-open-sans",
});

const roboto_mono = localFont({
  src: [
    {
      path: "../fonts/Roboto_Mono/normal.ttf",
      style: "normal",
    },
    {
      path: "../fonts/Roboto_Mono/italic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-roboto-mono",
});

const montserrat = localFont({
  src: [
    {
      path: "../fonts/Montserrat/normal.ttf",
      display: "swap",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat/italic.ttf",
      display: "swap",
      style: "italic",
    },
  ],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "PITCHOP",
  description: "Website description",
};

export default function RootLayout({ children }) {
  const googleClientId = env("GOOGLE_OAUTH_CLIENT_ID");

  return (
    <html
      lang="fr"
      className={`${open_sans.variable} ${roboto_mono.variable} ${montserrat.variable}`}
    >
      <head>
        <PublicEnvScript />
      </head>
      <body className={`min-h-screen antialiased`}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <GlobalStateProvider>
            <Toaster position="top-right" />
            {children}
          </GlobalStateProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
