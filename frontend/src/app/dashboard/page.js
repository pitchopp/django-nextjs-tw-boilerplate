"use client";
import GlobalStateContext from "@/lib/context";
import { useContext } from "react";

export default async function page() {
    const [globalState, setGlobalState] = useContext(GlobalStateContext);
    console.log(globalState);
    return (
        <main className="p-10">
            <h1 className="text-4xl font-bold text-center mb-16">
                Home
            </h1>
        </main>
    );
}

