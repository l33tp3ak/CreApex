"use client";

import { useUser } from "@stackframe/stack";

export function LogoutButton(){
    const user = useUser();

    if(!user){
        return null
    }

    return(
        <button onClick={() => user.signOut()}>
            Se deconnecter 
        </button>
    )
}