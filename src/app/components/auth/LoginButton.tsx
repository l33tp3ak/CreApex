"use client";

import { useUser } from "@stackframe/stack";
import Link from "next/link";

export function LoginButton(){
    const user = useUser();

    if(user){
        return (
            <Link href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded">
                Dashboard
            </Link>
        )
    }
    // localhost:3000/handler/[..stack] => route dynamique pour stackframe
    return (
        <Link href="/handler/sign-in" className="px-4 py-2 bg-green-500 text-white rounded">
            Se connecter
        </Link>
    )

}