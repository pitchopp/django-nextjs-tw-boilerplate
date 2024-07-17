"use client"
import Link from "next/link";
import { useContext } from "react";
import GlobalStateContext from "@/lib/context";

export default function Home() {
  const [globalState, setGlobalState] = useContext(GlobalStateContext);
  console.log(globalState.env);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Landing Page</h1>
      <Link href="/dashboard" className="btn btn-primary">
        Dashboard
      </Link>
    </main>
  );
}
