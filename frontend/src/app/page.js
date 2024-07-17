"use client"
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Landing Page</h1>
      <Link href="/dashboard" className="btn btn-primary">
        Dashboard
      </Link>
    </main>
  );
}
