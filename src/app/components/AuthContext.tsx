
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */

import {Role} from "@/generated/prisma/client";
import React from "react";

/*
 * "React.Dispatch<React.SetStateAction<...>>" is the proper way to declare the type of a Setter for a useState().
 * "..." represents the actual type to be used within our variable and what would be inside of useState(...)
 */
type AuthContextType = {
	role: Role | null;
	setRole: React.Dispatch<React.SetStateAction<Role | null>>;

	loggedIn: boolean | null;
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
};

type Props = {
	children?: React.ReactNode;
};



const AuthContext = React.createContext<AuthContextType | null>(null);


export function AuthProvider({children}: Props) {
	const [role, setRole] = React.useState<Role | null>(null);
	const [loggedIn, setLoggedIn] = React.useState<boolean | null>(false);



	return (
		<AuthContext.Provider
			value={{
				role,
				setRole,
				loggedIn,
				setLoggedIn
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

// Custom hooks that will return Context
// This allows to use the context in any children of the Parent component
// It also forces the context to be used within the appropriate Parent component
export function useAuth() {
	try {
		const context = React.useContext(AuthContext);
		return context;
	} catch (e) {
		console.log(e);
		throw new Error("useAuth must be used within a <Parent />");
	}
	/*
	if (!context) {
		throw new Error("useAuth must be used within a <Parent />");
	}
	*/
}